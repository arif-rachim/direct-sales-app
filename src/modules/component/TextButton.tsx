import Vertical from "../../layout/Vertical";
import React from "react";
import {Text} from "../../layout/Text";

export function TextButton(props:{label:string,onClick?:() =>void,promoted?:boolean}){
    return <Vertical onClick={props.onClick}>
        <Text style={{fontSize: '1.1rem', color: props.promoted === true ?'blue' : '#666'}} text={props.label}/>
    </Vertical>
}