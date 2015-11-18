import React from 'react';

export default
class ProjectsList extends React.Component {

    render() {

        var projects = this.props.projects;

        if(projects.isError()){

            var reload = function(){
                ctx.projectActions.loadProjects()
            };

            return(<div>loading error {projects.errorMessage}<a href="#" onClick={reload}>reload</a></div>)
        }else if(projects.isLoading()){
            return(<div>loading...</div>)
        }else{
            var pl = projects.projects.map((p, i) => {
                var clickHandler = function(){
                    if(this.props.onSelect){
                        this.props.onSelect(p)
                    }
                }.bind(this);

                return (<li key={i} onClick={clickHandler}>{p.name} <i>{p.description}</i></li>)
            });

            return (<ul className="ui-list">{pl}</ul>)
        }
    }
}
