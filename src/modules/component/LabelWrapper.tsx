import Vertical from "../../layout/Vertical";
import Horizontal from "../../layout/Horizontal";
import classes from "../product/ProductPanel.module.css";
import {Text} from "../../layout/Text";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import React, {useContext} from "react";
import {InputContext} from "./LabelInput";


export function LabelWrapper({errors,children,label} : React.PropsWithChildren<{errors:Array<string>,label:string}>){
    const {labelWidth} = useContext(InputContext);
    const hasErrors = errors && errors.length > 0;
    return <Vertical>
        <Horizontal style={{padding: '0rem 0rem', borderBottom: '1px solid #ccc'}} vAlign={'center'}>
            <Horizontal style={{width: labelWidth, flexShrink: 0, marginBottom: '0.1rem',color:hasErrors ? 'red':'black'}} vAlign={'center'}
                        className={classes.label} >
                <Text style={{flexGrow: 1, flexShrink: 0}} text={label}/>
                <Text text={':'}/>
            </Horizontal>
            {children}
        </Horizontal>
        <Vertical hAlign={'right'}>
            <TransitionGroup>
                {errors.map((error) => {
                    return <CSSTransition key={error} classNames={'errorText'} timeout={500}>
                        <Text text={error} style={{color: 'red',fontSize:'0.9rem'}} key={error} />
                    </CSSTransition>
                })}
            </TransitionGroup>
        </Vertical>
    </Vertical>
}