import Horizontal from "../../layout/Horizontal";
import React, {CSSProperties} from "react";

export function Footer(props:{children?:any,style?:CSSProperties}){

    return <Horizontal style={{backgroundColor: '#dedede', borderTop: '1px solid #ccc',...props.style}} >
        {props.children}
    </Horizontal>
}