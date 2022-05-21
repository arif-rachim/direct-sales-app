import React from "react";
import Vertical from "../../layout/Vertical";
import {TextButton} from "../component/TextButton";
import {SpaceFill} from "../component/SpaceFill";
import {Footer} from "../component/Footer";
import {Text} from "../../layout/Text";
import {useForm, ValidatorTypeProps} from "../../layout/useForm";
import {LabelInput} from "../component/LabelInput";


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

function valueRequiredValidator(props: ValidatorTypeProps) {
    if (props.formStateFieldValue) {
        return [];
    }
    return 'Value required';
}

export function NewProductPanel(props: { close: (result: any) => void, containerDimension: { width: number; height: number } }) {
    const {Form, validateForm} = useForm({});

    return <Vertical style={{backgroundColor: '#fff'}}>
        <Vertical style={{padding: '1rem', borderTop: '1px solid #ccc'}}>
            <Vertical style={{fontSize: '1.5rem', marginTop: '0.2rem', marginBottom: '0.5rem', fontWeight: 'bold'}}
                      hAlign={'center'}><Text text={'New Product'}/></Vertical>
            <Form>
                {/*<LabelInput label={'Name'} field={'name'} inputMode={"numeric"} validator={valueRequiredValidator}/>*/}
                {/*<LabelInput label={'Description'} inputMode={'text'} field={'description'} validator={valueRequiredValidator}/>*/}
                {/*<LabelInput label={'Group'} inputMode={"text"} field={'group'} validator={valueRequiredValidator}/>*/}
                {/*<LabelInput label={'Price'} inputMode={'numeric'} field={'price'} validator={valueRequiredValidator}/>*/}
                {/*<LabelInput label={'UoM'} inputMode={'text'} field={'unitOfMeasurement'} validator={valueRequiredValidator}/>*/}
                {/*<LabelInput label={'Status'} inputMode={'text'} field={'status'} validator={valueRequiredValidator}/>*/}

                <Vertical style={{
                    border: '1px solid #ccc',
                    backgroundColor: '#efefef',
                    height: 200,
                    marginTop: '1rem',
                    borderRadius: '0.5rem'
                }} hAlign={'center'} vAlign={'center'}>
                    <i>Click to Upload Image</i>
                </Vertical>
            </Form>
        </Vertical>
        <Footer style={{padding: '0.5rem 1rem'}}>
            <TextButton label={'Cancel'} onClick={() => props.close(false)}/>
            <SpaceFill/>
            <TextButton label={'Save'} onClick={() => {
                if(validateForm()){

                }
            }} promoted={true}/>
        </Footer>
    </Vertical>
}

