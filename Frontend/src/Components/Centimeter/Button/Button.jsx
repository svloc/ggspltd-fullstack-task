import React from "react";
import './Button.css';
function Button(props){
    const{children,variant,...rest}=props;
    switch (variant) {
        case 'danger':
            return(<button className="btn btn-danger" {...rest}>{children}</button>);
        case 'outlined_danger':
            return(<button className="btn btn-outlined-danger" {...rest}>{children}</button>);
        default:
            return(<button className="btn btn-black" {...rest}>{children}</button>);
    }  
}
export default Button;