package com.github.lzenczuk.ps.log;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author lzenczuk 22/09/2015
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Resource {
    private long time;
    private Request request;
    private Response response;

    @Override
    public String toString() {
        return "ResourceLog{" + "\n" +
                "request=" + request + "\n" +
                ", time=" + time + "\n" +
                ", response=" + response + "\n" +
                '}';
    }

    public MainRequestResult result() {
        if(response != null) return response.result();

        return new MainRequestResult(-1, "No log response");
    }
}
