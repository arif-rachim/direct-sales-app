import Vertical from "../../layout/Vertical";
import React from "react";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import Horizontal from "../../layout/Horizontal";

export function DepoPanel(props:{containerDimension:{width:number,height:number},closePanel:(result:any) => void}){
    return <Vertical style={{width:props.containerDimension.width,height:props.containerDimension.height,backgroundColor: '#EFEFEF'}}>
        <Horizontal style={{position: 'absolute', top: 0, left: '1rem'}} vAlign={'center'}>
            <Vertical style={{fontSize:'1.5rem',marginRight:'1rem',cursor:'pointer'}} onClick={() => {
                props.closePanel(true);
            }}><IoArrowBackCircleOutline/></Vertical><h1>Depo Management</h1>
        </Horizontal>

    </Vertical>
}
