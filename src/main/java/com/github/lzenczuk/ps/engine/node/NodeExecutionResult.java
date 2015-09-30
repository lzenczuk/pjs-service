package com.github.lzenczuk.ps.engine.node;

import java.util.Map;
import java.util.Optional;

/**
 * @author lzenczuk 29/09/2015
 */
public class NodeExecutionResult {
    private final boolean error;
    private String errorMessage = null;

    private final Map<java.lang.String, Object> ctx;
    private final Object outPut;
    private final Optional<String> nextNodeName;

    public NodeExecutionResult(Map<java.lang.String, Object> ctx, Object outPut, Optional<String> nextNodeName) {
        this.ctx = ctx;
        this.nextNodeName = nextNodeName;
        this.outPut = outPut;

        this.error=false;
    }

    public NodeExecutionResult(java.lang.String errorMessage) {
        this.errorMessage = errorMessage;
        this.error=true;

        this.ctx=null;
        this.outPut=null;
        this.nextNodeName =null;
    }

    public Map<java.lang.String, Object> getCtx() {
        return ctx;
    }

    public boolean isError() {
        return error;
    }

    public java.lang.String getErrorMessage() {
        return errorMessage;
    }

    public Optional<String> getNextNodeName() {
        return nextNodeName;
    }

    public Object getOutPut() {
        return outPut;
    }
}
