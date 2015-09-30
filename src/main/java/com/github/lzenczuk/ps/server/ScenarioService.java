package com.github.lzenczuk.ps.server;

import com.github.lzenczuk.ps.engine.node.ScriptNode;
import com.github.lzenczuk.ps.engine.node.slots.Slots;
import com.github.lzenczuk.ps.engine.node.slots.slot.AlwaysTrueSlot;
import com.github.lzenczuk.ps.engine.node.slots.slot.ScriptSlot;
import com.github.lzenczuk.ps.engine.node.slots.slot.Slot;
import com.github.lzenczuk.ps.engine.scenario.Scenario;

import java.util.Optional;

/**
 * @author lzenczuk 30/09/2015
 */
public class ScenarioService {

    private Scenario scenarion;

    private Scenario createScenario() {
        Scenario scenario = new Scenario(Optional.of("randomNumberNode"));

        ScriptNode randomNumberNode = new ScriptNode("randomNumberNode");
        randomNumberNode.setScript("function main(input, ctx){ ctx.msg='Random number: '; return Math.floor((Math.random()*100))}");
        scenario.add(randomNumberNode);


        ScriptNode lessThen50Node = new ScriptNode("lessThen50Node");
        lessThen50Node.setScript("function main(input, ctx){ return ctx.msg+'less then 50'}");
        scenario.add(lessThen50Node);

        ScriptNode moreThen50Node = new ScriptNode("moreThen50Node");
        moreThen50Node.setScript("function main(input, ctx){ return ctx.msg+'more then 50'}");
        scenario.add(moreThen50Node);

        ScriptSlot lessThen50Slot = new ScriptSlot();
        lessThen50Slot.setScript("function main(input, ctx){ return input < 50}");
        lessThen50Slot.setNodeName("lessThen50Node");

        ScriptSlot moreThen50Slot = new ScriptSlot();
        moreThen50Slot.setScript("function main(input, ctx){ return input >= 50}");
        moreThen50Slot.setNodeName("moreThen50Node");

        Slots randomNumberSlots = new Slots();
        randomNumberSlots.addSlot(lessThen50Slot);
        randomNumberSlots.addSlot(moreThen50Slot);

        randomNumberNode.setSlots(randomNumberSlots);

        Slot repeatSlot = new AlwaysTrueSlot();
        repeatSlot.setNodeName("randomNumberNode");

        Slots repeatSlots = new Slots();
        repeatSlots.addSlot(repeatSlot);

        moreThen50Node.setSlots(repeatSlots);

        return scenario;
    }

    public Scenario getScenario(){
        if(scenarion==null){
            scenarion = createScenario();
        }

        return scenarion;
    }
}
