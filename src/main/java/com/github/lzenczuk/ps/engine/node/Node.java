package com.github.lzenczuk.ps.engine.node;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.github.lzenczuk.ps.engine.script.ScriptExecutorManager;

import java.util.Map;

/**
 * @author lzenczuk 29/09/2015
 */
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "serverClass")
@JsonSubTypes(
        @JsonSubTypes.Type(value = ScriptNode.class, name = "script_node")
)
public abstract class Node {

    private long x;
    private long y;
    private Long width;
    private Long height;
    private Long contentHeight;

    private String name;
    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getX() {
        return x;
    }

    public void setX(long x) {
        this.x = x;
    }

    public long getY() {
        return y;
    }

    public void setY(long y) {
        this.y = y;
    }

    public Long getHeight() {
        return height;
    }

    public void setHeight(Long height) {
        this.height = height;
    }

    public Long getWidth() {
        return width;
    }

    public void setWidth(Long width) {
        this.width = width;
    }

    public Long getContentHeight() {
        return contentHeight;
    }

    public void setContentHeight(Long contentHeight) {
        this.contentHeight = contentHeight;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public abstract NodeExecutionResult execute(Map<java.lang.String, Object> ctx, Object input, ScriptExecutorManager executorManager);
}
