//组件边界
import React,{Component} from "react";


class ErrorBoundary extends Component {

    constructor(props){
        super(props);
        this.state = { hasError:false }
    }

    static getDerivedStateFromError(err){
        return {
            hasError:true
        }
    }

    componentDidCatch( error,info ){
        console.log("error boundary");
        //上报错误

    }

    render(){
        if( this.state.hasError ) {
            return (
                <h1>Something went wrong</h1>
            )
        }
        return this.props.children;
    }
}

ErrorBoundary.displayName = "ErrorBoundary";

export default ErrorBoundary;
