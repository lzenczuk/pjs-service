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

    constructor(nodeName, x, y){
        super(ScenarioHighLevelEvent.eventsTypes.NODE_DRAG_EVENT);

        this.nodeName = nodeName;
        this.x = x;
        this.y = y
    }
}

export class ConnectionCreatedEvent extends ScenarioHighLevelEvent{

    constructor(srcNodeName, srcNodeIndex, desNodeName){
        super(ScenarioHighLevelEvent.eventsTypes.CONNECTION_CREATED_EVENT);

        this.srcNodeName = srcNodeName;
        this.srcNodeIndex = srcNodeIndex;
        this.desNodeName = desNodeName
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