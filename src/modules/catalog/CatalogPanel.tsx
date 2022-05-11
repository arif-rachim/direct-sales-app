import Vertical from "../../layout/Vertical";
import React from "react";
import {IoCreateOutline, IoArrowBackCircleOutline} from "react-icons/io5";
import Horizontal from "../../layout/Horizontal";
import {Grid} from "../../grid/Grid";
import classes from "./CatalogPanel.module.css";
import {CellComponentStyledProps} from "../../grid/Sheet";
import {useSlidePanel} from "../../layout/useSlidePanel";
import {CatalogDetailPanel} from "./CatalogDetailPanel";

function CellComponent(props: CellComponentStyledProps) {
    return <Horizontal style={{height: '100%', ...props.cellStyle}} vAlign={'center'}>
        <Vertical style={{borderRadius: '10rem', border: '1px solid #ccc', width: '3rem', height: '3rem',flexShrink:0,marginLeft:'1rem'}}/>
        <Vertical style={{flexGrow: 1, marginLeft: '1rem', height: '100%',paddingTop:'0.7rem'}}>
            <Vertical style={{fontSize:'1.1rem',fontWeight:'bold'}}>Chicken 200mg</Vertical>
            <Vertical style={{fontSize: '1rem'}}>Superfresh chichken directly delivered from Farm.
                Super discount price</Vertical>
        </Vertical>
    </Horizontal>
}

export function CatalogPanel(props: { containerDimension: { width: number, height: number }, closePanel: (result: any) => void }) {
    const {showPanel,SlidePanel} = useSlidePanel({animation:"DOWN_UP"})
    return <SlidePanel><Vertical style={{
        width: props.containerDimension.width,
        height: props.containerDimension.height,
        backgroundColor: '#FFF',

    }}>
        <Vertical style={{padding:'1rem',paddingBottom:'0.5rem'}}>
            <Horizontal vAlign={'center'} style={{position: 'relative'}}>
                <Vertical style={{fontSize: '2rem', cursor: 'pointer'}}
                          onClick={() => {
                              props.closePanel(true);
                          }}><IoArrowBackCircleOutline/></Vertical>
                <Vertical style={{flexGrow:1}}/>
                <Horizontal vAlign={'center'}
                            style={{fontSize: '2rem'}} onClick={() => {
                    const result = showPanel((close,containerDimension) => {
                        return <CatalogDetailPanel close={close} containerDimension={containerDimension} />
                    });
                }}>
                    <IoCreateOutline/>
                </Horizontal>
            </Horizontal>
            <Vertical style={{fontSize:'2rem',marginTop:'0.2rem',marginBottom:'0.2rem',fontWeight:'bold'}}>Catalog</Vertical>
            <input type="search" className={classes.search}/>
            <Horizontal style={{marginTop:'0.5rem'}} >
                <Vertical style={{fontSize:'1.2rem',color:'blue'}}>
                    Edit
                </Vertical>
                <Vertical style={{flexGrow:1}}/>
            </Horizontal>
        </Vertical>

        <Vertical style={{height: '100%',overflow:'auto', borderTop:'1px solid #ccc'}}>
            <Grid
                columns={[{
                    field: 'custom',
                    title: 'Name',
                    width: '100%',
                    hAlign: 'left',
                    cellComponent: CellComponent
                }]}
                data={[{name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}, {name: 'Arif'}]}
                rowResizerHidden={true} filterHidden={true} headerHidden={true}
                defaultRowHeight={80}
            />
        </Vertical>
    </Vertical>
    </SlidePanel>
}
