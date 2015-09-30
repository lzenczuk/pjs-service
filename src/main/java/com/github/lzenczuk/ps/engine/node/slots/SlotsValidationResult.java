package com.github.lzenczuk.ps.engine.node.slots;

import com.github.lzenczuk.ps.engine.node.Node;

import java.util.Optional;

/**
 * @author lzenczuk 29/09/2015
 */
public class SlotsValidationResult {
    private final Optional<String> nextNode;
    private final boolean error;
    private java.lang.String errorMessage = null;

    public SlotsValidationResult(Optional<String> nextNode) {
        this.nextNode = nextNode;
        this.error=false;
    }

    public SlotsValidationResult(java.lang.String errorMessage) {
        this.error = true;
        this.errorMessage = errorMessage;
        this.nextNode = null;
    }

    public Optional<String> getNextNode() {
        return nextNode;
    }

    public boolean isError() {
        return error;
    }

    public java.lang.String getErrorMessage() {
        return errorMessage;
    }
}
