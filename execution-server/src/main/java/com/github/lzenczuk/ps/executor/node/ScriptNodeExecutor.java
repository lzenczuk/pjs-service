package com.github.lzenczuk.ps.executor.node;

import com.github.lzenczuk.ps.executor.result.NodeExecutionResult;
import com.github.lzenczuk.ps.engine.node.ScriptNode;
import com.github.lzenczuk.ps.executor.result.SlotsValidationResult;
import com.github.lzenczuk.ps.executor.result.ScriptExecutionResult;
import com.github.lzenczuk.ps.executor.script.ScriptExecutor;
import com.github.lzenczuk.ps.executor.SlotsExecutor;

import java.util.Map;

/**
 * @author lzenczuk 28/11/2015
 */
public class ScriptNodeExecutor {

    private String executorName;
    private SlotsExecutor slotsExecutor = new SlotsExecutor();

    public void setExecutorName(String executorName) {
        this.executorName = executorName;
    }

    public NodeExecutionResult execute(ScriptNode node, Map<String, Object> ctx, Object input, ScriptExecutor scriptExecutor) {

        ScriptExecutionResult scriptExecutionResult = scriptExecutor.executeScript(node.getScript(), ctx, input);

        if (scriptExecutionResult.isError()) {
            return new NodeExecutionResult(scriptExecutionResult.getErrorMessage());
        }

        SlotsValidationResult slotsValidationResult = slotsExecutor.getNextNode(
                node.getSlots(),
                scriptExecutionResult.getCtx(),
                scriptExecutionResult.getOutPut(),
                scriptExecutor);

        if (slotsValidationResult.isError()) {
            return new NodeExecutionResult(slotsValidationResult.getErrorMessage());
        }

        return new NodeExecutionResult(scriptExecutionResult.getCtx(), scriptExecutionResult.getOutPut(), slotsValidationResult.getNextNodeId());
    }

    public void setSlotsExecutor(SlotsExecutor slotsExecutor) {
        this.slotsExecutor = slotsExecutor;
    }
}
