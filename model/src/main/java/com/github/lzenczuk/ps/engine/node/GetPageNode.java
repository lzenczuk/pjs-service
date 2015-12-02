package com.github.lzenczuk.ps.engine.node;

import com.github.lzenczuk.ps.engine.node.slots.Slots;

/**
 * @author lzenczuk 02/12/2015
 */
public class GetPageNode extends Node {

    protected String url;
    private Slots slots = new Slots();

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Slots getSlots() {
        return slots;
    }

    public void setSlots(Slots slots) {
        this.slots = slots;
    }
}
