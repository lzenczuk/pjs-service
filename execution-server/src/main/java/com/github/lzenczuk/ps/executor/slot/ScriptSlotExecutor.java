package com.github.lzenczuk.ps.executor.slot;

import com.github.lzenczuk.ps.engine.node.slots.slot.ScriptSlot;
import com.github.lzenczuk.ps.executor.result.SlotValidationResult;
import com.github.lzenczuk.ps.executor.result.ScriptExecutionResult;
import com.github.lzenczuk.ps.executor.script.ScriptExecutor;

import java.util.Map;

/**
 * @author lzenczuk 28/11/2015
 */
public class ScriptSlotExecutor {

    public SlotValidationResult validate(ScriptSlot slot, Map<String, Object> ctx, Object outPut, ScriptExecutor scriptExecutor){
        ScriptExecutionResult scriptExecutionResult = scriptExecutor.executeScript(slot.getScript(), ctx, outPut);

        if(scriptExecutionResult.isError()){
            return new SlotValidationResult(scriptExecutionResult.getErrorMessage());
        }

        if(scriptExecutionResult.getOutPut() instanceof Boolean){
            return new SlotValidationResult((Boolean) scriptExecutionResult.getOutPut(), slot.getDesNodeId());
        }else{
            return new SlotValidationResult("Validation script return non boolean value");
        }
    }
}
