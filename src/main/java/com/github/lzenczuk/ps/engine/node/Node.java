package com.github.lzenczuk.ps.engine.node;

import com.github.lzenczuk.ps.engine.script.ScriptExecutorManager;

import java.util.Map;

/**
 * @author lzenczuk 29/09/2015
 */
public interface Node {
    NodeExecutionResult execute(Map<String, Object> ctx, Object input, ScriptExecutorManager executorManager);
}
