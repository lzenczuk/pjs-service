package com.github.lzenczuk.ps.engine;

import org.apache.commons.io.FileUtils;
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

    private String execScript =
            ";ctx=arguments[0];" +
                    "return {out: main(arguments[1], ctx), context: ctx};";

    public PhantomJSScriptExecutor() throws IOException {
        URL phantomjsExecutable = PhantomJSScriptExecutor.class.getResource("/phantomjs/linux/phantomjs");

        service = new PhantomJSDriverService.Builder()
                .usingPhantomJSExecutable(FileUtils.toFile(phantomjsExecutable))
                .usingAnyFreePort()
                .build();

        service.start();

        engine = new RemoteWebDriver(service.getUrl(), DesiredCapabilities.phantomjs());
    }

    @Override
    public ScriptExecutionResult executeScript(String script, Map<String, Object> ctx, Object input) {

        Map<String, Object> result = (Map<String, Object>) engine.executeScript(script+execScript, ctx, input);

        return new ScriptExecutionResult((Map<String, Object>) result.get("context"), result.get("out"));
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
}
