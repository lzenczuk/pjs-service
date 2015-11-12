import React from 'react';

export default class NotePlaceholder extends React.Component {

    onClick(event){

        event.stopPropagation();
        event.preventDefault();

        if(this.props.onEvent){
            this.props.onEvent({index: this.props.index})
        }
    }

    render() {

        return (
            <div className="placeholder" onClick={this.onClick.bind(this)}>
                {this.props.children}
            </div>
        )
    }
}
