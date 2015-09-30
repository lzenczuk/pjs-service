package com.github.lzenczuk.ps.engine.node.slots.slot;

import java.util.Optional;

/**
 * @author lzenczuk 29/09/2015
 */
public class SlotValidationResult {
    private final boolean valid;
    private final Optional<String> nextNodeName;
    private final boolean error;
    private String errorMessage = null;

    public SlotValidationResult(boolean valid, String nextNodeName) {
        this.valid = valid;
        this.error=false;
        this.nextNodeName = Optional.ofNullable(nextNodeName);
    }

    public SlotValidationResult(String errorMessage) {
        this.error = true;
        this.errorMessage = errorMessage;
        this.valid = false;
        this.nextNodeName = Optional.empty();
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

    public Optional<String> getNextNodeName() {
        return nextNodeName;
    }
}
