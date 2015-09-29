package com.github.lzenczuk.ps.engine.node;

import com.github.lzenczuk.ps.engine.node.slots.Slots;
import com.github.lzenczuk.ps.engine.node.slots.SlotsValidationResult;
import com.github.lzenczuk.ps.engine.script.ScriptExecutionResult;
import com.github.lzenczuk.ps.engine.script.ScriptExecutor;

import java.util.Map;

/**
 * @author lzenczuk 29/09/2015
 */
public class ScriptNode implements Node {

    private String script;
    private ScriptExecutor scriptExecutor;

    private Slots slots;

    public ScriptNode(String script, Slots slots, ScriptExecutor scriptExecutor) {
        this.script = script;
        this.scriptExecutor = scriptExecutor;
        this.slots = slots;
    }

    @Override
    public NodeExecutionResult execute(Map<String, Object> ctx, Object input){

        ScriptExecutionResult scriptExecutionResult = scriptExecutor.executeScript(script, ctx, input);

        if(scriptExecutionResult.isError()){
            return new NodeExecutionResult(scriptExecutionResult.getErrorMessage());
        }

        SlotsValidationResult slotsValidationResult = slots.getNextNode(scriptExecutionResult.getCtx(), scriptExecutionResult.getOutPut(), scriptExecutor);

        if(slotsValidationResult.isError()){
            return new NodeExecutionResult(slotsValidationResult.getErrorMessage());
        }

        return new NodeExecutionResult(scriptExecutionResult.getCtx(), scriptExecutionResult.getOutPut(), slotsValidationResult.getNextNode());
    }
}
