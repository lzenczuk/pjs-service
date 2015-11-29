package com.github.lzenczuk.ps.executor.script;

import com.github.lzenczuk.ps.executor.script.nashorn.NashornScriptExecutor;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * @author lzenczuk 29/09/2015
 */
public class ScriptExecutorManager {

    public static final String DEFAULT_EXECUTOR = "DEFAULT_EXECUTOR";

    Map<String, ScriptExecutor> executorMap = new HashMap<>();

    public ScriptExecutorManager() {
        executorMap.put(DEFAULT_EXECUTOR, new NashornScriptExecutor());
    }

    public ScriptExecutor defaultExecutor(){
        return executorMap.get(DEFAULT_EXECUTOR);
    }

    public Optional<ScriptExecutor> getExecutor(String name){
        if(name==null) return Optional.of(defaultExecutor());

        return Optional.ofNullable(executorMap.get(name));
    }

    public void addExecutor(String name, ScriptExecutor executor){
        if(DEFAULT_EXECUTOR.equals(name)) throw new IllegalArgumentException("Can't add executor. Name DEFAULT_EXECUTOR is reserved");

        executorMap.put(name, executor);
    }
}
