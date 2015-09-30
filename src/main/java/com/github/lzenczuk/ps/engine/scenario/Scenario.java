package com.github.lzenczuk.ps.engine.scenario;

import com.github.lzenczuk.ps.engine.node.Node;
import com.github.lzenczuk.ps.engine.node.NodeExecutionResult;
import com.github.lzenczuk.ps.engine.script.ScriptExecutorManager;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * @author lzenczuk 29/09/2015
 */
public class Scenario {

    private Optional<String> startNodeName;

    private boolean started = false;
    private boolean terminated = false;

    private Optional<String> activeNodeName;

    private ScriptExecutorManager executorManager = new ScriptExecutorManager();

    private Map<String, Node> nodesMap = new HashMap<>();

    public Scenario(Optional<String> startNodeName) {
        this.startNodeName = startNodeName;
    }

    public ScenarioExecutionResult execute(Map<java.lang.String, Object> ctx, Object input){

        if(!started){
            started=true;
            activeNodeName = startNodeName;

            if(!activeNodeName.isPresent()){
                terminated=true;
            }
        }

        if(terminated){
            return new ScenarioExecutionResult(ctx, input, true);
        }

        if(!activeNodeName.isPresent()){
            return new ScenarioExecutionResult("No active node name");
        }

        Node activeNode = nodesMap.get(activeNodeName.get());
        if(activeNode==null){
            return new ScenarioExecutionResult("No node with name: "+activeNodeName);
        }

        NodeExecutionResult result = activeNode.execute(ctx, input, executorManager);

        if(result.isError()){
            return new ScenarioExecutionResult(result.getErrorMessage());
        }

        activeNodeName = result.getNextNodeName();

        if(activeNodeName.isPresent()){
            return new ScenarioExecutionResult(result.getCtx(), result.getOutPut());
        }else{
            return new ScenarioExecutionResult(result.getCtx(), result.getOutPut(), true);
        }

    }

    public void add(Node node) {
        if(node.getName()==null || node.getName().isEmpty()){
            throw new IllegalArgumentException("Node have to have name");
        }

        nodesMap.put(node.getName(), node);
    }
}
