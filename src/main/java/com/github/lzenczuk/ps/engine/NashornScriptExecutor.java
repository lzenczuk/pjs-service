package com.github.lzenczuk.ps.engine;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author lzenczuk 25/09/2015
 */
public class NashornScriptExecutor implements ScriptExecutor {

    private final ScriptEngine engine;

    public NashornScriptExecutor() {
        engine = new ScriptEngineManager().getEngineByName("nashorn");
    }

    @Override
    public ScriptExecutionResult executeScript(String script, Map<String, Object> ctx, Object input) {

        HashMap<String, Object> internalContextMap = new HashMap<>(ctx);

        try {
            engine.eval(script);
            Invocable inv = (Invocable) engine;
            Object out = inv.invokeFunction("main", input, internalContextMap);

            return new ScriptExecutionResult(internalContextMap, out);
        } catch (ScriptException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public ScriptExecutionResult executeExpression(String script, Map<String, Object> ctx, Object input) {
        return null;
    }

    @Override
    public void shutDown() {}
}
