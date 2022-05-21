import Vertical from "../../layout/Vertical";
import React from "react";

import {HeaderPanel} from "../component/HeaderPanel";
import {HeaderTitle} from "../component/HeaderTitle";
import {NavigateBackIcon} from "../component/NavigateBackIcon";
import {SpaceFill} from "../component/SpaceFill";

import Horizontal from "../../layout/Horizontal";
import {TextButton} from "../component/TextButton";
import {useSlidePanel} from "../../layout/useSlidePanel";
import {Footer} from "../component/Footer";
import {LabelInput, LabelInputProps} from "../component/LabelInput";
import {useForm} from "../../layout/useForm";
import {Text} from "../../layout/Text";
import {useObserverListener} from "react-hook-useobserver";

export interface FormInputProps extends LabelInputProps {
}

interface DetailPanelProps {
    containerDimension: { width: number, height: number },
    closePanel: (result: any) => void,
    formInputs: Array<FormInputProps>
}

export function DetailPanel(props: DetailPanelProps) {
    const {Form, validateForm} = useForm({});
    const {showPanel, SlidePanel} = useSlidePanel();

    return <SlidePanel><Vertical style={{backgroundColor: '#fff', ...props.containerDimension}}>
        <HeaderPanel>
            <Horizontal vAlign={'center'}>
                <NavigateBackIcon onClick={() => {
                    props.closePanel(true);
                }}/>
                <SpaceFill/>
                <TextButton label={'Edit'} onClick={async () => {
                    const action = await showPanel((close, containerDimension) => {
                        return <ActionList close={close} containerDimension={containerDimension}/>
                    }, {animation: "bottom", overlayHidden: true})
                }}/>
            </Horizontal>
            <HeaderTitle title={'Product Information'}/>
        </HeaderPanel>
        <Vertical style={{padding: '1rem'}}>
            <Form>
                {props.formInputs.map((formInputProps: FormInputProps) => {
                    return <LabelInput label={formInputProps.label} field={formInputProps.field}
                                       key={formInputProps.field}
                                       config={formInputProps.config}
                                       showPanel={showPanel}
                                       />
                })}
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
    </Vertical>
    </SlidePanel>
}

function ActionList(props: { close: (result: any) => void, containerDimension: { width: number; height: number } }) {
    return <Footer style={{padding: '0.5rem 1rem'}}>
        <TextButton label={'Cancel'}/>
        <SpaceFill/>
        <TextButton label={'Save'} promoted={true} onClick={() => props.close(true)}/>
    </Footer>
}