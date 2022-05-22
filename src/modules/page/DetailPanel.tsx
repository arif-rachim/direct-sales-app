import Vertical from "../../layout/Vertical";
import React, {useEffect} from "react";

import {HeaderPanel} from "../component/HeaderPanel";
import {HeaderTitle} from "../component/HeaderTitle";
import {NavigateBackIcon} from "../component/NavigateBackIcon";
import {SpaceFill} from "../component/SpaceFill";

import Horizontal from "../../layout/Horizontal";
import {TextButton} from "../component/TextButton";
import {ConfigType, ShowPanelType, useSlidePanel} from "../../layout/useSlidePanel";
import {Footer} from "../component/Footer";
import {LabelInput, LabelInputProps} from "../component/LabelInput";
import {useForm} from "../../layout/useForm";
import {useFetch} from "./useFetch";
import {Observer} from "react-hook-useobserver/lib/useObserver";

export interface FormInputProps extends LabelInputProps {
}

interface DetailPanelProps {
    containerDimension: { width: number, height: number },
    closePanel: (result: any) => void,
    formInputs: Array<FormInputProps>,
    title: string,
    entityId: string,
    entityName: string
}

function DetailHeader(properties: {
    showPanel: (constructor: ShowPanelType, config?: ConfigType) => Promise<any>,
    validateForm: () => boolean,
    closePanel: (val: any) => void,
    title: string,
    $state:Observer<any>,
    entityName:string
}) {
    return <HeaderPanel>
        <Horizontal vAlign={'center'}>
            <NavigateBackIcon onClick={() => {
                properties.closePanel(true);
            }}/>
            <SpaceFill/>
            <TextButton label={'Edit'} onClick={async () => {
                const action = await properties.showPanel((close) => {
                    return <ActionList close={close}
                                       validateForm={properties.validateForm} $state={properties.$state} entityName={properties.entityName}/>
                }, {animation: "bottom", overlayHidden: true})
            }}/>
        </Horizontal>
        <HeaderTitle title={`${properties.title} Info`}/>
    </HeaderPanel>;
}


export function DetailPanel(props: DetailPanelProps) {
    const {Form, validateForm,$state,setState} = useForm({});
    const isNew = props.entityId === '';
    const {showPanel, SlidePanel} = useSlidePanel();
    const dimension = isNew ? {width: props.containerDimension.width} : props.containerDimension;
    const fetch = useFetch(props.entityName);
    const entityId = props.entityId;
    useEffect(() => {
        if(entityId){
            (async() => {
                const item = await fetch.read(entityId);
                setState(item);
            })();
        }
    },[entityId]);
    return <SlidePanel>
        <Vertical style={{backgroundColor: '#fff', ...dimension}}>
            {!isNew &&
                <DetailHeader closePanel={props.closePanel} showPanel={showPanel} title={props.title}
                              validateForm={validateForm} entityName={props.entityName} $state={$state}
                />
            }
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
            {isNew &&
                <ActionList close={() => {
                    props.closePanel(true);
                }} validateForm={validateForm} entityName={props.entityName} $state={$state}/>
            }
        </Vertical>
    </SlidePanel>
}

function ActionList(props: {
    close: (result: any) => void,
    validateForm: () => boolean,
    entityName:string,
    $state:Observer<any>
}) {
    const fetch = useFetch(props.entityName);
    return <Footer style={{padding: '0.5rem 1rem'}}>
        <TextButton label={'Cancel'}/>
        <SpaceFill/>
        <TextButton label={'Save'} promoted={true} onClick={async () => {
            if (props.validateForm()) {
                await fetch.create(props.$state.current)
                props.close(true)
            }
        }}/>
    </Footer>
}