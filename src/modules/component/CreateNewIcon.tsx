import {IoCreateOutline} from "react-icons/io5";
import Horizontal from "../../layout/Horizontal";
import React from "react";

export function CreateNewIcon(props: { onClick: () => void }) {
    return <Horizontal vAlign={'center'}
                       style={{fontSize: '1.5rem'}} onClick={props.onClick}>
        <IoCreateOutline/>
    </Horizontal>
}