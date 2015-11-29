package com.github.lzenczuk.ps.executor;

import com.github.lzenczuk.ps.engine.node.slots.Slots;
import com.github.lzenczuk.ps.executor.result.SlotsValidationResult;
import com.github.lzenczuk.ps.engine.node.slots.slot.AlwaysTrueSlot;
import com.github.lzenczuk.ps.engine.node.slots.slot.ScriptSlot;
import com.github.lzenczuk.ps.engine.node.slots.slot.Slot;
import com.github.lzenczuk.ps.executor.result.SlotValidationResult;
import com.github.lzenczuk.ps.executor.script.ScriptExecutor;
import com.github.lzenczuk.ps.executor.slot.AlwaysTrueSlotExecutor;
import com.github.lzenczuk.ps.executor.slot.ScriptSlotExecutor;

import java.util.Iterator;
import java.util.Map;
import java.util.Optional;

/**
 * @author lzenczuk 28/11/2015
 */
public class SlotsExecutor {

    private AlwaysTrueSlotExecutor alwaysTrueSlotExecutor = new AlwaysTrueSlotExecutor();
    private ScriptSlotExecutor scriptSlotExecutor = new ScriptSlotExecutor();

    public SlotsValidationResult getNextNode(Slots slots, Map<String, Object> ctx, Object outPut, ScriptExecutor scriptExecutor) {

        if (slots.isEmpty()) {
            return new SlotsValidationResult(Optional.<Long>empty());
        }

        final Iterator<Slot> slotsIterator = slots.getSlotsIterator();

        while (slotsIterator.hasNext()) {
            final Slot slot = slotsIterator.next();

            SlotValidationResult result;

            switch (slot.getClass().getName()) {
                case "com.github.lzenczuk.ps.engine.node.slots.slot.AlwaysTrueSlot":
                    result = alwaysTrueSlotExecutor.validate((AlwaysTrueSlot) slot, ctx, outPut, scriptExecutor);
                    break;
                case "com.github.lzenczuk.ps.engine.node.slots.slot.ScriptSlot":
                    result = scriptSlotExecutor.validate((ScriptSlot) slot, ctx, outPut, scriptExecutor);
                    break;
                default:
                    return new SlotsValidationResult("Unknown slot type: " + slot.getClass().getName());
            }

            if (result.isError()) {
                return new SlotsValidationResult(result.getErrorMessage());
            }

            if (result.isValid()) {
                return new SlotsValidationResult(result.getNextNodeId());
            }
        }

        return new SlotsValidationResult("Not valid slot.");
    }

    public void setAlwaysTrueSlotExecutor(AlwaysTrueSlotExecutor alwaysTrueSlotExecutor) {
        this.alwaysTrueSlotExecutor = alwaysTrueSlotExecutor;
    }

    public void setScriptSlotExecutor(ScriptSlotExecutor scriptSlotExecutor) {
        this.scriptSlotExecutor = scriptSlotExecutor;
    }
}
