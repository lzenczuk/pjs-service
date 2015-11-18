package com.github.lzenczuk.ps.engine.scenario;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    private Optional<Long> startNodeId;

    @JsonIgnore
    private boolean started = false;

    @JsonIgnore
    private boolean terminated = false;

    @JsonIgnore
    private Optional<Long> activeNodeId;

    @JsonIgnore
    private ScriptExecutorManager executorManager = new ScriptExecutorManager();

    private Map<Long, Node> nodesMap = new HashMap<>();

    private long offsetX = 0;
    private long offsetY = 0;
    private long scale = 1;

    public Scenario() {
    }

    public Scenario(Optional<Long> startNodeId) {
        this.startNodeId = startNodeId;
    }

    public ScenarioExecutionResult execute(Map<java.lang.String, Object> ctx, Object input){

        if(!started){
            started=true;
            activeNodeId = startNodeId;

            if(!activeNodeId.isPresent()){
                terminated=true;
            }
        }

        if(terminated){
            return new ScenarioExecutionResult(ctx, input, true);
        }

        if(!activeNodeId.isPresent()){
            return new ScenarioExecutionResult("No active node name");
        }

        Node activeNode = nodesMap.get(activeNodeId.get());
        if(activeNode==null){
            return new ScenarioExecutionResult("No node with name: "+activeNodeId);
        }

        NodeExecutionResult result = activeNode.execute(ctx, input, executorManager);

        if(result.isError()){
            return new ScenarioExecutionResult(result.getErrorMessage());
        }

        activeNodeId = result.getNextNodeId();

        if(activeNodeId.isPresent()){
            return new ScenarioExecutionResult(result.getCtx(), result.getOutPut());
        }else{
            return new ScenarioExecutionResult(result.getCtx(), result.getOutPut(), true);
        }

    }

    public void add(Node node) {
        if(node.getName()==null || node.getName().isEmpty()){
            throw new IllegalArgumentException("Node have to have name");
        }

        nodesMap.put(node.getId(), node);
    }
}
