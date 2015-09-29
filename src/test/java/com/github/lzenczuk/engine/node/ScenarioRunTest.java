package com.github.lzenczuk.engine.node;

import com.github.lzenczuk.ps.engine.node.ScriptNode;
import com.github.lzenczuk.ps.engine.node.slots.Slots;
import com.github.lzenczuk.ps.engine.node.slots.slot.Slot;
import com.github.lzenczuk.ps.engine.scenario.Scenario;
import com.github.lzenczuk.ps.engine.scenario.ScenarioExecutionResult;
import org.junit.Test;

import java.util.Collections;
import java.util.Map;

/**
 * @author lzenczuk 29/09/2015
 */
public class ScenarioRunTest {

    @Test
    public void runScenario(){

        Scenario scenario;

        scenario = createScenario();

        System.out.println("===============> start");

        Object out = null;
        Map<String, Object> ctx = Collections.emptyMap();

        while(true) {
            ScenarioExecutionResult result = scenario.execute(ctx, out);
            System.out.println(result);

            if(result.isError()) break;

            ctx = result.getCtx();
            out = result.getOutput();
        }

        System.out.println("===============> end");

    }

    /**
     * Creates scenario with three nodes.
     *
     *      ---------- random number
     *      |            |         |
     *      ----more then 50     less then 50
     *
     *      node generates random number. When bigger then 50
     *      generates another.
     * @return
     */
    private Scenario createScenario() {
        Scenario scenario;ScriptNode randomNumberNode = new ScriptNode();
        randomNumberNode.setScript("function main(input, ctx){ ctx.msg='Random number: '; return Math.floor((Math.random()*100))}");

        ScriptNode lessThen50Node = new ScriptNode();
        lessThen50Node.setScript("function main(input, ctx){ return ctx.msg+'less then 50'}");

        ScriptNode moreThen50Node = new ScriptNode();
        moreThen50Node.setScript("function main(input, ctx){ return ctx.msg+'more then 50'}");

        Slot lessThen50Slot = new Slot();
        lessThen50Slot.setScript("function main(input, ctx){ return input < 50}");
        lessThen50Slot.setNode(lessThen50Node);

        Slot moreThen50Slot = new Slot();
        moreThen50Slot.setScript("function main(input, ctx){ return input >= 50}");
        moreThen50Slot.setNode(moreThen50Node);

        Slots randomNumberSlots = new Slots();
        randomNumberSlots.addSlot(lessThen50Slot);
        randomNumberSlots.addSlot(moreThen50Slot);

        randomNumberNode.setSlots(randomNumberSlots);

        Slot repeatSlot = new Slot();
        repeatSlot.setScript("function main(input, ctx){ return true}");
        repeatSlot.setNode(randomNumberNode);

        Slots repeatSlots = new Slots();
        repeatSlots.addSlot(repeatSlot);

        moreThen50Node.setSlots(repeatSlots);

        scenario = new Scenario(randomNumberNode);
        return scenario;
    }
}
