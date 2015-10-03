import React from 'react';
import DndActions from '../../action/dnd-actions'
import DndStore from '../../store/dnd-store'

export default class DndLayer extends React.Component {

    constructor(props){
        super(props);
        this.state = {dragActive: false};

        DndStore.instance().addDndBegineListener(function(){
            var component = DndStore.instance().getDndComponent();

            console.log("DndLayer.dndStore.addDndBegineListener: "+JSON.stringify(component));

            this.setState({dragActive: true, component: component});
        }.bind(this))
    }

    mouseUpHandler(event){
        this.setState({dragActive: false})
    }

    mouseMoveHandler(event){
        if(this.state.dragActive){
            console.log("Drag move");
        }
    }

    dndComponentRenderer() {
        var c = this.state.component;

        if (c.componentType === "node") {
            return (<Node model={c.params.model}/>)
        } else {
            return (<div className="dndbox"/>)
        }
    }

    render(){

        if(this.state.dragActive){

            console.log("Render drag active");
            var dndComponent = (<div className="dndbox"/>);

            /*if (this.state.component.componentType === "node") {
                dndComponent =  (<Node model={this.state.component.params.model}/>)
            }*/

            console.log("DndComponent: "+dndComponent);

            return(
                //<div className="vertical-horizontal-max" onMouseUp={this.mouseUpHandler.bind(this)} onMouseMove={this.mouseMoveHandler.bind(this)}>
                <div className="vertical-horizontal-max">
                    {dndComponent}
                </div>
            )
        }else{
            return(
                <div className="vertical-horizontal-max">
                </div>
            )
        }
    }
}
