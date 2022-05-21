import {IoCheckboxOutline, IoSquareOutline} from "react-icons/io5";
import Vertical from "../../layout/Vertical";
import React from "react";

interface CheckboxProps{
    selected : boolean
}

export function Checkbox(props:React.PropsWithoutRef<CheckboxProps>){
    return <Vertical style={{fontSize:'2rem'}} >
        {props.selected && <IoCheckboxOutline/>}
        {!props.selected && <IoSquareOutline/>}
    </Vertical>
}