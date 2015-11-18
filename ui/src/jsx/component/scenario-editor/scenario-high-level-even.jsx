export default class ScenarioHighLevelEvent {

    constructor(eventType){
        this.eventType = eventType
    }

}

ScenarioHighLevelEvent.eventsTypes = {
    SCENARIO_TRANSFORM_EVENT : 'ScenarioTransformEvent',
    NODE_DRAG_EVENT : 'NodeDragEvent',
    NODES_RESIZE_EVENT : 'NodesResizeEvent',
    CONNECTION_CREATED_EVENT : 'ConnectionCreatedEvent',
    SELECT_EVENT : 'SelectEvent',
    DELETE_SELECTED_EVENT : 'DeleteSelectedEvent'
};

export class ScenarioTransformEvent extends ScenarioHighLevelEvent{

    constructor(offsetX, offsetY, scale){
        super(ScenarioHighLevelEvent.eventsTypes.SCENARIO_TRANSFORM_EVENT);

        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.scale = scale;
    }
}

export class NodeDragEvent extends ScenarioHighLevelEvent{

    constructor(nodeId, x, y){
        super(ScenarioHighLevelEvent.eventsTypes.NODE_DRAG_EVENT);

        this.nodeId = nodeId;
        this.x = x;
        this.y = y
    }
}

export class ConnectionCreatedEvent extends ScenarioHighLevelEvent{

    constructor(srcNodeId, srcNodeIndex, desNodeId){
        super(ScenarioHighLevelEvent.eventsTypes.CONNECTION_CREATED_EVENT);

        this.srcNodeId = srcNodeId;
        this.srcNodeIndex = srcNodeIndex;
        this.desNodeId = desNodeId
    }
}

export class SelectEvent extends ScenarioHighLevelEvent{

    constructor(selectedElementsArray){
        super(ScenarioHighLevelEvent.eventsTypes.SELECT_EVENT);

        this.selectedElementsArray = selectedElementsArray
    }
}

export class NodesResizeEvent extends ScenarioHighLevelEvent{

    constructor(nodesSizesArray){
        super(ScenarioHighLevelEvent.eventsTypes.NODES_RESIZE_EVENT);

        this.nodesSizesArray = nodesSizesArray
    }
}

export class DeleteSelectedEvent extends ScenarioHighLevelEvent{

    constructor(){
        super(ScenarioHighLevelEvent.eventsTypes.DELETE_SELECTED_EVENT);
    }
}
