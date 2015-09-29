package com.github.lzenczuk.ps.engine.script.nashorn;

import com.github.lzenczuk.ps.engine.script.ScriptExecutionResult;
import com.github.lzenczuk.ps.engine.script.ScriptExecutor;

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

        // Nashorn updating objects send as parameter. This unify it behavior with PhantomJS
        HashMap<String, Object> internalContextMap = ctx == null ? new HashMap<>() : new HashMap<>(ctx);

        try {
            engine.eval(script);
            Invocable inv = (Invocable) engine;
            Object out = inv.invokeFunction("main", input, internalContextMap);

            return new ScriptExecutionResult(internalContextMap, out);
        } catch (ScriptException | NoSuchMethodException e) {
            return new ScriptExecutionResult(e.getMessage());
        }
    }

    @Override
    public ScriptExecutionResult executeExpression(String script, Map<String, Object> ctx, Object input) {
        return null;
    }

    @Override
    public void shutDown() {}
}
