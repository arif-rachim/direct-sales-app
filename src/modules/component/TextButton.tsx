import Vertical from "../../layout/Vertical";
import React from "react";

export function TextButton(props:{label:string,onClick?:() =>void,promoted?:boolean}){
    return <Vertical style={{fontSize: '1.1rem', color: props.promoted === true ?'blue' : '#666'}} onClick={props.onClick}>
        {props.label}
    </Vertical>
}