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
    lookup?: LookupProps
}


export function LabelInput(props: LabelInputProps) {

    const errors: Array<string> = useFieldErrors(props.field);
    const {$state, setState} = useContext(FormContext);
    const value = useObserverValue($state, () => {
        const state = $state.current;
        if (props.field in state) {
            return state[props.field];
        }
        return undefined;
    });
    const [$lookupData, setLookupData] = useObserver<Array<any>>([]);
    const config = props.config;
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
    const fetchData = config?.lookup?.fetchData;
    useEffect(() => {
        if (fetchData) {
            (async () => {
                const lookupData = await fetchData();
                setLookupData(lookupData);
            })();
        }
    }, [fetchData]);

    async function onFocusListener() {
        if (config.lookup) {
            if (props.showPanel === undefined) {
                throw new Error('LabelInput properties require showPanel since it was using lookup config');
            }
            const {selectionMode, cellComponent} = config.lookup;
            const result = await props.showPanel((close, containerDimension) => {
                return <LookupPanel data={$lookupData.current} close={close} containerDimension={containerDimension}
                                    keySelector={(item) => item} selectedItems={[]} selectionMode={selectionMode}
                                    cellComponent={cellComponent}/>
            }, {animation: 'bottom'});
            if (result?.status !== 'cancel') {
                setState((state: any) => {
                    return {...state, [props.field]: result}
                });
            }
        }
    }
    const onChange = useCallback(event => {
        setState((state: any) => {
            return {...state, [props.field]: event.target.value}
        });
    }, []);
    let valueMapper = (val:string) => val;
    if(config.lookup){
        valueMapper = config.lookup.valueMapper
    }

    return <LabelWrapper errors={errors} label={props.label}>
        <Input className={classes.input} field={props.field} options={props.config}
               inputMode={inputMode} validator={props?.config?.validator || emptyValidator} onFocus={onFocusListener}
               value={value} onChange={onChange}
               valueMapper={valueMapper}
        />
    </LabelWrapper>
}

function emptyValidator() {
    return [];
}