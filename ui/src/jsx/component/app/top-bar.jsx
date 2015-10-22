import React from 'react';

import ctx from '../../context';

export default
class TopBar extends React.Component {

    constructor(props) {
        super(props);
       
        this.uiActions=ctx.uiActions
    }

    render() {

        var click = function(){
            this.uiActions.goToProjects()
        }.bind(this);

        return (
            <div className="topbar" onClick={click}>Top bar</div>
        )
    }
}
