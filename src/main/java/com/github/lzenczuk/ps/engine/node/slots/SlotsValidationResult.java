package com.github.lzenczuk.ps.engine.node.slots;

import java.util.Optional;

/**
 * @author lzenczuk 29/09/2015
 */
public class SlotsValidationResult {
    private final Optional<Long> nextNodeId;
    private final boolean error;
    private java.lang.String errorMessage = null;

    public SlotsValidationResult(Optional<Long> nextNodeId) {
        this.nextNodeId = nextNodeId;
        this.error=false;
    }

    public SlotsValidationResult(java.lang.String errorMessage) {
        this.error = true;
        this.errorMessage = errorMessage;
        this.nextNodeId = null;
    }

    public Optional<Long> getNextNodeId() {
        return nextNodeId;
    }

    public boolean isError() {
        return error;
    }

    public java.lang.String getErrorMessage() {
        return errorMessage;
    }
}
