package com.github.lzenczuk.ps.executor.node;

import com.github.lzenczuk.ps.engine.node.GetPageNode;
import com.github.lzenczuk.ps.engine.node.ScriptNode;
import com.github.lzenczuk.ps.executor.SlotsExecutor;
import com.github.lzenczuk.ps.executor.result.NodeExecutionResult;
import com.github.lzenczuk.ps.executor.result.ScriptExecutionResult;
import com.github.lzenczuk.ps.executor.result.SlotsValidationResult;
import com.github.lzenczuk.ps.executor.script.ScriptExecutor;
import com.github.lzenczuk.ps.executor.script.phantomjs.PhantomJSScriptExecutor;

import java.util.Map;

/**
 * @author lzenczuk 28/11/2015
 */
public class GetPageNodeExecutor {

    private SlotsExecutor slotsExecutor = new SlotsExecutor();

    public NodeExecutionResult execute(GetPageNode node, Map<String, Object> ctx, Object input, PhantomJSScriptExecutor scriptExecutor) {

        scriptExecutor.goToPage(node.getUrl());

        SlotsValidationResult slotsValidationResult = slotsExecutor.getNextNode(
                node.getSlots(),
                ctx,
                null,
                scriptExecutor);

        if (slotsValidationResult.isError()) {
            return new NodeExecutionResult(slotsValidationResult.getErrorMessage());
        }

        return new NodeExecutionResult(ctx, null, slotsValidationResult.getNextNodeId());
    }

    public void setSlotsExecutor(SlotsExecutor slotsExecutor) {
        this.slotsExecutor = slotsExecutor;
    }
}
