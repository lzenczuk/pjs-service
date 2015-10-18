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
        ProjectService projectService = new ProjectService();

        // UI is hosted by nginx
        //staticFileLocation("/ui/public");

        get("/api/scenario", (req, res) -> {
            Scenario scenario = scenarioService.getScenario();

            ObjectMapper mapper = new ObjectMapper();
            mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            mapper.registerModule(new Jdk8Module());

            String scenarioJson = mapper.writeValueAsString(scenario);

            res.type("application/json");

            return scenarioJson;
        });

        post("/api/scenario", (req, res) -> {
            ObjectMapper mapper = new ObjectMapper();
            mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            mapper.registerModule(new Jdk8Module());

            Scenario scenario = mapper.readValue(req.body(), Scenario.class);
            scenarioService.put(scenario);

            return "Ok";
        });

        get("/api/projects", (req, res) -> {

            System.out.println("-----------------> get projects");

            ObjectMapper mapper = new ObjectMapper();
            mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            mapper.registerModule(new Jdk8Module());

            String projectsJson = mapper.writeValueAsString(projectService.getAllProjects());

            res.type("application/json");

            return projectsJson;
            //res.status(401);
            //return "Unauthorized";
        });

        get("/api/scenarios/:name", (req, res) -> {

            String projectName = req.params(":name");

            System.out.println("-----------------> get scenarios for project " + projectName);

            ObjectMapper mapper = new ObjectMapper();
            mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            mapper.registerModule(new Jdk8Module());

            String scenariosJson = mapper.writeValueAsString(scenarioService.getScenariosByProjectName(projectName));

            res.type("application/json");

            return scenariosJson;
            //res.status(401);
            //return "Unauthorized";
        });
    }
}
