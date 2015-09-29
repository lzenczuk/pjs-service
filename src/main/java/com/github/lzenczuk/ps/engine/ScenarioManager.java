package com.github.lzenczuk.ps.engine;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.lzenczuk.ps.engine.scenario.Scenario;

import java.io.IOException;

/**
 * @author lzenczuk 29/09/2015
 */
public class ScenarioManager {

    private ObjectMapper mapper = new ObjectMapper();

    public String scenarioToJson(Scenario scenario) throws JsonProcessingException {
        return mapper.writeValueAsString(scenario);
    }

    public Scenario scenarioToJson(String json) throws IOException {
        return mapper.readValue(json, Scenario.class);
    }
}
