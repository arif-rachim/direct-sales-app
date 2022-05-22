import Vertical from "../../layout/Vertical";
import React, {createContext, CSSProperties, useCallback, useContext, useEffect} from "react";
import {IoChevronForwardOutline} from "react-icons/io5";
import Horizontal from "../../layout/Horizontal";
import {ConfigType, ShowPanelType, useSlidePanel} from "../../layout/useSlidePanel";
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
import {ObserverValue} from "react-hook-useobserver";
import {Footer} from "../component/Footer";
import {List, ListCellComponentProps} from "../../grid/List";
import {useFetch} from "./useFetch";
import {Checkbox} from "../component/Checkbox";

function CellComponent(props: ListCellComponentProps) {
    const {dataItem, dataSource, rowIndex, cellStyle} = props;
    const {$editMode} = useContext(ListContext);
    const editMode = useObserverValue($editMode);
    return <Horizontal style={{height: '100%', ...cellStyle}} vAlign={'center'}>
        <>
            {editMode && <Checkbox selected={false}/>}
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
        </>
    </Horizontal>
}

const ListContext = createContext<{ $editMode: Observer<boolean> }>({
    $editMode: {
        current: true,
        addListener: (listener: any) => () => {
        }
    }
})

interface RenderListProps {
    dataItem: any;
    dataSource: Array<any>;
    rowIndex: number,
    cellStyle: CSSProperties
}

interface ListPanelProps {
    containerDimension: { width: number, height: number },
    closePanel: (result: any) => void,
    listRenderer: (item: RenderListProps) => JSX.Element,
    title: string,
    formInputs: Array<FormInputProps>,
    entityName: string
}

function ListHeader(properties: {
    showPanel: (constructor: ShowPanelType, config?: ConfigType) => Promise<any>,
    setEditMode: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    closePanel: (val: any) => void,
    formInputs: Array<FormInputProps>,
    title: string,
    entityName: string,
    refresh : () => Promise<any>;
}) {
    return <HeaderPanel>
        <Horizontal vAlign={'center'}>
            <NavigateBackIcon onClick={() => {
                properties.closePanel(true);
            }}/>
            <SpaceFill/>
            <CreateNewIcon onClick={async () => {
                await properties.showPanel((close, containerDimension) => {
                    return <DetailPanel
                        containerDimension={containerDimension}
                        closePanel={close} formInputs={properties.formInputs}
                        title={properties.title}
                        entityId={''}
                        entityName={properties.entityName}
                    />
                }, {animation: 'bottom'});
                await properties.refresh();
            }}/>
        </Horizontal>
        <HeaderTitle title={properties.title}/>
        <SearchInput/>
        <Horizontal style={{marginTop: '0.5rem'}}>
            <TextButton label={'Edit'} onClick={async () => {
                properties.setEditMode(true);
                const result = await properties.showPanel((close, containerDimension) => {
                    return <ActionList close={close} containerDimension={containerDimension}/>
                }, {animation: 'bottom', overlayHidden: true});
                properties.setEditMode(false);
            }}/>
            <SpaceFill/>
        </Horizontal>
    </HeaderPanel>;
}

export function ListPanel(props: React.PropsWithoutRef<ListPanelProps>) {
    const {showPanel, SlidePanel} = useSlidePanel();
    const [$editMode, setEditMode] = useObserver(false);
    const fetch = useFetch(props.entityName);
    const [$listData, setListData] = useObserver([]);

    const refresh = useCallback(async function refresh(){
        const result:any = await fetch.findAll();
        setListData(result);
    },[]);

    useEffect(() => {
        refresh().then()
    }, []);
    return <SlidePanel style={{width: '100%', height: '100%'}}><Vertical style={{
        width: props.containerDimension.width,
        height: props.containerDimension.height,
        backgroundColor: '#FFF',
    }}>
        <ListHeader showPanel={showPanel} setEditMode={setEditMode} title={props.title} formInputs={props.formInputs}
                    closePanel={props.closePanel} entityName={props.entityName}
                    refresh={refresh}
        />
        <Vertical style={{height: '100%', overflow: 'auto'}}>
            <ListContext.Provider value={{$editMode}}>
                <ObserverValue observers={$listData} render={() => {
                    return <List data={$listData.current} defaultRowHeight={80} cellComponent={CellComponent}
                                 onFocusedDataItemChange={async (newItem) => {
                                     if ($editMode.current) {
                                         return;
                                     }
                                     const result = await showPanel((close, containerDimension) => {
                                         return <DetailPanel closePanel={close}
                                                             containerDimension={containerDimension}
                                                             formInputs={props.formInputs}
                                                             title={props.title} entityId={newItem.id}
                                                             entityName={props.entityName}
                                         />
                                     }, {animation: "right"});
                                     await refresh();
                                 }}
                    />
                }}/>
            </ListContext.Provider>
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