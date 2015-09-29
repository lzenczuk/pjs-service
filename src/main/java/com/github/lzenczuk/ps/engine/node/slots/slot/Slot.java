package com.github.lzenczuk.ps.engine.node.slots.slot;

import com.github.lzenczuk.ps.engine.node.Node;
import com.github.lzenczuk.ps.engine.script.ScriptExecutionResult;
import com.github.lzenczuk.ps.engine.script.ScriptExecutor;

import java.util.Map;

/**
 * @author lzenczuk 29/09/2015
 */
public class Slot {

    private String script;
    private Node node;

    public Slot() {
    }

    public Slot(String script, Node node) {
        this.node = node;
        this.script = script;
    }

    public SlotValidationResult validate(Map<String, Object> ctx, Object outPut, ScriptExecutor scriptExecutor){
        ScriptExecutionResult scriptExecutionResult = scriptExecutor.executeScript(script, ctx, outPut);

        if(scriptExecutionResult.isError()){
            return new SlotValidationResult(scriptExecutionResult.getErrorMessage());
        }

        if(scriptExecutionResult.getOutPut() instanceof Boolean){
            return new SlotValidationResult((Boolean) scriptExecutionResult.getOutPut());
        }else{
            return new SlotValidationResult("Validation script return non boolean value");
        }
    }

    // TODO - is it sens to have getter instead return node as result
    public Node getNode() {
        return node;
    }

    public void setNode(Node node) {
        this.node = node;
    }

    public void setScript(String script) {
        this.script = script;
    }
}
