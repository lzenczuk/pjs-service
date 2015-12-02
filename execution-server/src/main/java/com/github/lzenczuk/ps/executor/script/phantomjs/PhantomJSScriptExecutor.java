package com.github.lzenczuk.ps.executor.script.phantomjs;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.lzenczuk.ps.executor.result.ScriptExecutionResult;
import com.github.lzenczuk.ps.executor.script.ScriptExecutor;
import com.github.lzenczuk.ps.executor.script.phantomjs.internal.PhantomJsErrorMessage;
import com.github.lzenczuk.ps.executor.script.phantomjs.internal.log.LogContainer;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.logging.LogEntries;
import org.openqa.selenium.phantomjs.PhantomJSDriverService;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.io.IOException;
import java.net.URL;
import java.util.Map;

/**
 * @author lzenczuk 25/09/2015
 */
public class PhantomJSScriptExecutor implements ScriptExecutor {

    private RemoteWebDriver engine;
    private final PhantomJSDriverService service;

    private ObjectMapper mapper;

    private String execScript =
            ";ctx=arguments[0];" +
                    "return {out: main(arguments[1], ctx), context: ctx};";

    public PhantomJSScriptExecutor() throws IOException {

        mapper = new ObjectMapper();

        URL phantomjsExecutable = PhantomJSScriptExecutor.class.getResource("/phantomjs/linux/phantomjs");

        service = new PhantomJSDriverService.Builder()
                .usingPhantomJSExecutable(FileUtils.toFile(phantomjsExecutable))
                .usingAnyFreePort()
                .build();

        service.start();

        engine = createEngine();
    }

    private RemoteWebDriver createEngine() {
        return new RemoteWebDriver(service.getUrl(), DesiredCapabilities.phantomjs());
    }

    @Override
    public ScriptExecutionResult executeScript(String script, Map<String, Object> ctx, Object input) {

        try {
            Map<String, Object> result = (Map<String, Object>) engine.executeScript(script + execScript, ctx, input);

            return new ScriptExecutionResult((Map<String, Object>) result.get("context"), result.get("out"));
        }catch (WebDriverException e){

            return new ScriptExecutionResult(extractErrorMessage(e.getMessage()));
        }
    }

    private String extractErrorMessage(String rawErrorMessage) {
        try {
            PhantomJsErrorMessage phantomJsErrorMessage = mapper.readValue(rawErrorMessage, PhantomJsErrorMessage.class);
            return phantomJsErrorMessage.getErrorMessage();
        } catch (IOException e) {
            return rawErrorMessage;
        }
    }

    @Override
    public ScriptExecutionResult executeExpression(String script, Map<String, Object> ctx, Object input) {
        return null;
    }

    @Override
    public void shutDown() {
        if(engine!=null){
            engine.close();
        }

        if(service!=null && service.isRunning()){
            service.stop();
        }
    }

    public boolean goToPage(String url){
        if(engine!=null){
            engine.close();
        }

        engine = createEngine();
        engine.get(url);

        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(mapper.getVisibilityChecker().withFieldVisibility(JsonAutoDetect.Visibility.ANY));

        WebDriver.Options options = engine.manage();
        LogEntries browserLogs = options.logs().get("har");

        final boolean[] result = {false};

        browserLogs.getAll().stream().findFirst().ifPresent(logEntry -> {
            try {
                LogContainer log = mapper.readValue(logEntry.getMessage(), LogContainer.class);
                if(log.result().isSuccessful()){
                    result[0] = true;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        System.out.println("==========> "+result[0]);

        return result[0];
        /*browserLogs.getAll().stream().forEach(le -> {

            System.out.println("=======> "+le.getMessage());

            try {
                LogContainer log = mapper.readValue(le.getMessage(), LogContainer.class);

                System.out.println("> " + log.result().isSuccessful());

            } catch (IOException e) {
                e.printStackTrace();
            }
        });*/
    }
}
