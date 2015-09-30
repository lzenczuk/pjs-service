package com.github.lzenczuk.engine;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.github.lzenczuk.engine.node.ExampleScenario;
import com.github.lzenczuk.ps.engine.scenario.Scenario;
import com.github.lzenczuk.ps.engine.scenario.ScenarioExecutionResult;
import org.junit.Test;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.instanceOf;
import static org.hamcrest.Matchers.is;

/**
 * @author lzenczuk 29/09/2015
 */
public class ScenarioSerializationTest {

    @Test
    public void shouldSerializeDeserializeAndRunScenario() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        mapper.registerModule(new Jdk8Module());

        Scenario scenario = ExampleScenario.createScenario();

        String scenarioJson = mapper.writeValueAsString(scenario);

        System.out.println(scenarioJson);

        Scenario newScenario = mapper.readValue(scenarioJson, Scenario.class);

        System.out.println("===============> start");

        Object out = null;
        Map<String, Object> ctx = Collections.emptyMap();

        boolean finished = false;

        while(true) {
            ScenarioExecutionResult result = newScenario.execute(ctx, out);
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


}
