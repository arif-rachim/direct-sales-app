import React, {createContext, useContext} from "react";
import {CleaveOptions} from "cleave.js/options";
import {FormContext, Input, ValidatorType} from "../../layout/useForm";
import {useObserverValue} from "react-hook-useobserver";
import Vertical from "../../layout/Vertical";
import Horizontal from "../../layout/Horizontal";
import classes from "../product/ProductPanel.module.css";
import {Text} from "../../layout/Text";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import './LabelInput.css';

export const InputContext = createContext<{ labelWidth: number | string }>({labelWidth: '7rem'});

interface LabelInputProps {
    label: string,
    field: string,
    options?: CleaveOptions,
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined;
    validator? : ValidatorType
}

export function LabelInput(props: LabelInputProps) {
    const {labelWidth} = useContext(InputContext);
    const formContext = useContext(FormContext);

    const err: any = useObserverValue(formContext.$errors, (errors: any) => {
        const err: Map<string, Array<string>> = errors;
        if (err) {
            return err.get(props.field) || [];
        }
        return [];
    });

    const errors: Array<string> = err;

    return <Vertical>
        <Horizontal style={{padding: '0rem 0rem', borderBottom: '1px solid #ccc'}} vAlign={'center'}>
            <Horizontal style={{width: labelWidth, flexShrink: 0, marginBottom: '0.1rem'}} vAlign={'center'}
                        className={classes.label}>
                <Text style={{flexGrow: 1, flexShrink: 0}} text={props.label}/>
                <Text text={':'}/>
            </Horizontal>
            <Input className={classes.input} field={props.field} options={props.options || {}}
                   inputMode={props.inputMode} validator={props.validator}/>
        </Horizontal>
        <Vertical hAlign={'right'}>
            <TransitionGroup>
                {errors.map((error) => {
                    return <CSSTransition key={error} classNames={'errorText'} timeout={500}>
                        <Text text={error} style={{color: 'red'}} key={error} />
                    </CSSTransition>
                })}
            </TransitionGroup>
        </Vertical>
    </Vertical>;
}