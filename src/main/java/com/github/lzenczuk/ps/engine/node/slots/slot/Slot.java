package com.github.lzenczuk.ps.engine.node.slots.slot;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.github.lzenczuk.ps.engine.script.ScriptExecutor;

import java.util.Map;

/**
 * @author lzenczuk 30/09/2015
 */
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "serverClass")
@JsonSubTypes({
        @JsonSubTypes.Type(value = ScriptSlot.class, name = "script_slot"),
        @JsonSubTypes.Type(value = AlwaysTrueSlot.class, name = "always_true_slot")
})
public abstract class Slot {

    private Long desNodeId;
    private String label;

    public Long getDesNodeId() {
        return desNodeId;
    }

    public void setDesNodeId(Long desNodeId) {
        this.desNodeId = desNodeId;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public abstract SlotValidationResult validate(Map<String, Object> ctx, Object outPut, ScriptExecutor scriptExecutor);
}
