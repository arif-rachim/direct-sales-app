import React, {CSSProperties} from "react";
import classes from "./Text.module.css";

interface TextProps{
    text : string,
    style? :CSSProperties,
    className? :string
}

export function Text(props:TextProps){
    return <p className={[classes.text,props.className].join(' ')} style={props.style}>{props.text}</p>
}