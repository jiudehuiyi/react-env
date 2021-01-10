//实现事件触发进行相应的代码埋点，本例实现了一个click事件，若实现其它可参照如下

import React from "react";

export const sdk = {
    params:null,

    initParams(){
        const params = {};
        params.domain = document.domain || "";
        params.title = document.title || "";
        params.referrer = document.referrer || "";
        params.sw = window.screen.width || 0;
        params.sh = window.screen.height || 0;
        params.lang = navigator.language || "";
        params.ua = navigator.userAgent || "";
        params.loadT = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart || 0;
        params.timestamp = new Date();//时间戳
        sdk.params = params;
    },
    //上报数据
    report(params = {}){
        if( !sdk.params ) {
            sdk.initParams();
        }
        const _params = Object.assign( {},sdk.params,params );
        //上传地址和传递的数据,这里是需要进行相应的改造的通过axios
        // request('/api/report',{params:_params});
    },
   
    dispatch({type}){
        this.report( {type} );
    }
}

//封装一个包裹组件点击触发sdk,重新对子组件进行包装
export default function TrackerClick(props){
    const { type,children } = props;

    return React.Children.map( children,(child)=>{
     return   React.cloneElement( child,{
            //添加属性
            onClick:(e)=>{
                const originClick = child.props.onClick;
                typeof originClick === "function" && originClick.call( child,e );
                sdk.dispatch({type});
            }
        } )
    } );
}

//使用方法：<TrackerClick type="xxx"> React.Component </TrackerClick> 
