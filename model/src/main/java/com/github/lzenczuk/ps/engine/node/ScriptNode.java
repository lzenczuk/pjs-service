package com.github.lzenczuk.ps.engine.node;

import com.github.lzenczuk.ps.engine.node.slots.Slots;

/**
 * @author lzenczuk 29/09/2015
 */
public class ScriptNode extends Node {

    private String script;
    private Slots slots = new Slots();

    public ScriptNode() {
    }

    public ScriptNode(Long id, String name) {
        this.setId(id);
        this.setName(name);
    }

    public ScriptNode(String script, Slots slots) {
        this.script = script;
        this.slots = slots;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public String getScript() {
        return script;
    }

    public void setSlots(Slots slots) {
        this.slots = slots;
    }

    public Slots getSlots() {
        return slots;
    }
}
