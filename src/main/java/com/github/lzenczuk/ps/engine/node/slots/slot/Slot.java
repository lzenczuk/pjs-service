package com.github.lzenczuk.ps.engine.node.slots.slot;

import com.github.lzenczuk.ps.engine.script.ScriptExecutionResult;
import com.github.lzenczuk.ps.engine.script.ScriptExecutor;

import java.util.Map;

/**
 * @author lzenczuk 29/09/2015
 */
public class Slot {

    private java.lang.String script;
    private String nodeName;

    public Slot() {
    }

    public Slot(java.lang.String script, String nodeName) {
        this.nodeName = nodeName;
        this.script = script;
    }

    public SlotValidationResult validate(Map<java.lang.String, Object> ctx, Object outPut, ScriptExecutor scriptExecutor){
        ScriptExecutionResult scriptExecutionResult = scriptExecutor.executeScript(script, ctx, outPut);

        if(scriptExecutionResult.isError()){
            return new SlotValidationResult(scriptExecutionResult.getErrorMessage());
        }

        if(scriptExecutionResult.getOutPut() instanceof Boolean){
            return new SlotValidationResult((Boolean) scriptExecutionResult.getOutPut(), this.nodeName);
        }else{
            return new SlotValidationResult("Validation script return non boolean value");
        }
    }

    public void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }

    public void setScript(java.lang.String script) {
        this.script = script;
    }
}
