import React from "react";

import * as exampleActions from "@/redux/actions/example";
import { connect } from "react-redux";
import {  bindActionCreators } from "redux";
class Example extends React.Component {

    static path = "/example11"

    componentDidMount(){
        this.props.fetchExample();
    }

    render(){
        // console.log( this.props )
        return (
            <div>
                Example
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    console.log( state )

    return {};
}
const mapDispatchToProps = (dispatch)=>{

    const fetchExample = exampleActions.thread.request;

    return bindActionCreators({ fetchExample },dispatch)
}
Example.path = "/example11"
export default connect( mapStateToProps,mapDispatchToProps )(Example);
