class Scenario extends React.Component {

    onMouseDown(event){
        if(this.props.onMouseDown!=null){
        	this.props.onMouseDown(event)
        }
    }

    onMouseUp(event){
        if(this.props.onMouseUp!=null){
        	this.props.onMouseUp(event)
        }
    }


    
    render(){

        console.log("render`")

        var nodes = this.props.nodes.map(node =>
            <Node key={node.name} name={node.name} description={node.description} x={node.x} y={node.y} slots={node.slots.slots}
                  onMouseDown={this.onMouseDownOnNode.bind(this)}
                  onMouseUp={this.onMouseUpOnNode.bind(this)}
            />);

        var connections = this.props.model.connections.map(c => <Connection key={c.src+c.des+c.index} model={c}/>);

        return (
        	<div>
        		{connections}
        		{nodes}
        	</div>)
    }
}

Scenario.propertyTypes = {
	nodes: React.PropTypes.array.isRequired,
	connections: React.PropTypes.array.isRequired
}

