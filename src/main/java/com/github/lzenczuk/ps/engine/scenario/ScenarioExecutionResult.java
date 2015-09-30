package com.github.lzenczuk.ps.engine.scenario;

import java.util.Map;

/**
 * @author lzenczuk 29/09/2015
 */
public class ScenarioExecutionResult {
    private final boolean error;
    private String errorMessage = null;

    private final Map<String, Object> ctx;
    private final Object output;
    private final boolean terminated;

    public ScenarioExecutionResult(Map<String, Object> ctx, Object output) {
        this.output = output;
        this.ctx = ctx;
        this.terminated = false;

        this.error=false;
    }

    public ScenarioExecutionResult(Map<String, Object> ctx, Object output, boolean terminated) {
        this.output = output;
        this.ctx = ctx;
        this.terminated = terminated;

        this.error=false;
    }

    public ScenarioExecutionResult(String errorMessage) {
        this.errorMessage = errorMessage;
        this.error=true;

        this.ctx = null;
        this.output = null;
        this.terminated = false;
    }

    public Map<String, Object> getCtx() {
        return ctx;
    }

    public boolean isError() {
        return error;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public Object getOutput() {
        return output;
    }

    public boolean isTerminated() {
        return terminated;
    }

    @Override
    public String toString() {
        return "ScenarioExecutionResult{" +
                "output=" + output +
                ", ctx=" + ctx +
                ", terminated=" + terminated +
                ", error=" + error +
                ", errorMessage='" + errorMessage + '\'' +
                '}';
    }
}
