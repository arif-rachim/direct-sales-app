import {Grid} from "./Grid";
import React, {CSSProperties} from "react";
import Vertical from "../layout/Vertical";
import {CellComponentStyledProps} from "./Sheet";

export interface ListCellComponentProps {
    dataItem: any,
    rowIndex: number,
    cellStyle: CSSProperties,
    dataSource: Array<any>
}

interface ListProps {
    cellComponent: React.FC<ListCellComponentProps>;
    data: Array<any>;
    defaultRowHeight?: number;
    onFocusedDataItemChange?:((newItem: any, oldItem: any) => void)
}

export function List(props: ListProps) {
    return <Grid
        columns={[{
            field: 'custom',
            title: 'Name',
            width: '100%',
            hAlign: 'left',
            cellComponent: CellComponent,
            payload: {
                Component: props.cellComponent
            }
        }]}
        data={props.data}
        rowResizerHidden={true}
        filterHidden={true} headerHidden={true}
        defaultRowHeight={props.defaultRowHeight || 80}
        onFocusedDataItemChange={props.onFocusedDataItemChange}
    />
}

function CellComponent(props: CellComponentStyledProps) {
    const {Component} = props.column.payload;
    const Comp: React.FC<ListCellComponentProps> = Component;

    return <Vertical style={{flexGrow: 1, height: '100%',...props.cellStyle}}>
        <Comp dataSource={props.dataSource} rowIndex={props.rowIndex} dataItem={props.dataItem}
              cellStyle={props.cellStyle}
        />
    </Vertical>
}