import Vertical from "../../layout/Vertical";
import React from "react";
import Horizontal from "../../layout/Horizontal";
const labelWidth = '7rem';
import classes from "./CatalogPanel.module.css";

function Input(props:{label:string,field:string}) {
    return <Horizontal style={{padding: '0.5rem 0rem', borderBottom: '1px solid #ccc'}} vAlign={'center'}>
        <Horizontal style={{width: labelWidth, flexShrink: 0}} vAlign={'center'} className={classes.label}>
            <Vertical style={{flexGrow: 1, flexShrink: 0}}>{props.label}</Vertical>
            <Vertical>:</Vertical>
        </Horizontal>
        <Vertical style={{flexGrow: 1}}>
            <input type="text" className={classes.input}/>
        </Vertical>
    </Horizontal>;
}

/*
code : string;
    name : string;
    description : string;
    group : string;
    price : number;
    unitOfMeasurement : string;
    status : 'ACTIVE' | 'INACTIVE';
    histories : Array<History>;
 */
export function CatalogDetailPanel(props:{close:(result:any) => void,containerDimension:{width:number;height:number}}){
    return <Vertical style={{backgroundColor: '#fff',padding:'1rem',borderTop:'1px solid #ccc'}}>
        <Vertical style={{fontSize:'2rem',marginTop:'0.2rem',marginBottom:'0.5rem',fontWeight:'bold'}} hAlign={'center'}>New Product</Vertical>
        <Input label={'Name'} field={'name'}/>
        <Input label={'Description'} field={'description'}/>
        <Input label={'Group'} field={'group'}/>
        <Input label={'Price'} field={'price'}/>
        <Input label={'UoM'} field={'unitOfMeasurement'}/>
        <Input label={'Status'} field={'status'}/>
    </Vertical>
}

