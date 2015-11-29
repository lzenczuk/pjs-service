package com.github.lzenczuk.ps.executor;

import com.github.lzenczuk.ps.engine.node.Node;
import com.github.lzenczuk.ps.executor.result.NodeExecutionResult;
import com.github.lzenczuk.ps.engine.node.ScriptNode;
import com.github.lzenczuk.ps.executor.script.ScriptExecutor;
import com.github.lzenczuk.ps.executor.node.ScriptNodeExecutor;

import java.util.Map;

/**
 * @author lzenczuk 28/11/2015
 */
public class NodeExecutor {

    private ScriptNodeExecutor scriptNodeExecutor = new ScriptNodeExecutor();

    public NodeExecutionResult execute(Node node, Map<String, Object> ctx, Object input, ScriptExecutor scriptExecutor){

        switch (node.getClass().getName()){
            case "com.github.lzenczuk.ps.engine.node.ScriptNode":
                return scriptNodeExecutor.execute((ScriptNode) node, ctx, input, scriptExecutor);
            default:
                return new NodeExecutionResult("Unknown node type: "+node.getClass().getName());
        }
    }

    public void setScriptNodeExecutor(ScriptNodeExecutor scriptNodeExecutor) {
        this.scriptNodeExecutor = scriptNodeExecutor;
    }
}
