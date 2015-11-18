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

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.script.SimpleBindings;
import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
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
                System.out.println("===========> Bing waiting");
                startGate.await();
            } catch (InterruptedException | BrokenBarrierException e) {
                e.printStackTrace();
            }

            System.out.println("===========> Bing running");

            RemoteWebDriver driver = new RemoteWebDriver(service.getUrl(), DesiredCapabilities.chrome());

            driver.get("http://www.bing.com/");
            Object title = driver.executeScript("return document.title");

            System.out.println("===========> Bing script executed");

            assertThat(title.toString(), is("Bing"));

            System.out.println("===========> Bing script OK");

            result.add("Bing");

            driver.close();

            System.out.println("===========> Bing done");
            endGate.countDown();
        });

        Thread google = new Thread(() -> {
            try {
                System.out.println("===========> Google waiting");
                startGate.await();
            } catch (InterruptedException | BrokenBarrierException e) {
                e.printStackTrace();
            }

            System.out.println("===========> Google running");

            RemoteWebDriver driver = new RemoteWebDriver(service.getUrl(), DesiredCapabilities.chrome());

            driver.get("http://www.google.com/");
            Object title = driver.executeScript("return document.title");

            System.out.println("===========> Google script executed");

            assertThat(title.toString(), containsString("Google"));

            System.out.println("===========> Google script OK");

            result.add("Google");

            driver.close();
            System.out.println("===========> Google done");
            endGate.countDown();
        });

        bing.start();
        google.start();

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

        assertThat(result, hasItems("Google", "Bing"));
    }

    @Test
    public void checkingLogs(){

        DesiredCapabilities phantomjs = DesiredCapabilities.phantomjs();

        System.out.println(phantomjs);


        RemoteWebDriver driver = new RemoteWebDriver(service.getUrl(), phantomjs);

        driver.get("http://notexistingpage.com/");
        log(driver);

        driver.get("http://www.bing.com/");
        log(driver);

        driver.get("http://www.bing.com/blablabla");
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
    public void shouldConnectToPhantomjsAndFetchWikipediaPageAndContext(){

        RemoteWebDriver driver = new RemoteWebDriver(service.getUrl(), DesiredCapabilities.phantomjs());

        Map<String, Object> context = new HashMap<>();
        context.put("label", "Title");

        String initScript = "var context=arguments[0];";

        driver.get("https://www.wikipedia.org/");
        Object result = driver.executeScript(initScript + "return context.label+': '+document.title", context);

        assertThat(result.toString(), is("Title: Wikipedia"));

        driver.close();
    }

    @Test
    public void shouldFetchJsonResultAsMap(){

        RemoteWebDriver driver = new RemoteWebDriver(service.getUrl(), DesiredCapabilities.phantomjs());

        driver.get("http://www.bing.com/");
        Object resultObject = driver.executeScript("return { title: document.title}");

        WebDriver.Navigation navigation = driver.navigate();

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

    /**
     * Unified method of executing scripts in nashorn and phantomjs
     */
    @Test
    public void shouldExecuteScript() {

        String jsScript =
                "function main(input, ctx){" +
                        "var name = ctx.name;" +
                        "ctx.in = input;" +
                        "ctx.name = ctx.name+'Test';" +
                        "return input+12" +
                        "}";

        String execScript =
                ";ctx=arguments[0];" +
                        "return {out: main(arguments[1], ctx), context: ctx};";

        Map<String, Object> ctx = new HashMap<>();
        ctx.put("name", "Mark");

        Object param = "Test1";

        RemoteWebDriver engine = new RemoteWebDriver(service.getUrl(), DesiredCapabilities.phantomjs());

        System.out.println("Ctx: "+ctx);

        Map<String, Object> result = (Map<String, Object>) engine.executeScript(jsScript+execScript, ctx, param);
        Object out = result.get("out");
        ctx = (Map<String, Object>) result.get("context");

        System.out.println("Out: "+out);
        System.out.println("Ctx: "+ctx);

        engine.close();
    }
}
