package com.github.lzenczuk.ps.server;

import com.github.lzenczuk.ps.engine.node.ScriptNode;
import com.github.lzenczuk.ps.engine.node.slots.Slots;
import com.github.lzenczuk.ps.engine.node.slots.slot.AlwaysTrueSlot;
import com.github.lzenczuk.ps.engine.node.slots.slot.ScriptSlot;
import com.github.lzenczuk.ps.engine.node.slots.slot.Slot;
import com.github.lzenczuk.ps.engine.Scenario;
import com.github.lzenczuk.ps.server.dto.ScenarioInfoDTO;

import java.util.*;

/**
 * @author lzenczuk 30/09/2015
 */
public class ScenarioService {

    private Scenario scenarion;

    private Map<String, List<ScenarioInfoDTO>> scenarioInfoDTOMap = new HashMap<>();

    public ScenarioService() {
        createScenario("Test 1");
        createScenario("Test 2");
        createScenario("Test 3");
        createScenario("Test 4");
        createScenario("Test 5");
    }

    private void createScenario(String projectName) {
        LinkedList<ScenarioInfoDTO> list = new LinkedList<>();

        int ns = new Double(Math.random() * 9).intValue();

        for(int x=0;x<ns;x++){
            list.add(new ScenarioInfoDTO("Scenario "+x, "Scenario number "+x+" in project "+ projectName));
        }
        scenarioInfoDTOMap.put(projectName, list);
    }

    private Scenario createScenario() {
        Scenario scenario = new Scenario(Optional.of(10L));

        ScriptNode randomNumberNode = new ScriptNode(10L, "randomNumberNode");
        randomNumberNode.setScript("function main(input, ctx){ ctx.msg='Random number: '; return Math.floor((Math.random()*100))}");
        randomNumberNode.setX(250);
        randomNumberNode.setY(10);
        randomNumberNode.setDescription("Generate random number between 0 and 100.");
        scenario.add(randomNumberNode);


        ScriptNode lessThen50Node = new ScriptNode(1L, "lessThen50Node");
        lessThen50Node.setScript("function main(input, ctx){ return ctx.msg+'less then 50'}");
        lessThen50Node.setX(350);
        lessThen50Node.setY(400);
        lessThen50Node.setDescription("Number is smaller then 50. Terminate scenario.");
        scenario.add(lessThen50Node);

        ScriptNode moreThen50Node = new ScriptNode(2L, "moreThen50Node");
        moreThen50Node.setScript("function main(input, ctx){ return ctx.msg+'more then 50'}");
        moreThen50Node.setX(50);
        moreThen50Node.setY(400);
        moreThen50Node.setDescription("Number is bigger then 50. Generate new one.");
        scenario.add(moreThen50Node);

        ScriptSlot lessThen50Slot = new ScriptSlot();
        lessThen50Slot.setScript("function main(input, ctx){ return input < 50}");
        lessThen50Slot.setLabel("<50");
        lessThen50Slot.setDesNodeId(1L);

        ScriptSlot moreThen50Slot = new ScriptSlot();
        moreThen50Slot.setScript("function main(input, ctx){ return input >= 50}");
        moreThen50Slot.setLabel(">=50");
        moreThen50Slot.setDesNodeId(2L);

        Slots randomNumberSlots = new Slots();
        randomNumberSlots.addSlot(lessThen50Slot);
        randomNumberSlots.addSlot(moreThen50Slot);

        randomNumberNode.setSlots(randomNumberSlots);

        Slot repeatSlot = new AlwaysTrueSlot();
        repeatSlot.setDesNodeId(10L);

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

    public void put(Scenario scenario) {
        this.scenarion = scenario;
    }

    public List<ScenarioInfoDTO> getScenariosByProjectName(String projectName){
        return scenarioInfoDTOMap.getOrDefault(projectName, Collections.emptyList());
    }
}
