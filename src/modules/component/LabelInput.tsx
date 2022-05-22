import React, {createContext, useCallback, useContext, useEffect} from "react";
import {CleaveOptions} from "cleave.js/options";
import {FormContext, Input, useFieldErrors, ValidatorType} from "../../layout/useForm";
import classes from "../product/ProductPanel.module.css";
import './LabelInput.css';
import {LabelWrapper} from "./LabelWrapper";
import {useObserver, useObserverValue} from "react-hook-useobserver/lib";
import {ListCellComponentProps} from "../../grid/List";
import {ShowPanelCallback} from "../../layout/useSlidePanel";
import {LookupPanel} from "./LookupPanel";
import {Observer} from "react-hook-useobserver/lib/useObserver";

export const InputContext = createContext<{ labelWidth: number | string }>({labelWidth: '7rem'});

export interface LabelInputProps {
    label: string,
    field: string,
    config: InputConfig,
    showPanel?: ShowPanelCallback;
}

export interface LookupProps {
    fetchData: () => Promise<Array<any>>;
    selectionMode: 'single' | 'multiple';
    cellComponent: React.FC<ListCellComponentProps>,
    valueMapper : (dataItem:any) => string
}

export interface InputConfig extends CleaveOptions {
    validator?: ValidatorType;
    email?: boolean;
    search?: boolean;
    url?: boolean;
    password?: boolean;
    lookup?: LookupProps;
    readOnly? : boolean;
    text?:boolean;
}


function valueSelector($state: Observer<any>, props: LabelInputProps) {
    return () => {
        const state = $state.current;
        if (props.field in state) {
            return state[props.field];
        }
        return undefined;
    }
}

function determineInputMode(config: InputConfig) {
    let inputMode: any = 'text';
    if (config?.numeral || config?.numericOnly || config?.numeralPositiveOnly) {
        inputMode = 'numeric';
    }
    if (config?.phone || config?.phoneRegionCode) {
        inputMode = 'tel';
    }
    if (config?.email) {
        inputMode = 'email';
    }
    if (config?.url) {
        inputMode = 'url';
    }
    if (config?.search) {
        inputMode = 'search';
    }
    if (config?.password) {
        inputMode = 'text';
    }
    return inputMode;
}

function onFetchDataEffect(fetchData: (() => Promise<Array<any>>) | undefined, setLookupData: (value: (((prevState: Array<any>) => Array<any>) | Array<any>)) => void) {
    return () => {
        if (fetchData) {
            (async () => {
                const lookupData = await fetchData();
                setLookupData(lookupData);
            })();
        }
    };
}

async function showLookup(props: LabelInputProps, config: InputConfig, value:any, $lookupData: Observer<Array<any>>, setState: (value: any) => void) {
    if(config.lookup === undefined){
        return;
    }
    if (props.showPanel === undefined) {
        throw new Error('LabelInput properties require showPanel since it was using lookup config');
    }
    const {selectionMode, cellComponent} = config.lookup;
    const result = await props.showPanel((close, containerDimension) => {
        const selectedItems = value !== undefined && selectionMode === 'single' ? [value] : value;
        return <LookupPanel data={$lookupData.current} close={close} containerDimension={containerDimension}
                            keySelector={(item) => item} selectedItems={selectedItems} selectionMode={selectionMode}
                            cellComponent={cellComponent}/>
    }, {animation: 'bottom'});
    if (result?.status !== 'cancel') {
        setState((state: any) => {
            return {...state, [props.field]: result}
        });
    }
}

export function LabelInput(props: LabelInputProps) {
    const errors: Array<string> = useFieldErrors(props.field) as Array<string>;
    const {$state, setState} = useContext(FormContext);
    const value = useObserverValue($state, valueSelector($state, props));
    const [$lookupData, setLookupData] = useObserver<Array<any>>([]);
    const config = props.config;
    let inputMode = determineInputMode(config);
    const onChange = useCallback((event:any) => setState((state: any) => ({...state, [props.field]: event.target.value})), []);
    let valueMapper = defaultValueMapper;

    // Following part of code is designed for lookup input
    const fetchData = config?.lookup?.fetchData;
    useEffect(onFetchDataEffect(fetchData, setLookupData), [fetchData]);
    const isLookupInput = config.lookup !== undefined;
    async function onFocusListener() {
        if (isLookupInput) {
            await showLookup(props, config, value, $lookupData, setState);
        }
    }
    if(config.lookup){
        valueMapper = config.lookup.valueMapper;
    }
    const readOnly = isLookupInput ? true : config.readOnly;
    // end of code for lookup input


    return <LabelWrapper errors={errors} label={props.label}>
        <Input className={classes.input} field={props.field} options={props.config}
               inputMode={inputMode} validator={props?.config?.validator || emptyValidator} onFocus={onFocusListener}
               value={value} onChange={onChange}
               valueMapper={valueMapper} readOnly={readOnly}
        />
    </LabelWrapper>
}

function emptyValidator() {
    return [];
}

function defaultValueMapper(val:any){
    return val;
}