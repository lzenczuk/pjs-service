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

	constructor(eventType, sourceType, clientX, clientY, payload){
		this.eventType = eventType;
		this.sourceType = sourceType;
		this.clientX = clientX;
		this.clientY = clientY;
		this.payload = payload;
	}

    setPosition(newX, newY){
        return new ScenarioMouseEvent(this.eventType, this.sourceType, newX, newY, this.payload)
    }

	isMouseDown(){
		return this.eventType==ScenarioMouseEvent.eventType.MOUSE_DOWN
	}

	isMouseUp(){
		return this.eventType==ScenarioMouseEvent.eventType.MOUSE_UP
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
	MOUSE_UP: "MOUSE_UP"
};

ScenarioMouseEvent.sourceType = {
	SLOT: "SLOT",
	NODE: "NODE",
	SCENARIO: "SCENARIO",
	CONNECTION: "CONNECTION"
};