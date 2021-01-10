//提供一种方案替代react-loadable,使用React.lazy和React.Suspense(相较于react-loadable缺点delay问题和next.js不能使用)，因为react-loadable在将来会呗其代替
// 当然也可以直接使用react-loadable更强大，这里提供两种选择
//但是这里需要值得注意的是当父组件使用lazy，suspense，子组件就不能使用，否则可能会出现子组件不渲染的情况，所以请慎重使用
//如果当你想在子组件使用react-lazy,suspense的话，可以使用react-loadable或者loadable/component

import React,{ Component,Suspense } from "react";
import PropTypes from "prop-types";

import Loading from "@/components/Loading";

const loadableHoc = ( WrapperComponent,LoadingNode )=>{

    return class extends Component {
        render(){
            return (
                <Suspense fallback={ LoadingNode?? <Loading /> }>
                    <WrapperComponent />
                </Suspense>
            )

        }
    }
}
loadableHoc.propTypes = {
    WrapperComponent:PropTypes.oneOf([ "func","node","element","elementType" ]).isRequired,
    LoadingNode:PropTypes.oneOf([ "func", "node","element","elementType" ])
}


export default loadableHoc;


//使用方法：
//loadableHoc( lazy( ()=> import(/* webpack Component  */ "../Test2") ),<LoadingComponent/> )


