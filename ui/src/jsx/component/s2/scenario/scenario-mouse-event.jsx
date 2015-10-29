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

	constructor(eventType, sourceType, clientX, clientY, payload){
		this.eventType = eventType;
		this.sourceType = sourceType;
		this.clientX = clientX;
		this.clientY = clientY;
		this.payload = payload;
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
}

ScenarioMouseEvent.eventType = {
	MOUSE_DOWN: "MOUSE_DOWN",
	MOUSE_UP: "MOUSE_UP"
};

ScenarioMouseEvent.sourceType = {
	SLOT: "SLOT",
	NODE: "NODE",
	CONNECTION: "CONNECTION"
};