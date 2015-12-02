package com.github.lzenczuk.ps.engine;

import com.github.lzenczuk.ps.engine.node.Node;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * @author lzenczuk 29/09/2015
 */
public class Scenario {

    private Optional<Long> startNodeId;

    private Map<Long, Node> nodesMap = new HashMap<>();

    private long offsetX = 0;
    private long offsetY = 0;
    private double scale = 1;

    private String executorName;

    public Scenario() {
    }

    public Scenario(Optional<Long> startNodeId) {
        this.startNodeId = startNodeId;
    }

    public void add(Node node) {
        if(node.getName()==null || node.getName().isEmpty()){
            throw new IllegalArgumentException("Node have to have name");
        }

        nodesMap.put(node.getId(), node);
    }

    public Optional<Long> getStartNodeId() {
        return startNodeId;
    }

    public Optional<Node> getNodeById(Long nodeId){
        return Optional.ofNullable(nodesMap.get(nodeId));
    }

    public String getExecutorName() {
        return executorName;
    }

    public void setExecutorName(String executorName) {
        this.executorName = executorName;
    }
}
