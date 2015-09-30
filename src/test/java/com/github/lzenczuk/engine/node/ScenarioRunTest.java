package com.github.lzenczuk.engine.node;

import com.github.lzenczuk.ps.engine.node.ScriptNode;
import com.github.lzenczuk.ps.engine.node.slots.Slots;
import com.github.lzenczuk.ps.engine.node.slots.slot.Slot;
import com.github.lzenczuk.ps.engine.scenario.Scenario;
import com.github.lzenczuk.ps.engine.scenario.ScenarioExecutionResult;
import org.junit.Test;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

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

        boolean finished = false;

        while(true) {
            ScenarioExecutionResult result = scenario.execute(ctx, out);
            System.out.println(result);

            ctx = result.getCtx();
            out = result.getOutput();

            if(result.isError()) {
                System.out.println("===============> error: "+result.getErrorMessage());
                break;
            }
            if(result.isTerminated()){
                System.out.println("===============> finished");
                finished=true;
                break;
            }
        }

        System.out.println("===============> end");

        assertThat(finished, is(true));
        assertThat(out, is(instanceOf(String.class)));
        assertThat((String) out, is(containsString("less then 50")));

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

        Slot lessThen50Slot = new Slot();
        lessThen50Slot.setScript("function main(input, ctx){ return input < 50}");
        lessThen50Slot.setNodeName("lessThen50Node");

        Slot moreThen50Slot = new Slot();
        moreThen50Slot.setScript("function main(input, ctx){ return input >= 50}");
        moreThen50Slot.setNodeName("moreThen50Node");

        Slots randomNumberSlots = new Slots();
        randomNumberSlots.addSlot(lessThen50Slot);
        randomNumberSlots.addSlot(moreThen50Slot);

        randomNumberNode.setSlots(randomNumberSlots);

        Slot repeatSlot = new Slot();
        repeatSlot.setScript("function main(input, ctx){ return true}");
        repeatSlot.setNodeName("randomNumberNode");

        Slots repeatSlots = new Slots();
        repeatSlots.addSlot(repeatSlot);

        moreThen50Node.setSlots(repeatSlots);

        return scenario;
    }
}
