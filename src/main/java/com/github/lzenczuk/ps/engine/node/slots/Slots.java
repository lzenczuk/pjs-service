package com.github.lzenczuk.ps.engine.node.slots;

import com.github.lzenczuk.ps.engine.node.slots.slot.Slot;
import com.github.lzenczuk.ps.engine.node.slots.slot.SlotValidationResult;
import com.github.lzenczuk.ps.engine.script.ScriptExecutor;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * @author lzenczuk 29/09/2015
 */
public class Slots {

    List<Slot> slots = new LinkedList<>();

    public void addSlot(Slot s){
        slots.add(s);
    }

    public SlotsValidationResult getNextNode(Map<String, Object> ctx, Object outPut, ScriptExecutor scriptExecutor){

        if(slots.isEmpty()){
            return new SlotsValidationResult(Optional.<Long>empty());
        }

        for(Slot s : slots){
            SlotValidationResult result = s.validate(ctx, outPut, scriptExecutor);

            if(result.isError()){
                return new SlotsValidationResult(result.getErrorMessage());
            }

            if(result.isValid()){
                return new SlotsValidationResult(result.getNextNodeId());
            }
        }

        return new SlotsValidationResult("Not valid slot.");
    }
}
