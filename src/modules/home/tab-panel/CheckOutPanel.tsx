import Vertical from "../../../layout/Vertical";
import React from "react";
import {HeaderTitle} from "../../component/HeaderTitle";
import {HeaderPanel} from "../../component/HeaderPanel";

export function CheckOutPanel(){
    return <Vertical style={{width:'100%',height:'100%'}}>
        <HeaderPanel>
            <HeaderTitle title={'Checkout'}/>
        </HeaderPanel>
    </Vertical>
}