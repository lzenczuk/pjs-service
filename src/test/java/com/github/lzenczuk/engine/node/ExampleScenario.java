package com.github.lzenczuk.engine.node;

import com.github.lzenczuk.ps.engine.node.ScriptNode;
import com.github.lzenczuk.ps.engine.node.slots.Slots;
import com.github.lzenczuk.ps.engine.node.slots.slot.AlwaysTrueSlot;
import com.github.lzenczuk.ps.engine.node.slots.slot.ScriptSlot;
import com.github.lzenczuk.ps.engine.node.slots.slot.Slot;
import com.github.lzenczuk.ps.engine.scenario.Scenario;

import java.util.Optional;

public class ExampleScenario {


    /**
     * Creates scenario with three nodes.
     *
     *   ---------- random number
     *  |            |         |
     *  ----more then 50     less then 50
     *
     * node generates random number. When bigger then 50
     * generates another.
     *
     * @return
     */
    public static Scenario createScenario() {
        Scenario scenario = new Scenario(Optional.of(0L));

        ScriptNode randomNumberNode = new ScriptNode(0L, "randomNumberNode");
        randomNumberNode.setScript("function main(input, ctx){ ctx.msg='Random number: '; return Math.floor((Math.random()*100))}");
        scenario.add(randomNumberNode);


        ScriptNode lessThen50Node = new ScriptNode(1L, "lessThen50Node");
        lessThen50Node.setScript("function main(input, ctx){ return ctx.msg+'less then 50'}");
        scenario.add(lessThen50Node);

        ScriptNode moreThen50Node = new ScriptNode(2L, "moreThen50Node");
        moreThen50Node.setScript("function main(input, ctx){ return ctx.msg+'more then 50'}");
        scenario.add(moreThen50Node);

        ScriptSlot lessThen50Slot = new ScriptSlot();
        lessThen50Slot.setScript("function main(input, ctx){ return input < 50}");
        lessThen50Slot.setDesNodeId(1L);

        ScriptSlot moreThen50Slot = new ScriptSlot();
        moreThen50Slot.setScript("function main(input, ctx){ return input >= 50}");
        moreThen50Slot.setDesNodeId(2L);

        Slots randomNumberSlots = new Slots();
        randomNumberSlots.addSlot(lessThen50Slot);
        randomNumberSlots.addSlot(moreThen50Slot);

        randomNumberNode.setSlots(randomNumberSlots);

        Slot repeatSlot = new AlwaysTrueSlot();
        repeatSlot.setDesNodeId(0L);

        Slots repeatSlots = new Slots();
        repeatSlots.addSlot(repeatSlot);

        moreThen50Node.setSlots(repeatSlots);

        return scenario;
    }
}