package com.github.lzenczuk.ps.engine.node.slots;

import com.github.lzenczuk.ps.engine.node.Node;

/**
 * @author lzenczuk 29/09/2015
 */
public class SlotsValidationResult {
    private final Node nextNode;
    private final boolean error;
    private String errorMessage = null;

    public SlotsValidationResult(Node nextNode) {
        this.nextNode = nextNode;
        this.error=false;
    }

    public SlotsValidationResult(String errorMessage) {
        this.error = true;
        this.errorMessage = errorMessage;
        this.nextNode = null;
    }

    public Node getNextNode() {
        return nextNode;
    }

    public boolean isError() {
        return error;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
