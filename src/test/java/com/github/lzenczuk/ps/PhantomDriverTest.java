package com.github.lzenczuk.ps;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.lzenczuk.ps.log.LogContainer;
import org.apache.commons.io.FileUtils;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.logging.LogEntries;
import org.openqa.selenium.phantomjs.PhantomJSDriverService;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.io.IOException;
import java.net.URL;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.TimeUnit;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

/**
 * @author lzenczuk 12/08/2015
 */
public class PhantomDriverTest {

    private static PhantomJSDriverService service;

    @BeforeClass
    public static void startPhantomjs() throws IOException {
        URL phantomjsExecutable = PhantomDriverTest.class.getResource("/phantomjs/linux/phantomjs");

        assertThat(phantomjsExecutable, notNullValue());

        service = new PhantomJSDriverService.Builder()
                .usingPhantomJSExecutable(FileUtils.toFile(phantomjsExecutable))
                .usingAnyFreePort()
                .build();

        service.start();
    }

    @AfterClass
    public static void stopPhantomjs(){
        if(service!=null && service.isRunning()) service.stop();
    }

    @Test
    public void shouldConnectToPhantomjsAndFetchWikipediaPage(){

        RemoteWebDriver driver = new RemoteWebDriver(service.getUrl(), DesiredCapabilities.phantomjs());

        driver.get("https://www.wikipedia.org/");
        Object result = driver.executeScript("return document.title");

        assertThat(result.toString(), is("Wikipedia"));

        driver.close();
    }

    @Test
    public void shouldConnectToPhantomjsAndFetchGooglePage(){

        RemoteWebDriver driver = new RemoteWebDriver(service.getUrl(), DesiredCapabilities.phantomjs());

        driver.get("http://www.google.com/");
        Object result = driver.executeScript("return document.title");

        assertThat(result.toString(), is("Google"));

        driver.close();
    }

    @Test
    public void shouldFetchTwoPagesInParallel(){

        final CyclicBarrier startGate = new CyclicBarrier(3);
        final CountDownLatch endGate = new CountDownLatch(2);

        final Set<String> result = new HashSet<>();

        Thread bing = new Thread(() -> {
            try {
                startGate.await();
            } catch (InterruptedException | BrokenBarrierException e) {
                e.printStackTrace();
            }

            RemoteWebDriver driver = new RemoteWebDriver(service.getUrl(), DesiredCapabilities.phantomjs());

            driver.get("http://www.bing.com/");
            Object title = driver.executeScript("return document.title");

            assertThat(title.toString(), is("Bing"));

            result.add("Bing");

            driver.close();
            endGate.countDown();
        });

        Thread bloomberg = new Thread(() -> {
            try {
                startGate.await();
            } catch (InterruptedException | BrokenBarrierException e) {
                e.printStackTrace();
            }
            RemoteWebDriver driver = new RemoteWebDriver(service.getUrl(), DesiredCapabilities.phantomjs());

            driver.get("http://www.bloomberg.com/");
            Object title = driver.executeScript("return document.title");

            assertThat(title.toString(), containsString("Bloomberg"));

            result.add("Bloomberg");

            driver.close();
            endGate.countDown();
        });

        bing.start();
        bloomberg.start();

        try {
            startGate.await();
        } catch (InterruptedException | BrokenBarrierException e) {
            e.printStackTrace();
        }

        try {
            endGate.await(30, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        assertThat(result, hasItems("Bloomberg", "Bing"));
    }

    @Test
    public void checkingLogs(){

        DesiredCapabilities phantomjs = DesiredCapabilities.phantomjs();

        System.out.println(phantomjs);


        RemoteWebDriver driver = new RemoteWebDriver(service.getUrl(), phantomjs);

        driver.get("http://notexistingpage.com/");
        log(driver);

        driver.get("http://www.bloomberg.com/");
        log(driver);

        driver.get("http://www.bloomberg.com/blablabla");
        log(driver);

        driver.close();
    }

    private void log(RemoteWebDriver driver) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(mapper.getVisibilityChecker().withFieldVisibility(JsonAutoDetect.Visibility.ANY));

        WebDriver.Options options = driver.manage();
        LogEntries browserLogs = options.logs().get("har");

        browserLogs.getAll().stream().forEach(le -> {

            try {
                LogContainer log = mapper.readValue(le.getMessage(), LogContainer.class);

                System.out.println("> " + log.result().isSuccessful());

            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    @Test
    public void shouldFetchJsonResultAsMap(){

        RemoteWebDriver driver = new RemoteWebDriver(service.getUrl(), DesiredCapabilities.phantomjs());

        driver.get("http://www.bing.com/");
        Object resultObject = driver.executeScript("return { title: document.title}");

        assertThat(resultObject.getClass(), typeCompatibleWith(Map.class));

        driver.close();
    }

    @Test
    public void shouldFetchJsonResultAsString(){

        RemoteWebDriver driver = new RemoteWebDriver(service.getUrl(), DesiredCapabilities.phantomjs());

        driver.get("http://www.bing.com/");
        Object resultJsonString = driver.executeScript("return JSON.stringify({ title: document.title})");

        assertThat(resultJsonString.getClass(), typeCompatibleWith(String.class));

        driver.close();
    }
}
