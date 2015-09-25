package com.github.lzenczuk.ps.engine;

import java.util.Map;

/**
 * @author lzenczuk 25/09/2015
 */
public class ScriptExecutionResult {
    private final Map<String, Object> ctx;
    private final Object outPut;

    public ScriptExecutionResult(Map<String, Object> ctx, Object outPut) {

        

        this.ctx = ctx;
        this.outPut = outPut;
    }

    public Map<String, Object> getCtx() {
        return ctx;
    }

    public Object getOutPut() {
        return outPut;
    }
}
