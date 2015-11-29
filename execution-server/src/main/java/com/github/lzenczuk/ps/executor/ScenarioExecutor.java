package com.github.lzenczuk.ps.executor;

import com.github.lzenczuk.ps.engine.node.Node;
import com.github.lzenczuk.ps.executor.result.NodeExecutionResult;
import com.github.lzenczuk.ps.engine.Scenario;
import com.github.lzenczuk.ps.executor.result.ScenarioExecutionResult;
import com.github.lzenczuk.ps.executor.script.ScriptExecutor;
import com.github.lzenczuk.ps.executor.script.ScriptExecutorManager;

import java.util.Map;
import java.util.Optional;

/**
 * @author lzenczuk 28/11/2015
 */
public class ScenarioExecutor {

    private final Scenario scenario;

    private boolean started = false;
    private boolean terminated = false;

    private Optional<Long> activeNodeId;

    private ScriptExecutorManager executorManager = new ScriptExecutorManager();
    final ScriptExecutor scriptExecutor;

    private NodeExecutor nodeExecutor = new NodeExecutor();

    public ScenarioExecutor(Scenario scenario) {
        this.scenario = scenario;
        this.scriptExecutor = executorManager.getExecutor(scenario.getExecutorName())
                .orElseThrow(() -> new RuntimeException("Script executor: " + scenario.getExecutorName() + " not found."));
    }

    public ScenarioExecutionResult execute(Map<String, Object> ctx, Object input){

        if(!started){
            started=true;
            activeNodeId = scenario.getStartNodeId();

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

        Optional<Node> activeNode = scenario.getNodeById(activeNodeId.get());
        if(!activeNode.isPresent()){
            return new ScenarioExecutionResult("No node with id: "+activeNodeId);
        }

        NodeExecutionResult result = nodeExecutor.execute(activeNode.get(), ctx, input, scriptExecutor);

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

    public void setExecutorManager(ScriptExecutorManager executorManager) {
        this.executorManager = executorManager;
    }
}
