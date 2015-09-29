package com.github.lzenczuk.ps.engine.script;

import java.util.Map;

/**
 * @author lzenczuk 23/09/2015
 */
public interface ScriptExecutor {
    ScriptExecutionResult executeScript(String script, Map<String, Object> ctx, Object input);
    ScriptExecutionResult executeExpression(String script, Map<String, Object> ctx, Object input);
    void shutDown();
}
