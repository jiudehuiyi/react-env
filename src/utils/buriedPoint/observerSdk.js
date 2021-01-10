//曝光埋点，收集相关信息，采用observer系列新APi，如需兼容旧版浏览器请参考:https://github.com/w3c/IntersectionObserver/tree/master/polyfill

// polyfill 解决兼容性问题
import 'intersection-observer';
import React,{ useEffect } from "react";
// 延迟时间，节流作用
IntersectionObserver.prototype['THROTTLE_TIMEOUT'] = 300;

class ExposureSdk {

    constructor(maxNum = 10) {
        this.dataList = [];
        this.maxNum = maxNum;// 一次上报最大个数
        this.time = 0;//延迟的上报时间，根据相应的业务进行修改
        this._observer= null;
        this._timer = null;
        this.init();
    }
    //init
    init(){
        const self = this;
        this._observer = new IntersectionObserver( (entries)=>{
            entries.forEach( entry => {
                if( entry.isIntersecting ) {//进入视图触发
                    try {
                        self._timer && clearTimeout( self._timer );
                        const eventParam = entry.target.attributes["data-param"].value;
                        const eventId = entry.target.attributes["data-eventId"].value;
                        self.dataList.push( {eventId,eventParam} );
                        //已经上报的节点，取消对该节点的Dom观察
                        self._observer.unobserve(entry.target);
                        //超出长度直接上报
                        if( self.dataList.length >= self.maxNum ) {
                            self.send();
                        }else if( self.dataList.length > 0 ){
                            //定时上报
                            self._timer = setTimeout( ()=>{
                                self.send();
                            },self.time )
                        }
                    } catch (error) {
                        console.error( "曝光埋点:",error );
                    }
                }
            } )
        },{
            root:document.querySelector("#root"),
            rootMargin:"0px",
            threshold: 1 // 目标dom出现在视图的比例 0 - 1
        } )
    }

    //添加到观察列表
    add(entry){
        const { el } = entry || {};
        this._observer && this._observer.observe(el);
    }

    //上报数据
    send(){
        const data = this.dataList;
        // axios.post(url,{data})
    }

    //组件销毁的时候，数据全部上报
    beforeUnMount(){
        const data = this.dataList;
        // axios.post(url,{data})
    }
}

const ExposureSdkInstance = new ExposureSdk();

//属性封装
const ExposureSdkHoc = (WrappedComponent)=>{
    const { index,eventId,sendData = true,eventParam } = props;

    useEffect( ()=>{
        sendData && ExposureSdkInstance.add( { el:document.getElementById(`paper-content-${index}`) } );        
    },[] );

    const value = { index:index,...eventParam };

    return (
        <div
            id={ `paper-content-${index}` }
            data-eventId = { eventId }
            data-param = { JSON.stringify(value) }
        >
            <WrappedComponent  {...props} />
        </div>
    )

}



export default ExposureSdkHoc;



//使用方法
// BookItem 组件
// import React from 'react';
// import exposureHoc from 'components/Exposure';

// const BookItem = (props) => {
//   const { index, subItem } = props;
//   return (
//     <div key={subItem.bookId}>
//       <img src={subItem.cover} width='136px' height='178px' />
//       <span>{subItem.bookName}</span>
//     </div>
//   )
// }

// export default exposureHoc(BookItem);

// // 父组件
// <BookItem
//   index={index}
//   subItem={subItem}
//   eventId='07_learnmaterial_materiallist_show' // 埋点事件ID
//   eventParam={{ ... }} // 埋点参数
// />

