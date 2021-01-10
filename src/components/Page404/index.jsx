import React from "react";
import { Result,Button } from "antd";
import { withRouter } from "react-router-dom";

const Page404 = (props)=>{


    const goBack = ()=>{
        props?.history?.goBack();
    }

    return (
        <div>
            <Result
                status={404}
                title={`404`}
                subTitle={ `页面找不到啦~~` }
                extra={ 
                    <Button 
                        type="primary"
                        onClick={ ()=>goBack() }
                    >
                        回到上个页面
                    </Button> 
                }
            />
        </div>
    )
}

Page404.displayName = "Page404"; 
export default withRouter(Page404);

