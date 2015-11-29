package com.github.lzenczuk.ps.executor.node;

import com.github.lzenczuk.ps.engine.Scenario;
import com.github.lzenczuk.ps.executor.ExampleScenario;
import com.github.lzenczuk.ps.executor.ScenarioExecutor;
import com.github.lzenczuk.ps.executor.result.ScenarioExecutionResult;
import org.junit.Test;

import java.util.Collections;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

/**
 * @author lzenczuk 29/09/2015
 */
public class ScenarioRunTest {

    @Test
    public void runScenario(){

        Scenario scenario;

        scenario = ExampleScenario.createScenario();

        System.out.println("===============> start");

        Object out = null;
        Map<String, Object> ctx = Collections.emptyMap();

        boolean finished = false;

        ScenarioExecutor scenarioExecutor = new ScenarioExecutor(scenario);

        while(true) {
            ScenarioExecutionResult result = scenarioExecutor.execute(ctx, out);
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
