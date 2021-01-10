import React from "react";
import { ActivityIndicator } from "antd-mobile";

import ReDiv from "@/components/ReDiv";

const Loading = ()=>{


    return (
        <ReDiv 
        >
            <div 
                className="loading"
            >
                <div 
                className="activityIndicator"  
                >
                    <ActivityIndicator />
                    <div>{  `Loading...`}</div>
                </div>

            </div>
        </ReDiv>
    )

}

Loading.displayName = "Loading";
export default Loading;


