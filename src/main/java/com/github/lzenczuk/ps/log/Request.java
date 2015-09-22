package com.github.lzenczuk.ps.log;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author lzenczuk 22/09/2015
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Request {
    private String url;

    @Override
    public String toString() {
        return "RequestLog{\n" +
                "url='" + url + '\'' + "\n" +
                '}';
    }
}
