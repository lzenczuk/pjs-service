package com.github.lzenczuk.ps.executor.slot;

import com.github.lzenczuk.ps.engine.node.slots.slot.AlwaysTrueSlot;
import com.github.lzenczuk.ps.executor.result.SlotValidationResult;
import com.github.lzenczuk.ps.executor.script.ScriptExecutor;

import java.util.Map;

/**
 * @author lzenczuk 28/11/2015
 */
public class AlwaysTrueSlotExecutor {

    public SlotValidationResult validate(AlwaysTrueSlot slot, Map<String, Object> ctx, Object outPut, ScriptExecutor scriptExecutor) {
        return new SlotValidationResult(true, slot.getDesNodeId());
    }
}
