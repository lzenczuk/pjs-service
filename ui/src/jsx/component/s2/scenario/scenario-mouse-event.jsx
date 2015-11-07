import { Map } from 'immutable';

export default class ScenarioMouseEvent {


	static slotMouseDownEvent(clientX, clientY, slotIndex, nodeName){
		return new ScenarioMouseEvent(
			ScenarioMouseEvent.eventType.MOUSE_DOWN,
			ScenarioMouseEvent.sourceType.SLOT,
			clientX,
			clientY,
			Map({slotIndex: slotIndex, nodeName: nodeName})
		)
	}

	static nodeMouseDownEvent(clientX, clientY, nodeName){
		return new ScenarioMouseEvent(
			ScenarioMouseEvent.eventType.MOUSE_DOWN,
			ScenarioMouseEvent.sourceType.NODE,
			clientX,
			clientY,
			Map({nodeName: nodeName})
		)
	}

    static scenarioMouseDownEvent(clientX, clientY){
        return new ScenarioMouseEvent(
            ScenarioMouseEvent.eventType.MOUSE_DOWN,
            ScenarioMouseEvent.sourceType.SCENARIO,
            clientX,
            clientY,
            Map({})
        )
    }

	static connectionMouseDownEvent(clientX, clientY, srcNodeName, desNodeName, connectionId){
		return new ScenarioMouseEvent(
				ScenarioMouseEvent.eventType.MOUSE_DOWN,
				ScenarioMouseEvent.sourceType.CONNECTION,
				clientX,
				clientY,
				Map({srcNodeName: srcNodeName, desNodeName: desNodeName, connectionId: connectionId})
		)
	}

	static slotMouseUpEvent(clientX, clientY, slotIndex, nodeName){
		return new ScenarioMouseEvent(
			ScenarioMouseEvent.eventType.MOUSE_UP,
			ScenarioMouseEvent.sourceType.SLOT,
			clientX,
			clientY,
			Map({slotIndex: slotIndex, nodeName: nodeName})
		)
	}

	static connectionMouseUpEvent(clientX, clientY, srcNodeName, desNodeName, connectionId){
		return new ScenarioMouseEvent(
			ScenarioMouseEvent.eventType.MOUSE_UP,
			ScenarioMouseEvent.sourceType.SLOT,
			clientX,
			clientY,
			Map({srcNodeName: srcNodeName, desNodeName: desNodeName, connectionId: connectionId})
		)
	}


	static nodeMouseUpEvent(clientX, clientY, nodeName){
		return new ScenarioMouseEvent(
			ScenarioMouseEvent.eventType.MOUSE_UP,
			ScenarioMouseEvent.sourceType.NODE,
			clientX,
			clientY,
			Map({nodeName: nodeName})
		)
	}

    static scenarioMouseUpEvent(clientX, clientY){
        return new ScenarioMouseEvent(
            ScenarioMouseEvent.eventType.MOUSE_UP,
            ScenarioMouseEvent.sourceType.SCENARIO,
            clientX,
            clientY,
            Map({})
        )
    }

    static scenarioMouseMoveEvent(clientX, clientY){
        return new ScenarioMouseEvent(
            ScenarioMouseEvent.eventType.MOUSE_MOVE,
            ScenarioMouseEvent.sourceType.NONE,
            clientX,
            clientY,
            Map({})
        )
    }

    static scenarioWheelEvent(deltaX, deltaY){
        return new ScenarioMouseEvent(
            ScenarioMouseEvent.eventType.WHEEL,
            ScenarioMouseEvent.sourceType.NONE,
            0,
            0,
            Map({deltaX: deltaX, deltaY: deltaY})
        )
    }

	static scenarioSizeEvent(changes){
		return new ScenarioMouseEvent(
				ScenarioMouseEvent.eventType.SIZE,
				ScenarioMouseEvent.sourceType.NONE,
				0,
				0,
				changes
		)
	}

	static keyPressEvent(key){
		return new ScenarioMouseEvent(
				ScenarioMouseEvent.eventType.KEY,
				ScenarioMouseEvent.sourceType.NONE,
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
        return new ScenarioMouseEvent(
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
		return this.eventType==ScenarioMouseEvent.eventType.MOUSE_DOWN
	}

	isMouseUp(){
		return this.eventType==ScenarioMouseEvent.eventType.MOUSE_UP
	}

    isMouseMove(){
        return this.eventType==ScenarioMouseEvent.eventType.MOUSE_MOVE
    }

    isWheel(){
        return this.eventType==ScenarioMouseEvent.eventType.WHEEL
    }

	isSize(){
        return this.eventType==ScenarioMouseEvent.eventType.SIZE
    }

	isKey(){
		return this.eventType==ScenarioMouseEvent.eventType.KEY
	}

	isSlot(){
		return this.sourceType==ScenarioMouseEvent.sourceType.SLOT
	}

	isNode(){
		return this.sourceType==ScenarioMouseEvent.sourceType.NODE
	}

	isConnection(){
		return this.sourceType==ScenarioMouseEvent.sourceType.CONNECTION
	}

	isScenario(){
		return this.sourceType==ScenarioMouseEvent.sourceType.SCENARIO
	}
}

ScenarioMouseEvent.eventType = {
	MOUSE_DOWN: "MOUSE_DOWN",
	MOUSE_UP: "MOUSE_UP",
	MOUSE_MOVE: "MOUSE_MOVE",
	WHEEL: "WHEEL",
	SIZE: "SIZE",
	KEY: "KEY"
};

ScenarioMouseEvent.sourceType = {
	NONE: "NONE",
	SLOT: "SLOT",
	NODE: "NODE",
	SCENARIO: "SCENARIO",
	CONNECTION: "CONNECTION"
};