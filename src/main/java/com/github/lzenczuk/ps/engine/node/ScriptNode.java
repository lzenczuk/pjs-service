package com.github.lzenczuk.ps.engine.node;

import com.github.lzenczuk.ps.engine.node.slots.Slots;
import com.github.lzenczuk.ps.engine.node.slots.SlotsValidationResult;
import com.github.lzenczuk.ps.engine.script.ScriptExecutionResult;
import com.github.lzenczuk.ps.engine.script.ScriptExecutorManager;

import java.util.Map;

/**
 * @author lzenczuk 29/09/2015
 */
public class ScriptNode extends Node {

    private String script;
    private Slots slots = new Slots();
    private String executorName;

    public ScriptNode() {
    }

    public ScriptNode(String name) {
        this.setName(name);
    }

    public ScriptNode(String script, Slots slots) {
        this.script = script;
        this.slots = slots;
    }

    public ScriptNode(String script, Slots slots, String executorName) {
        this.script = script;
        this.slots = slots;
        this.executorName = executorName;
    }

    @Override
    public NodeExecutionResult execute(Map<String, Object> ctx, Object input, ScriptExecutorManager executorManager){

        return executorManager.getExecutor(executorName).map(scriptExecutor -> {
            ScriptExecutionResult scriptExecutionResult = scriptExecutor.executeScript(script, ctx, input);

            if(scriptExecutionResult.isError()){
                return new NodeExecutionResult(scriptExecutionResult.getErrorMessage());
            }

            SlotsValidationResult slotsValidationResult = slots.getNextNode(scriptExecutionResult.getCtx(), scriptExecutionResult.getOutPut(), scriptExecutor);

            if(slotsValidationResult.isError()){
                return new NodeExecutionResult(slotsValidationResult.getErrorMessage());
            }

            return new NodeExecutionResult(scriptExecutionResult.getCtx(), scriptExecutionResult.getOutPut(), slotsValidationResult.getNextNode());
        }).orElse(new NodeExecutionResult("Script executor: " + executorName + " not found."));
    }

    public void setExecutorName(String executorName) {
        this.executorName = executorName;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public void setSlots(Slots slots) {
        this.slots = slots;
    }
}
