package com.github.lzenczuk.ps.server;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.github.lzenczuk.ps.engine.scenario.Scenario;

import static spark.Spark.*;

/**
 * @author lzenczuk 30/09/2015
 */
public class Main {

    public static void main(String[] args) {

        ScenarioService scenarioService = new ScenarioService();

        // have to be before routing
        staticFileLocation("/ui/public");

        get("/scenario", (req, res) -> {
            Scenario scenario = scenarioService.getScenario();

            ObjectMapper mapper = new ObjectMapper();
            mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            mapper.registerModule(new Jdk8Module());

            String scenarioJson = mapper.writeValueAsString(scenario);

            res.type("application/javascript");

            return scenarioJson;
        });
    }
}
