import Vertical from "../../layout/Vertical";
import React, {createContext, useContext} from "react";
import {IoChevronForwardOutline} from "react-icons/io5";
import Horizontal from "../../layout/Horizontal";
import {Grid} from "../../grid/Grid";
import {CellComponentStyledProps} from "../../grid/Sheet";
import {useSlidePanel} from "../../layout/useSlidePanel";
import {NewProductPanel} from "./NewProductPanel";
import {HeaderTitle} from "../component/HeaderTitle";
import {HeaderPanel} from "../component/HeaderPanel";
import {ProductDetailPanel} from "./ProductDetailPanel";
import {NavigateBackIcon} from "../component/NavigateBackIcon";
import {SpaceFill} from "../component/SpaceFill";
import {CreateNewIcon} from "../component/CreateNewIcon";
import {SearchInput} from "../component/SearchInput";
import {TextButton} from "../component/TextButton";
import {useObserver, useObserverValue} from "react-hook-useobserver/lib";
import {Observer} from "react-hook-useobserver/lib/useObserver";
import {Footer} from "../component/Footer";
import {Text} from "../../layout/Text";


function CellComponent(props: CellComponentStyledProps) {
    const {$editMode} = useContext(GridContext);
    const editMode = useObserverValue($editMode);
    return <Horizontal style={{height: '100%', ...props.cellStyle}} vAlign={'center'}>
        <>
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
            <Text style={{fontSize: '1.1rem', fontWeight: 'bold'}} text={'Aircraft Tail 2601'}/>
            <Text style={{fontSize: '0.9rem'}} text={'Double wing bladed aircraft, Specializing in combat Ready mission'}/>
        </Vertical>
        <Vertical style={{marginRight: '0.5rem', color: '#888',display:editMode?'none':'flex'}}>
            <IoChevronForwardOutline/>
        </Vertical>
        </>
    </Horizontal>
}

const gridData = [{name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}];
const GridContext = createContext<{ $editMode: Observer<boolean> }>({
    $editMode: {
        current: true,
        addListener: (listener: any) => () => {
        }
    }
})

export function ProductListPanel(props: { containerDimension: { width: number, height: number }, closePanel: (result: any) => void }) {
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
                    const result = await showPanel((close, containerDimension) => {
                        return <NewProductPanel close={close} containerDimension={containerDimension}/>
                    }, {animation: "bottom"});
                }}/>
            </Horizontal>
            <HeaderTitle title={'Product'}/>
            <SearchInput/>
            <Horizontal style={{marginTop: '0.5rem'}}>
                <TextButton label={'Edit'} onClick={async () => {
                    setEditMode(true);
                    const result = await showPanel((close,containerDimension) => {
                        return <ActionList close={close} containerDimension={containerDimension} />
                    },{animation:'bottom',overlayHidden:true});
                    setEditMode(false);
                }}/>
                <SpaceFill/>
            </Horizontal>
        </HeaderPanel>

        <Vertical style={{height: '100%', overflow: 'auto'}}>
            <GridContext.Provider value={{$editMode}}>
                <Grid
                    columns={[{
                        field: 'custom',
                        title: 'Name',
                        width: '100%',
                        hAlign: 'left',
                        cellComponent: CellComponent
                    }]}
                    data={gridData}
                    rowResizerHidden={true} filterHidden={true} headerHidden={true}
                    onFocusedDataItemChange={async (newItem) => {
                        if($editMode.current){
                            return;
                        }
                        const result = await showPanel((close, containerDimension) => {
                            return <ProductDetailPanel closePanel={close}
                                                       containerDimension={containerDimension}/>
                        }, {animation: "right"})
                    }}
                    defaultRowHeight={80}
                />
            </GridContext.Provider>
        </Vertical>
    </Vertical>
    </SlidePanel>
}



function ActionList(props:{close:(result:any) =>void,containerDimension:{width:number;height:number}}){
    return <Footer style={{padding:'0.5rem 1rem'}}>
        <SpaceFill/>
        <TextButton label={'Delete'} promoted={true} onClick={() => props.close(true)}/>
    </Footer>
}