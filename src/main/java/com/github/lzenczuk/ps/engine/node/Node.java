package com.github.lzenczuk.ps.engine.node;

import com.github.lzenczuk.ps.engine.script.ScriptExecutorManager;

import java.util.Map;

/**
 * @author lzenczuk 29/09/2015
 */
public abstract class Node {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public abstract NodeExecutionResult execute(Map<java.lang.String, Object> ctx, Object input, ScriptExecutorManager executorManager);
}
