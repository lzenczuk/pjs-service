package com.github.lzenczuk.ps.engine.script.phantomjs.internal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author lzenczuk 29/09/2015
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class PhantomJsErrorMessage {
    private String errorMessage;

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
