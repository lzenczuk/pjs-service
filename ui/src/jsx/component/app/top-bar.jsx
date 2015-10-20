import React from 'react';

import ctx from '../../context';

export default
class TopBar extends React.Component {

    constructor(props) {
        super(props);
       
        this.projectActions=ctx.projectActions
    }

    render() {

        var click = function(){
            this.projectActions.loadProjects()
        }.bind(this);

        return (
            <div className="topbar" onClick={click}>Top bar</div>
        )
    }
}
