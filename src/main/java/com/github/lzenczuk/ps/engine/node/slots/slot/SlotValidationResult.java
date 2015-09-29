package com.github.lzenczuk.ps.engine.node.slots.slot;

/**
 * @author lzenczuk 29/09/2015
 */
public class SlotValidationResult {
    private final boolean valid;
    private final boolean error;
    private String errorMessage = null;

    public SlotValidationResult(boolean valid) {
        this.valid = valid;
        this.error=false;
    }

    public SlotValidationResult(String errorMessage) {
        this.error = true;
        this.errorMessage = errorMessage;
        this.valid = false;
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
}
