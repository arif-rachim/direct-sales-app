import Vertical from "../../layout/Vertical";
import React from "react";
import {Text} from "../../layout/Text";

export function HeaderTitle(props:{title:string}){
    return <Vertical style={{fontSize:'1.6rem',marginTop:'0.2rem',marginBottom:'0.2rem',fontWeight:'bold'}}>
        <Text text={props.title}/>
    </Vertical>
}