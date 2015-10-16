import React from 'react';

export default
class ProjectsList extends React.Component {

    constructor(props) {
        super(props);
        console.log("ProjectsList:componentWillMount}");
        // state and default properties goes here
    }

    componentWillMount() {
        console.log("ProjectsList: componentWillMount")
    }

    componentDidMount() {
        console.log("ProjectsList: componentDidMount")
    }

    /**
     * @param nextProps - object
     */
    componentWillReceiveProps(nextProps) {
        console.log("ProjectsList: componentWillReceiveProps");

        // if(nextProps.likeCount > this.props.likeCount)...
        // calling setState here not cause additional render, just one
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        console.log("ProjectsList: shouldComponentUpdate");
        return true;
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     */
    componentWillUpdate(nextProps, nextState) {
        console.log("ProjectsList: componentWillUpdate");
        // can't call setState here
    }

    /**
     * @param prevProps - object
     * @param prevState - object
     */
    componentDidUpdate(prevProps, prevState) {
        console.log("ProjectsList: componentDidUpdate")
    }

    render() {
        console.log("ProjectsList: render");

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
