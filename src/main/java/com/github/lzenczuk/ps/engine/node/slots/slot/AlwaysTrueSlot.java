package com.github.lzenczuk.ps.engine.node.slots.slot;

import com.github.lzenczuk.ps.engine.script.ScriptExecutor;

import java.util.Map;

/**
 * @author lzenczuk 30/09/2015
 */
public class AlwaysTrueSlot extends Slot {
    @Override
    public SlotValidationResult validate(Map<String, Object> ctx, Object outPut, ScriptExecutor scriptExecutor) {
        return new SlotValidationResult(true, getNodeName());
    }
}
