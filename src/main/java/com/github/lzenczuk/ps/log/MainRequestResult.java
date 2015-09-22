package com.github.lzenczuk.ps.log;

/**
 * @author lzenczuk 22/09/2015
 */
public class MainRequestResult {
    private final int status;
    private final String message;

    public MainRequestResult(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public boolean isSuccessful(){
        return status==200;
    }

    public String getMessage() {
        return message;
    }

    public int getStatus() {
        return status;
    }

    @Override
    public String toString() {
        return "MainRequestResult{" +
                "message='" + message + '\'' +
                ", status=" + status +
                '}';
    }
}
