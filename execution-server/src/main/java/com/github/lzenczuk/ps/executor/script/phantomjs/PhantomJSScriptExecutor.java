package com.github.lzenczuk.ps.executor.script.phantomjs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.lzenczuk.ps.executor.result.ScriptExecutionResult;
import com.github.lzenczuk.ps.executor.script.ScriptExecutor;
import com.github.lzenczuk.ps.executor.script.phantomjs.internal.PhantomJsErrorMessage;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.WebDriverException;
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

    public void goToPage(String url){
        if(engine!=null){
            engine.close();
        }

        engine = createEngine();
        engine.get(url);
    }
}
