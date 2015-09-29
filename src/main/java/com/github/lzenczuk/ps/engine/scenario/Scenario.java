package com.github.lzenczuk.ps.engine.scenario;

import com.github.lzenczuk.ps.engine.node.Node;
import com.github.lzenczuk.ps.engine.node.NodeExecutionResult;
import com.github.lzenczuk.ps.engine.script.ScriptExecutorManager;

import java.util.Map;

/**
 * @author lzenczuk 29/09/2015
 */
public class Scenario {

    private Node startNode;

    private boolean started = false;
    private Node activeNode;
    private ScriptExecutorManager executorManager = new ScriptExecutorManager();

    public Scenario(Node startNode) {
        this.startNode = startNode;
    }

    public ScenarioExecutionResult execute(Map<String, Object> ctx, Object input){
        if(!started){
            started=true;
            activeNode = startNode;
        }

        NodeExecutionResult result = activeNode.execute(ctx, input, executorManager);

        if(result.isError()){
            return new ScenarioExecutionResult(result.getErrorMessage());
        }

        activeNode = result.getNextNode();

        return new ScenarioExecutionResult(result.getCtx(), result.getOutPut());
    }
}
