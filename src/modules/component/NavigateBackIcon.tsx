import {IoChevronBackOutline} from "react-icons/io5";
import Vertical from "../../layout/Vertical";
import React from "react";

export function NavigateBackIcon(props: { onClick: () => void }) {
    return <Vertical style={{fontSize: '1.5rem', cursor: 'pointer'}}
                     onClick={props.onClick}><IoChevronBackOutline/></Vertical>
}