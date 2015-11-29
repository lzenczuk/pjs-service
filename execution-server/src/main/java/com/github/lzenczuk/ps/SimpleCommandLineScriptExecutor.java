package com.github.lzenczuk.ps;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.github.lzenczuk.ps.engine.Scenario;
import com.github.lzenczuk.ps.executor.ScenarioExecutor;
import com.github.lzenczuk.ps.executor.result.ScenarioExecutionResult;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;

/**
 * @author lzenczuk 29/11/2015
 */
public class SimpleCommandLineScriptExecutor {

    public static void main(String[] args) throws IOException {
        executeScenario(getScenarioFromScenarioServer());
    }

    private static void executeScenario(Scenario scenario) {
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
    }

    private static Scenario getScenarioFromScenarioServer() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        mapper.registerModule(new Jdk8Module());

        final CloseableHttpClient httpClient = HttpClients.createDefault();
        final HttpGet httpGet = new HttpGet("http://localhost:8080/api/scenario");
        final CloseableHttpResponse response = httpClient.execute(httpGet);

        Scenario scenario = null;

        try{
            final HttpEntity entity = response.getEntity();
            scenario = mapper.readValue(entity.getContent(), Scenario.class);
            EntityUtils.consume(entity);
        }finally {
            response.close();
        }
        return scenario;
    }

}
