import Vertical from "../../layout/Vertical";
import React from "react";

export function HeaderPanel(props:{children:any}) {
    return <Vertical style={{padding:'1rem',paddingBottom:'0.5rem',borderBottom:'1px solid #ccc'}}>
        {props.children}
    </Vertical>
}
