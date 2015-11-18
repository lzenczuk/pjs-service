import { Map } from 'immutable';

export default class ScenarioLowLevelEvent {


	static slotMouseDownEvent(clientX, clientY, slotIndex, nodeName){
		return new ScenarioLowLevelEvent(
			ScenarioLowLevelEvent.eventType.MOUSE_DOWN,
			ScenarioLowLevelEvent.sourceType.SLOT,
			clientX,
			clientY,
			Map({slotIndex: slotIndex, nodeName: nodeName})
		)
	}

	static nodeMouseDownEvent(clientX, clientY, nodeName){
		return new ScenarioLowLevelEvent(
			ScenarioLowLevelEvent.eventType.MOUSE_DOWN,
			ScenarioLowLevelEvent.sourceType.NODE,
			clientX,
			clientY,
			Map({nodeName: nodeName})
		)
	}

    static scenarioMouseDownEvent(clientX, clientY){
        return new ScenarioLowLevelEvent(
            ScenarioLowLevelEvent.eventType.MOUSE_DOWN,
            ScenarioLowLevelEvent.sourceType.SCENARIO,
            clientX,
            clientY,
            Map({})
        )
    }

	static connectionMouseDownEvent(clientX, clientY, srcNodeName, desNodeName, connectionId){
		return new ScenarioLowLevelEvent(
				ScenarioLowLevelEvent.eventType.MOUSE_DOWN,
				ScenarioLowLevelEvent.sourceType.CONNECTION,
				clientX,
				clientY,
				Map({srcNodeName: srcNodeName, desNodeName: desNodeName, connectionId: connectionId})
		)
	}

	static slotMouseUpEvent(clientX, clientY, slotIndex, nodeName){
		return new ScenarioLowLevelEvent(
			ScenarioLowLevelEvent.eventType.MOUSE_UP,
			ScenarioLowLevelEvent.sourceType.SLOT,
			clientX,
			clientY,
			Map({slotIndex: slotIndex, nodeName: nodeName})
		)
	}

	static connectionMouseUpEvent(clientX, clientY, srcNodeName, desNodeName, connectionId){
		return new ScenarioLowLevelEvent(
			ScenarioLowLevelEvent.eventType.MOUSE_UP,
			ScenarioLowLevelEvent.sourceType.SLOT,
			clientX,
			clientY,
			Map({srcNodeName: srcNodeName, desNodeName: desNodeName, connectionId: connectionId})
		)
	}


	static nodeMouseUpEvent(clientX, clientY, nodeName){
		return new ScenarioLowLevelEvent(
			ScenarioLowLevelEvent.eventType.MOUSE_UP,
			ScenarioLowLevelEvent.sourceType.NODE,
			clientX,
			clientY,
			Map({nodeName: nodeName})
		)
	}

    static scenarioMouseUpEvent(clientX, clientY){
        return new ScenarioLowLevelEvent(
            ScenarioLowLevelEvent.eventType.MOUSE_UP,
            ScenarioLowLevelEvent.sourceType.SCENARIO,
            clientX,
            clientY,
            Map({})
        )
    }

    static scenarioMouseMoveEvent(clientX, clientY){
        return new ScenarioLowLevelEvent(
            ScenarioLowLevelEvent.eventType.MOUSE_MOVE,
            ScenarioLowLevelEvent.sourceType.NONE,
            clientX,
            clientY,
            Map({})
        )
    }

    static scenarioWheelEvent(deltaX, deltaY){
        return new ScenarioLowLevelEvent(
            ScenarioLowLevelEvent.eventType.WHEEL,
            ScenarioLowLevelEvent.sourceType.NONE,
            0,
            0,
            Map({deltaX: deltaX, deltaY: deltaY})
        )
    }

	static scenarioSizeEvent(changes){
		return new ScenarioLowLevelEvent(
				ScenarioLowLevelEvent.eventType.SIZE,
				ScenarioLowLevelEvent.sourceType.NONE,
				0,
				0,
				changes
		)
	}

	static keyPressEvent(key){
		return new ScenarioLowLevelEvent(
				ScenarioLowLevelEvent.eventType.KEY,
				ScenarioLowLevelEvent.sourceType.NONE,
				0,
				0,
				key
		)
	}

	constructor(eventType, sourceType, clientX, clientY, payload, x, y, offsetX, offsetY, scale, width, height){
		this.eventType = eventType;
		this.sourceType = sourceType;
		this.clientX = clientX;
		this.clientY = clientY;
		this.payload = payload;
        this.x = x;
        this.y = y;
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		this.scale = scale;
		this.width = width;
		this.height = height;
	}

    setStateBasedParams(x, y, offsetX, offsetY, scale, width, height){
        return new ScenarioLowLevelEvent(
				this.eventType,
				this.sourceType,
				this.clientX,
				this.clientY,
				this.payload,
				x,
				y,
				offsetX,
				offsetY,
				scale,
				width,
				height)
    }

	isMouseDown(){
		return this.eventType==ScenarioLowLevelEvent.eventType.MOUSE_DOWN
	}

	isMouseUp(){
		return this.eventType==ScenarioLowLevelEvent.eventType.MOUSE_UP
	}

    isMouseMove(){
        return this.eventType==ScenarioLowLevelEvent.eventType.MOUSE_MOVE
    }

    isWheel(){
        return this.eventType==ScenarioLowLevelEvent.eventType.WHEEL
    }

	isSize(){
        return this.eventType==ScenarioLowLevelEvent.eventType.SIZE
    }

	isKey(){
		return this.eventType==ScenarioLowLevelEvent.eventType.KEY
	}

	isSlot(){
		return this.sourceType==ScenarioLowLevelEvent.sourceType.SLOT
	}

	isNode(){
		return this.sourceType==ScenarioLowLevelEvent.sourceType.NODE
	}

	isConnection(){
		return this.sourceType==ScenarioLowLevelEvent.sourceType.CONNECTION
	}

	isScenario(){
		return this.sourceType==ScenarioLowLevelEvent.sourceType.SCENARIO
	}
}

ScenarioLowLevelEvent.eventType = {
	MOUSE_DOWN: "MOUSE_DOWN",
	MOUSE_UP: "MOUSE_UP",
	MOUSE_MOVE: "MOUSE_MOVE",
	WHEEL: "WHEEL",
	SIZE: "SIZE",
	KEY: "KEY"
};

ScenarioLowLevelEvent.sourceType = {
	NONE: "NONE",
	SLOT: "SLOT",
	NODE: "NODE",
	SCENARIO: "SCENARIO",
	CONNECTION: "CONNECTION"
};