package com.github.lzenczuk.ps.executor.script;

import com.github.lzenczuk.ps.executor.result.ScriptExecutionResult;

import java.util.Map;

/**
 * @author lzenczuk 23/09/2015
 */
public interface ScriptExecutor {
    ScriptExecutionResult executeScript(String script, Map<String, Object> ctx, Object input);
    ScriptExecutionResult executeExpression(String script, Map<String, Object> ctx, Object input);
    void shutDown();
}
