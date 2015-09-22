package com.github.lzenczuk.ps.log;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

/**
 * @author lzenczuk 22/09/2015
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class PageLog {
    private String version;
    private List<Resource> entries;

    @Override
    public String toString() {
        return "PageLog{" + "\n" +
                "entries=" + entries + "\n" +
                ", version='" + version + '\'' + "\n" +
                '}';
    }

    public MainRequestResult result() {
        if(entries != null && !entries.isEmpty()) return entries.get(0).result();

        return new MainRequestResult(-1, "No log entries");
    }
}
