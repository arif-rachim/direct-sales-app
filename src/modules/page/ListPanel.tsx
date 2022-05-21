import Vertical from "../../layout/Vertical";
import React, {createContext, CSSProperties, useContext} from "react";
import {IoChevronForwardOutline} from "react-icons/io5";
import Horizontal from "../../layout/Horizontal";
import {useSlidePanel} from "../../layout/useSlidePanel";
import {HeaderTitle} from "../component/HeaderTitle";
import {HeaderPanel} from "../component/HeaderPanel";
import {DetailPanel, FormInputProps} from "./DetailPanel";
import {NavigateBackIcon} from "../component/NavigateBackIcon";
import {SpaceFill} from "../component/SpaceFill";
import {CreateNewIcon} from "../component/CreateNewIcon";
import {SearchInput} from "../component/SearchInput";
import {TextButton} from "../component/TextButton";
import {useObserver, useObserverValue} from "react-hook-useobserver/lib";
import {Observer} from "react-hook-useobserver/lib/useObserver";
import {Footer} from "../component/Footer";
import {List, ListCellComponentProps} from "../../grid/List";

function CellComponent(props: ListCellComponentProps) {
    const {dataItem,dataSource,rowIndex,cellStyle} = props;
    const {$editMode} = useContext(GridContext);
    const editMode = useObserverValue($editMode);
    return <Horizontal style={{height: '100%', ...cellStyle}} vAlign={'center'}>
        {editMode && <input type={'checkbox'}/>}
        <Vertical style={{
            borderRadius: '10rem',
            border: '1px solid #ccc',
            width: '3rem',
            height: '3rem',
            flexShrink: 0,
            marginLeft: '1rem'
        }}/>
        <Vertical style={{flexGrow: 1, marginLeft: '1rem', height: '100%', paddingTop: '0.7rem'}}>
            Detail Panel
        </Vertical>
        <Vertical style={{marginRight: '0.5rem', color: '#888', display: editMode ? 'none' : 'flex'}}>
            <IoChevronForwardOutline/>
        </Vertical>
    </Horizontal>
}

const GridContext = createContext<{ $editMode: Observer<boolean> }>({
    $editMode: {
        current: true,
        addListener: (listener: any) => () => {
        }
    }
})

interface RenderListProps{
    dataItem : any;
    dataSource : Array<any>;
    rowIndex : number,
    cellStyle : CSSProperties
}

interface ListPanelProps {
    containerDimension: { width: number, height: number },
    closePanel: (result: any) => void,
    listRenderer : (item:RenderListProps) => JSX.Element,
    listData : Array<any>,
    title : string,
    formInputs : Array<FormInputProps>
}

export function ListPanel(props: React.PropsWithoutRef<ListPanelProps>) {
    const {showPanel, SlidePanel} = useSlidePanel();
    const [$editMode, setEditMode] = useObserver(false);
    return <SlidePanel style={{width: '100%', height: '100%'}}><Vertical style={{
        width: props.containerDimension.width,
        height: props.containerDimension.height,
        backgroundColor: '#FFF',
    }}>
        <HeaderPanel>
            <Horizontal vAlign={'center'}>
                <NavigateBackIcon onClick={() => {
                    props.closePanel(true);
                }}/>
                <SpaceFill/>
                <CreateNewIcon onClick={async () => {

                }}/>
            </Horizontal>
            <HeaderTitle title={props.title}/>
            <SearchInput/>
            <Horizontal style={{marginTop: '0.5rem'}}>
                <TextButton label={'Edit'} onClick={async () => {
                    setEditMode(true);
                    const result = await showPanel((close, containerDimension) => {
                        return <ActionList close={close} containerDimension={containerDimension}/>
                    }, {animation: 'bottom', overlayHidden: true});
                    setEditMode(false);
                }}/>
                <SpaceFill/>
            </Horizontal>
        </HeaderPanel>
        <Vertical style={{height: '100%', overflow: 'auto'}}>
            <GridContext.Provider value={{$editMode}}>
            <List data={props.listData} defaultRowHeight={80} cellComponent={CellComponent}
                      onFocusedDataItemChange={async (newItem) => {
                          if ($editMode.current) {
                              return;
                          }
                          const result = await showPanel((close, containerDimension) => {
                              return <DetailPanel closePanel={close}
                                                  containerDimension={containerDimension} formInputs={props.formInputs}/>
                          }, {animation: "right"})
                      }}
            />
            </GridContext.Provider>
        </Vertical>
    </Vertical>
    </SlidePanel>
}


function ActionList(props: { close: (result: any) => void, containerDimension: { width: number; height: number } }) {
    return <Footer style={{padding: '0.5rem 1rem'}}>
        <SpaceFill/>
        <TextButton label={'Delete'} promoted={true} onClick={() => props.close(true)}/>
    </Footer>
}