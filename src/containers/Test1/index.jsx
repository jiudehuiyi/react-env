import React from "react";
import { connect } from "react-redux";

import Loading from "@/components/Loading";
const Test1 = ()=>{


    return (
        <div >
            
            <Loading/>
        </div>
    )
}
const mapStateToProps = (state)=>{
    console.log( state );
    return {};
}
export default connect(mapStateToProps)( Test1 );