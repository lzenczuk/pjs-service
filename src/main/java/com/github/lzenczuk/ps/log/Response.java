package com.github.lzenczuk.ps.log;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author lzenczuk 22/09/2015
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Response {
    private int status;
    private String statusText;

    @Override
    public String toString() {
        return "ResponseLog{\n" +
                "status=" + status + "\n" +
                ", statusText='" + statusText + '\'' + "\n" +
                '}';
    }

    public MainRequestResult result() {
        return new MainRequestResult(status, statusText);
    }
}
