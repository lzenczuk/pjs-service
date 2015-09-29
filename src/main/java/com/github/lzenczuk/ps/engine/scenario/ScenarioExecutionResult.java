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

    public ScenarioExecutionResult(Map<String, Object> ctx, Object output) {
        this.output = output;
        this.ctx = ctx;

        this.error=false;
    }

    public ScenarioExecutionResult(String errorMessage) {
        this.errorMessage = errorMessage;
        this.error=true;

        this.ctx = null;
        this.output = null;
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

    @Override
    public String toString() {
        return "ScenarioExecutionResult{" +
                "ctx=" + ctx +
                ", error=" + error +
                ", errorMessage='" + errorMessage + '\'' +
                ", output=" + output +
                '}';
    }
}
