import React, {createContext, useContext, useState} from "react";
import Vertical from "../../layout/Vertical";
import {List, ListCellComponentProps} from "../../grid/List";
import {Footer} from "./Footer";
import {TextButton} from "./TextButton";
import {SpaceFill} from "./SpaceFill";
import {Dispatch, emptyObserver, emptySetObserver, SetObserverAction, useObserver} from "react-hook-useobserver/lib";
import {Observer} from "react-hook-useobserver/lib/useObserver";
import Horizontal from "../../layout/Horizontal";
import {Checkbox} from "./Checkbox";
import {useObserverListener} from "react-hook-useobserver";
import {config} from "react-transition-group";

interface LookupPanelInterface {
    data: Array<any>,
    selectedItems: Array<any>,
    keySelector: (item: any) => string,
    close: (result: any) => void,
    containerDimension: { width: number, height: number },
    selectionMode: 'single' | 'multiple',
    cellComponent: React.FC<ListCellComponentProps>
}

interface LookupContextProps {
    selectionMode: 'single' | 'multiple',
    $selectedItems: Observer<Array<any>>,
    setSelectedItems: Dispatch<SetObserverAction<Array<any>>>,
    cellComponent: React.FC<ListCellComponentProps>
}

function EmptyComponent(props: ListCellComponentProps) {
    return <></>
}

const LookupContext = createContext<LookupContextProps>({
    selectionMode: "single",
    $selectedItems: emptyObserver,
    setSelectedItems: emptySetObserver,
    cellComponent: EmptyComponent
});

export function LookupPanel(props: React.PropsWithChildren<LookupPanelInterface>) {
    const [$selectedItems, setSelectedItems] = useObserver<Array<any>>([]);
    const selectionMode = props.selectionMode;
    return <Vertical style={{borderTop: '1px solid rgba(0,0,0,0.1)'}}>
        <LookupContext.Provider value={{
            $selectedItems,
            setSelectedItems,
            selectionMode: props.selectionMode,
            cellComponent: props.cellComponent
        }}>
            <List data={props.data} cellComponent={CellComponent} defaultRowHeight={50}/>
        </LookupContext.Provider>
        <Footer style={{padding: '0.5rem 1rem'}}>
            <TextButton label={'Cancel'} onClick={() => props.close({status: 'cancel'})}/>
            <SpaceFill/>
            <TextButton label={'Save'} promoted={true} onClick={() => {
                const selectedItems = $selectedItems.current
                if(selectedItems === undefined || selectedItems === null || selectedItems.length === 0){
                    props.close(undefined);
                }
                if(selectionMode === 'single'){
                    props.close($selectedItems.current[0]);
                }
                props.close($selectedItems.current)
            }}/>
        </Footer>
    </Vertical>
}


function CellComponent(props: ListCellComponentProps) {
    const context = useContext(LookupContext);
    const {$selectedItems, setSelectedItems} = context;
    const Comp = context.cellComponent;
    return <Horizontal onClick={() => {
        setSelectedItems(oldVal => {
            const isInclude = oldVal.includes(props.dataItem);
            if (isInclude) {
                return oldVal.filter(oldItem => oldItem !== props.dataItem);
            }
            if (context.selectionMode === 'single') {
                return [props.dataItem];
            }
            return [...oldVal, props.dataItem];
        })
    }}>
        <CheckboxComponent $selectedItems={$selectedItems} rowItem={props.dataItem}/>
        <Comp dataItem={props.dataItem} rowIndex={props.rowIndex} cellStyle={props.cellStyle}
              dataSource={props.dataSource}/>
    </Horizontal>
}

function CheckboxComponent(props: React.PropsWithoutRef<{ $selectedItems: Observer<Array<any>>, rowItem: any }>) {
    const [selected, setSelected] = useState((props.$selectedItems.current || []).includes(props.rowItem));
    useObserverListener(props.$selectedItems, () => {
        setSelected(props.$selectedItems.current.includes(props.rowItem));
    })
    return <Checkbox selected={selected}/>
}
