package com.github.lzenczuk.ps.engine.script;

import java.util.Map;

/**
 * @author lzenczuk 25/09/2015
 */
public class ScriptExecutionResult {
    private final Map<String, Object> ctx;
    private final Object outPut;

    private final boolean error;
    private String errorMessage = null;

    public ScriptExecutionResult(Map<String, Object> ctx, Object outPut) {
        this.error=false;
        this.ctx = ctx;
        this.outPut = outPut;
    }

    public ScriptExecutionResult(String errorMessage) {
        this.errorMessage = errorMessage;
        this.error = true;

        this.ctx=null;
        this.outPut=null;
    }

    public Map<String, Object> getCtx() {
        return ctx;
    }

    public Object getOutPut() {
        return outPut;
    }

    public boolean isError() {
        return error;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
