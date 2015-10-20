import React from 'react';

export default class Connection extends React.Component {

    // model: {src: node.name, des: s.nodeName, srcX: node.x+index*70-35, srcY: 75, desX: 0, desY: 0}

    render(){

        var m = this.props.model

        var top = m.srcY;
        if(m.srcY>m.desY){
            top = m.desY
        }

        var left = m.srcX;
        if(m.srcX>m.desX){
            left = m.desX;
        }

        var width = Math.abs(m.srcX-m.desX)
        var height = Math.abs(m.srcY-m.desY)

        var style = {
            position: 'absolute',
            top: top+'px',
            left: left+'px',
            width: width+'px',
            height: height+'px',
            border: '1px solid #ff0'
        }

        return(
            <div style={style}></div>
        )
    }
}
