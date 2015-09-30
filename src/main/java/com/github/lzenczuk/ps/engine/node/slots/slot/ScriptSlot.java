package com.github.lzenczuk.ps.engine.node.slots.slot;

import com.github.lzenczuk.ps.engine.script.ScriptExecutionResult;
import com.github.lzenczuk.ps.engine.script.ScriptExecutor;

import java.util.Map;

/**
 * @author lzenczuk 29/09/2015
 */
public class ScriptSlot extends Slot {

    private java.lang.String script;

    public ScriptSlot() {
    }

    public ScriptSlot(java.lang.String script, String nodeName) {
        this.setNodeName(nodeName);
        this.script = script;
    }

    @Override
    public SlotValidationResult validate(Map<java.lang.String, Object> ctx, Object outPut, ScriptExecutor scriptExecutor){
        ScriptExecutionResult scriptExecutionResult = scriptExecutor.executeScript(script, ctx, outPut);

        if(scriptExecutionResult.isError()){
            return new SlotValidationResult(scriptExecutionResult.getErrorMessage());
        }

        if(scriptExecutionResult.getOutPut() instanceof Boolean){
            return new SlotValidationResult((Boolean) scriptExecutionResult.getOutPut(), this.getNodeName());
        }else{
            return new SlotValidationResult("Validation script return non boolean value");
        }
    }

    public void setScript(java.lang.String script) {
        this.script = script;
    }
}
