import React from "react";
import Vertical from "../../layout/Vertical";
import Horizontal from "../../layout/Horizontal";
import classes from "./ProductPanel.module.css";
import {TextButton} from "../component/TextButton";
import {SpaceFill} from "../component/SpaceFill";
import {Footer} from "../component/Footer";

const labelWidth = '7rem';

export function Input(props: { label: string, field: string }) {
    return <Horizontal style={{padding: '0rem 0rem', borderBottom: '1px solid #ccc'}} vAlign={'center'}>
        <Horizontal style={{width: labelWidth, flexShrink: 0, marginBottom: '0.1rem'}} vAlign={'center'}
                    className={classes.label}>
            <Vertical style={{flexGrow: 1, flexShrink: 0}}>{props.label}</Vertical>
            <Vertical>:</Vertical>
        </Horizontal>
        <input type="text" className={classes.input}/>
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
const tabData = [];

export function NewProductPanel(props: { close: (result: any) => void, containerDimension: { width: number; height: number } }) {

    return <Vertical style={{backgroundColor: '#fff'}}>
        <Vertical style={{padding: '1rem', borderTop: '1px solid #ccc'}}>
            <Vertical style={{fontSize: '1.5rem', marginTop: '0.2rem', marginBottom: '0.5rem', fontWeight: 'bold'}}
                      hAlign={'center'}>New Product</Vertical>
            <Input label={'Name'} field={'name'}/>
            <Input label={'Description'} field={'description'}/>
            <Input label={'Group'} field={'group'}/>
            <Input label={'Price'} field={'price'}/>
            <Input label={'UoM'} field={'unitOfMeasurement'}/>
            <Input label={'Status'} field={'status'}/>
            <Vertical style={{border:'1px solid #ccc',backgroundColor:'#efefef',height:200,marginTop:'1rem',borderRadius:'0.5rem'}} hAlign={'center'} vAlign={'center'}>
                <i>Click to Upload Image</i>
            </Vertical>
        </Vertical>
        <Footer style={{padding:'0.5rem 1rem'}}>
            <TextButton label={'Cancel'} onClick={() => props.close(false)}/>
            <SpaceFill/>
            <TextButton label={'Save'} promoted={true}/>
        </Footer>
    </Vertical>
}

