package com.github.lzenczuk.ps.engine.node;

import java.util.Map;

/**
 * @author lzenczuk 29/09/2015
 */
public class NodeExecutionResult {
    private final boolean error;
    private String errorMessage = null;

    private final Map<String, Object> ctx;
    private final Object outPut;
    private final Node nextNode;

    public NodeExecutionResult(Map<String, Object> ctx, Object outPut, Node nextNode) {
        this.ctx = ctx;
        this.nextNode = nextNode;
        this.outPut = outPut;

        this.error=false;
    }

    public NodeExecutionResult(String errorMessage) {
        this.errorMessage = errorMessage;
        this.error=true;

        this.ctx=null;
        this.outPut=null;
        this.nextNode=null;
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

    public Node getNextNode() {
        return nextNode;
    }

    public Object getOutPut() {
        return outPut;
    }
}
