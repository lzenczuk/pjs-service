import { Map } from 'immutable';

export default class ScenarioEvent {


	static slotMouseDownEvent(clientX, clientY, slotIndex, nodeName){
		return new ScenarioEvent(
			ScenarioEvent.eventType.MOUSE_DOWN,
			ScenarioEvent.sourceType.SLOT,
			clientX,
			clientY,
			Map({slotIndex: slotIndex, nodeName: nodeName})
		)
	}

	static nodeMouseDownEvent(clientX, clientY, nodeName){
		return new ScenarioEvent(
			ScenarioEvent.eventType.MOUSE_DOWN,
			ScenarioEvent.sourceType.NODE,
			clientX,
			clientY,
			Map({nodeName: nodeName})
		)
	}

    static scenarioMouseDownEvent(clientX, clientY){
        return new ScenarioEvent(
            ScenarioEvent.eventType.MOUSE_DOWN,
            ScenarioEvent.sourceType.SCENARIO,
            clientX,
            clientY,
            Map({})
        )
    }

	static connectionMouseDownEvent(clientX, clientY, srcNodeName, desNodeName, connectionId){
		return new ScenarioEvent(
				ScenarioEvent.eventType.MOUSE_DOWN,
				ScenarioEvent.sourceType.CONNECTION,
				clientX,
				clientY,
				Map({srcNodeName: srcNodeName, desNodeName: desNodeName, connectionId: connectionId})
		)
	}

	static slotMouseUpEvent(clientX, clientY, slotIndex, nodeName){
		return new ScenarioEvent(
			ScenarioEvent.eventType.MOUSE_UP,
			ScenarioEvent.sourceType.SLOT,
			clientX,
			clientY,
			Map({slotIndex: slotIndex, nodeName: nodeName})
		)
	}

	static connectionMouseUpEvent(clientX, clientY, srcNodeName, desNodeName, connectionId){
		return new ScenarioEvent(
			ScenarioEvent.eventType.MOUSE_UP,
			ScenarioEvent.sourceType.SLOT,
			clientX,
			clientY,
			Map({srcNodeName: srcNodeName, desNodeName: desNodeName, connectionId: connectionId})
		)
	}


	static nodeMouseUpEvent(clientX, clientY, nodeName){
		return new ScenarioEvent(
			ScenarioEvent.eventType.MOUSE_UP,
			ScenarioEvent.sourceType.NODE,
			clientX,
			clientY,
			Map({nodeName: nodeName})
		)
	}

    static scenarioMouseUpEvent(clientX, clientY){
        return new ScenarioEvent(
            ScenarioEvent.eventType.MOUSE_UP,
            ScenarioEvent.sourceType.SCENARIO,
            clientX,
            clientY,
            Map({})
        )
    }

    static scenarioMouseMoveEvent(clientX, clientY){
        return new ScenarioEvent(
            ScenarioEvent.eventType.MOUSE_MOVE,
            ScenarioEvent.sourceType.NONE,
            clientX,
            clientY,
            Map({})
        )
    }

    static scenarioWheelEvent(deltaX, deltaY){
        return new ScenarioEvent(
            ScenarioEvent.eventType.WHEEL,
            ScenarioEvent.sourceType.NONE,
            0,
            0,
            Map({deltaX: deltaX, deltaY: deltaY})
        )
    }

	static scenarioSizeEvent(changes){
		return new ScenarioEvent(
				ScenarioEvent.eventType.SIZE,
				ScenarioEvent.sourceType.NONE,
				0,
				0,
				changes
		)
	}

	static keyPressEvent(key){
		return new ScenarioEvent(
				ScenarioEvent.eventType.KEY,
				ScenarioEvent.sourceType.NONE,
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
        return new ScenarioEvent(
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
		return this.eventType==ScenarioEvent.eventType.MOUSE_DOWN
	}

	isMouseUp(){
		return this.eventType==ScenarioEvent.eventType.MOUSE_UP
	}

    isMouseMove(){
        return this.eventType==ScenarioEvent.eventType.MOUSE_MOVE
    }

    isWheel(){
        return this.eventType==ScenarioEvent.eventType.WHEEL
    }

	isSize(){
        return this.eventType==ScenarioEvent.eventType.SIZE
    }

	isKey(){
		return this.eventType==ScenarioEvent.eventType.KEY
	}

	isSlot(){
		return this.sourceType==ScenarioEvent.sourceType.SLOT
	}

	isNode(){
		return this.sourceType==ScenarioEvent.sourceType.NODE
	}

	isConnection(){
		return this.sourceType==ScenarioEvent.sourceType.CONNECTION
	}

	isScenario(){
		return this.sourceType==ScenarioEvent.sourceType.SCENARIO
	}
}

ScenarioEvent.eventType = {
	MOUSE_DOWN: "MOUSE_DOWN",
	MOUSE_UP: "MOUSE_UP",
	MOUSE_MOVE: "MOUSE_MOVE",
	WHEEL: "WHEEL",
	SIZE: "SIZE",
	KEY: "KEY"
};

ScenarioEvent.sourceType = {
	NONE: "NONE",
	SLOT: "SLOT",
	NODE: "NODE",
	SCENARIO: "SCENARIO",
	CONNECTION: "CONNECTION"
};