package com.github.lzenczuk.ps.engine.node.slots;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.lzenczuk.ps.engine.node.slots.slot.Slot;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

/**
 * @author lzenczuk 29/09/2015
 */
public class Slots {

    List<Slot> slots = new LinkedList<>();

    public void addSlot(Slot s){
        slots.add(s);
    }

    @JsonIgnore
    public boolean isEmpty(){
        return slots.isEmpty();
    }

    @JsonIgnore
    public Iterator<Slot> getSlotsIterator(){
        return slots.iterator();
    }
}
