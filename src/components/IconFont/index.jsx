import React,{ Component } from "react";
import classnames from "classnames";

import "./index.scss";

class IconFont extends Component {


    render(){
        const { style,className,icon } = this.props;
        return (
            <svg 
                aria-hidden = {true}
                style={{ ...style }}
                className = { classnames("reIcon",{
                    [className]:!!className
                }) }
                dangerouslySetInnerHTML={{
                    __html: `<use xlink:href=#${icon}></use>`
                }}


            />
        )
    }

}


IconFont.displayName = "IconFont";
export default IconFont;

