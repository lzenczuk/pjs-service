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
    private final Optional<Long> nextNodeId;

    public NodeExecutionResult(Map<String, Object> ctx, Object outPut, Optional<Long> nextNodeId) {
        this.ctx = ctx;
        this.nextNodeId = nextNodeId;
        this.outPut = outPut;

        this.error=false;
    }

    public NodeExecutionResult(java.lang.String errorMessage) {
        this.errorMessage = errorMessage;
        this.error=true;

        this.ctx=null;
        this.outPut=null;
        this.nextNodeId =null;
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

    public Optional<Long> getNextNodeId() {
        return nextNodeId;
    }

    public Object getOutPut() {
        return outPut;
    }
}
