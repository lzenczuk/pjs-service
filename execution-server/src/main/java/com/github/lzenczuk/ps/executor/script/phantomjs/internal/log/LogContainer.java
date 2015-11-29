package com.github.lzenczuk.ps.executor.script.phantomjs.internal.log;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author lzenczuk 22/09/2015
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class LogContainer {
    private PageLog log;

    public MainRequestResult result() {
        if(log != null) return log.result();

        return new MainRequestResult(-1, "No log");
    }

    @Override
    public String toString() {
        return "LogContainer{" + "\n" +
                "log=" + log + "\n" +
                '}';
    }
}
