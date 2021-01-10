import React , { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";


class ReDiv extends Component {

    constructor( props,context ) {
        super( props,context );
        this.timer = null;
    }

    componentWillUnmount(){
        if( this.props.onClose && typeof this.props.onClose === "function" ) {
            document.addEventListener("click",this.handleDocumentClick,false);
            if( this.timer ) {
                clearTimeout( this.timer );
                this.timer = null;
            }
        }
    }

    componentDidMount(){
        if( this.props.onClose && typeof this.props.onClose === "function" ) {
            setTimeout( ()=>{
                document.addEventListener("click",this.handleDocumentClick,false)
            },500 );
        }
    }

    handleDocumentClick = (ev)=>{
        if( this._reactInternalInstance ) {
            if (!this.targetIsDescendant(ev, ReactDOM.findDOMNode(this))) {
                this.props.onClose();
            }
        }
    }
    targetIsDescendant = (ev,parent)=>{
        let node = ev.node;
        while( node !== null ) {
            if( node === parent ) return true;
            node = node.parentNode
        }
        return false;
    }

    render(){
        const { 
            className,style,mask=0,
            maskClassName,maskStyle,
            wrapClassName,wrapStyle,
            children 
        } = this.props;

        let _props = { ...this.props };
        delete _props.children;
        delete _props.className;
        delete _props.onClose;
        return (
            <div
                style = { {...style} }
                className={ classnames(
                    "re-div",
                    {
                        [className]:!!className
                    }
                    ) }
                onMouseDown = { e => e.stopPropagation() }
                onMouseMove={e => e.stopPropagation()}
                onMouseUp={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
                onTouchEnd={e => e.stopPropagation()}
                onWheel={e => e.nativeEvent.stopImmediatePropagation()}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                {..._props}    
            >
                {
                    mask?1:0 &&
                    <div
                        style={ {  ...maskStyle } } 
                        className={ classnames("re-div-mask",{[ `${maskClassName}` ]:maskClassName}) } 
                    /> 
                }
                
                <div
                    className={ classnames("re-div-wrap",{
                        [`${wrapClassName}`]:wrapClassName 
                    }) }
                    style={{ ...wrapStyle }}
                >
                    {
                        children
                    }
                </div>
               
                
            </div>
        )
    }

}


ReDiv.propTypes = {
    className:PropTypes.string,
    style:PropTypes.object,
    maskClassName:PropTypes.string,
    maskStyle:PropTypes.object,
    wrapClassName:PropTypes.string,
    wrapStyle:PropTypes.object,
    mask:PropTypes.number,
}

ReDiv.displayName = "ReDiv";
export default ReDiv


//这是一个阻止组件冒泡和组件
//使用方法 <ReDiv > React.ReactNode|React.ComponentType </ReDiv>
// tip:mask建议这样使用:value?1:0,如果直接传递布尔值并进行属性检查，会报警告