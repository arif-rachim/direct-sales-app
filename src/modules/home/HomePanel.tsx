import Vertical from "../../layout/Vertical";
import React, {useContext} from "react";
import Horizontal from "../../layout/Horizontal";
import classes from "./Home.module.css";
import {DepoPanel} from "../depo/DepoPanel";
import {OrderPanel} from "../order/OrderPanel";
import {PaymentPanel} from "../payment/PaymentPanel";
import {DeliveryPanel} from "../delivery/DeliveryPanel";
import {UserPanel} from "../user/UserPanel";
import {AppContext} from "../App";
import {HeaderTitle} from "../component/HeaderTitle";
import {HeaderPanel} from "../component/HeaderPanel";
import {Text} from "../../layout/Text";
import {ListPanel} from "../page/ListPanel";
import {ListCellComponentProps} from "../../grid/List";

function LabelCellComponent(props: ListCellComponentProps) {
    return <Vertical vAlign={'center'} style={{marginLeft: '1rem'}}>
        <Text text={props.dataItem.label}/>
    </Vertical>
}

export function HomePanel() {
    const {showPanel} = useContext(AppContext);

    return <Vertical style={{width: '100%', height: '100%'}}>
        <HeaderPanel>
            <HeaderTitle title={'Home'}/>
        </HeaderPanel>
        <Vertical style={{height: '100%'}} vAlign={'center'} hAlign={'center'}>
            <Vertical>
                <Horizontal>
                    <Vertical className={classes.icon} onClick={async () => {
                        const result = await showPanel((close, containerDimension) => {
                            return <ListPanel closePanel={close} containerDimension={containerDimension}
                                              title={'Product'}
                                              listData={[{data: 'one'}, {data: 'two'}, {data: 'two'}, {data: 'four'}]}
                                              listRenderer={(props) => {
                                                  return <Vertical>
                                                      {JSON.stringify(props.dataItem)}
                                                  </Vertical>
                                              }}
                                              formInputs={[
                                                  {field: 'code', label: 'Code', config: {}},
                                                  {field: 'name', label: 'Name', config: {}},
                                                  {field: 'description', label: 'Description', config: {}},
                                                  {field: 'group', label: 'Group', config: {}},
                                                  {field: 'price', label: 'Price', config: {numeral: true}},
                                                  {field: 'unitOfMeasurement', label: 'UoM', config: {}},
                                                  {
                                                      field: 'status',
                                                      label: 'Status',
                                                      config: {
                                                          lookup: {
                                                              fetchData: async () => [{label: 'ACTIVE'}, {label: 'INACTIVE'}],
                                                              selectionMode: 'single',
                                                              cellComponent: LabelCellComponent,
                                                              valueMapper:item => {
                                                                  return item?.label;
                                                              }
                                                          }
                                                      }
                                                  }
                                              ]}
                            />
                        }, {animation: "right"})
                    }}>
                        <Text text={'Product'}/>
                    </Vertical>
                    <Vertical className={classes.icon} onClick={async () => {
                        const result = await showPanel((close, containerDimension) => {
                            return <DepoPanel closePanel={close} containerDimension={containerDimension}/>
                        }, {animation: "right"})
                    }}>
                        <Text text={'Depo'}/>
                    </Vertical>


                </Horizontal>
                <Horizontal>
                    <Vertical className={classes.icon} onClick={async () => {
                        const result = await showPanel((close, containerDimension) => {
                            return <OrderPanel closePanel={close} containerDimension={containerDimension}/>
                        }, {animation: "right"})
                    }}>
                        <Text text={'Order'}/>
                    </Vertical>
                    <Vertical className={classes.icon} onClick={async () => {
                        const result = await showPanel((close, containerDimension) => {
                            return <PaymentPanel closePanel={close} containerDimension={containerDimension}/>
                        }, {animation: "right"})
                    }}>
                        <Text text={'Payment'}/>
                    </Vertical>

                </Horizontal>
                <Horizontal>
                    <Vertical className={classes.icon} onClick={async () => {
                        const result = await showPanel((close, containerDimension) => {
                            return <DeliveryPanel closePanel={close} containerDimension={containerDimension}/>
                        }, {animation: "right"})
                    }}>
                        <Text text={'Delivery'}/>
                    </Vertical>
                    <Vertical className={classes.icon} onClick={async () => {
                        const result = await showPanel((close, containerDimension) => {
                            return <UserPanel closePanel={close} containerDimension={containerDimension}/>
                        }, {animation: "right"})
                    }}>
                        <Text text={'User'}/>
                    </Vertical>
                </Horizontal>
            </Vertical>
        </Vertical>
    </Vertical>
}