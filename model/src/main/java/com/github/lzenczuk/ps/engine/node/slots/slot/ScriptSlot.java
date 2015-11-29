package com.github.lzenczuk.ps.engine.node.slots.slot;

/**
 * @author lzenczuk 29/09/2015
 */
public class ScriptSlot extends Slot {

    private java.lang.String script;

    public ScriptSlot() {
    }

    public ScriptSlot(java.lang.String script, Long desNodeId) {
        this.setDesNodeId(desNodeId);
        this.script = script;
    }

    public void setScript(java.lang.String script) {
        this.script = script;
    }

    public String getScript() {
        return script;
    }
}
