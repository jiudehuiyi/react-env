import React from "react";
import * as example2Action from "../../redux/actions/example2";
import { connect } from "react-redux"
import { bindActionCreators, combineReducers } from "redux";

class Example2 extends React.Component {

    componentDidMount(){
        this.props.fetchExample2()
    }
    render(){
        return (
            <div>
                example2
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    console.log( state );
    return {};
}
const mapDispatchToProps = (dispatch)=>{
    const fetchExample2 = example2Action.thread.request;
    return bindActionCreators( {fetchExample2},dispatch );
}
export default connect( mapStateToProps,mapDispatchToProps )(Example2);

