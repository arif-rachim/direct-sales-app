import Vertical from "../../layout/Vertical";
import React from "react";
import {Footer} from "./Footer";
import {Text} from "../../layout/Text";

export interface FooterItem {
    icon: Function;
    iconSelected: Function;
    label: string,
    panel: Function
}

export function TabFooter(props: { selectedItem?: FooterItem, data: Array<FooterItem>, onSelectedItemChange: (item: FooterItem) => void }) {
    return <Footer>
        {props.data.map(data => {
            const isSelected = props.selectedItem === data;
            return <Vertical style={{
                fontSize: '1.5rem',
                padding: '0.5rem',
                flexGrow: 1,
                cursor: 'pointer',
                color: isSelected ? 'blue' : 'black'
            }}
                             hAlign={'center'} key={data.label} onClick={() => {
                props.onSelectedItemChange(data);
            }}>
                {isSelected ? <data.iconSelected/> : <data.icon/>}
                <Text style={{fontSize: '0.8rem'}} text={data.label}/>
            </Vertical>
        })}
    </Footer>
}