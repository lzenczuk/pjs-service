import React from 'react';

export default class VPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        console.log("VPanel")

        var t=true
        var top = 0
        var bottom = 0
        var maxIndex = -1;

        React.Children.forEach(this.props.children, (ch, index) => {
            console.log("Child: ch="+typeof(ch));
            console.log("Child: index="+index);

            console.log("height: "+ch.props.height);

            console.log("type: "+typeof(ch.type));
            console.log("name: "+ch.type.name);

            if(t){
                if(ch.props.height!=undefined){
                    top = top+ch.props.height
                }else{
                    t=false // bottom
                    maxIndex = index
                }
            }else{
                if(ch.props.height!=undefined){
                    bottom = bottom+ch.props.height
                }else{
                    console.log("Second max element. "+index)
                }
            }
        })

        console.log("Top: "+top+"; bottom: "+bottom);

        if(maxIndex!=-1){
            this.props.children[maxIndex].props.marginTop=top    
            this.props.children[maxIndex].props.marginBottom=bottom
        }

        return (
            <div>
                test
                {this.props.children}
            </div>
        )
    }
}
