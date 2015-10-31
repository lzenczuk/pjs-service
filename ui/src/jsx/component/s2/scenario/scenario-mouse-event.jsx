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

	static slotMouseUpEvent(clientX, clientY, slotIndex, nodeName){
		return new ScenarioMouseEvent(
			ScenarioMouseEvent.eventType.MOUSE_UP,
			ScenarioMouseEvent.sourceType.SLOT,
			clientX,
			clientY,
			Map({slotIndex: slotIndex, nodeName: nodeName})
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

	constructor(eventType, sourceType, clientX, clientY, payload, x, y){
		this.eventType = eventType;
		this.sourceType = sourceType;
		this.clientX = clientX;
		this.clientY = clientY;
		this.payload = payload;
        this.x = x;
        this.y = y;
	}

    setPosition(x, y){
        return new ScenarioMouseEvent(this.eventType, this.sourceType, this.clientX, this.clientY, this.payload, x, y)
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
	WHEEL: "WHEEL"
};

ScenarioMouseEvent.sourceType = {
	NONE: "NONE",
	SLOT: "SLOT",
	NODE: "NODE",
	SCENARIO: "SCENARIO",
	CONNECTION: "CONNECTION"
};