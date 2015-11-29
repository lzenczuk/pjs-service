package com.github.lzenczuk.ps.executor.result;

import java.util.Optional;

/**
 * @author lzenczuk 29/09/2015
 */
public class SlotValidationResult {
    private final boolean valid;
    private final Optional<Long> nextNodeId;
    private final boolean error;
    private String errorMessage = null;

    public SlotValidationResult(boolean valid, Long nextNodeId) {
        this.valid = valid;
        this.error=false;
        this.nextNodeId = Optional.ofNullable(nextNodeId);
    }

    public SlotValidationResult(String errorMessage) {
        this.error = true;
        this.errorMessage = errorMessage;
        this.valid = false;
        this.nextNodeId = Optional.empty();
    }

    public boolean isValid() {
        return valid;
    }

    public boolean isError() {
        return error;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public Optional<Long> getNextNodeId() {
        return nextNodeId;
    }
}
