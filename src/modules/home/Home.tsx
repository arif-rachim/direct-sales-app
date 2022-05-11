import Vertical from "../../layout/Vertical";
import React from "react";
import Horizontal from "../../layout/Horizontal";
import classes from "./Home.module.css";
import {useSlidePanel} from "../../layout/useSlidePanel";
import {CatalogPanel} from "../catalog/CatalogPanel";
import {DepoPanel} from "../depo/DepoPanel";
import {OrderPanel} from "../order/OrderPanel";
import {PaymentPanel} from "../payment/PaymentPanel";
import {DeliveryPanel} from "../delivery/DeliveryPanel";
import {UserPanel} from "../user/UserPanel";

export default function Home() {
    const {showPanel, SlidePanel} = useSlidePanel({animation: "LEFT_RIGHT"});
    return <SlidePanel style={{width: '100%', height: '100%'}}><Vertical
        style={{width: '100%', height: '100%', backgroundColor: '#EFEFEF'}} vAlign={'center'}
        hAlign={'center'}>
        <Vertical style={{position: 'absolute', top: 0, left: '1rem'}}>
            <h1>Direct Sales App</h1>
        </Vertical>
        <Vertical>
            <Horizontal>
                <Vertical className={classes.icon} onClick={() => {
                    const result = showPanel((close, containerDimension) => {
                        return <CatalogPanel closePanel={close} containerDimension={containerDimension}/>
                    })
                }}>
                    Catalog
                </Vertical>
                <Vertical className={classes.icon} onClick={() => {
                    const result = showPanel((close, containerDimension) => {
                        return <DepoPanel closePanel={close} containerDimension={containerDimension}/>
                    })
                }}>
                    Depo
                </Vertical>

                <Vertical className={classes.icon} onClick={() => {
                    const result = showPanel((close, containerDimension) => {
                        return <OrderPanel closePanel={close} containerDimension={containerDimension}/>
                    })
                }}>
                    Order
                </Vertical>


            </Horizontal>
            <Horizontal>
                <Vertical className={classes.icon} onClick={() => {
                    const result = showPanel((close, containerDimension) => {
                        return <PaymentPanel closePanel={close} containerDimension={containerDimension}/>
                    })
                }}>
                    Payment
                </Vertical>
                <Vertical className={classes.icon} onClick={() => {
                    const result = showPanel((close, containerDimension) => {
                        return <DeliveryPanel closePanel={close} containerDimension={containerDimension}/>
                    })
                }}>
                    Delivery
                </Vertical>
                <Vertical className={classes.icon} onClick={() => {
                    const result = showPanel((close, containerDimension) => {
                        return <UserPanel closePanel={close} containerDimension={containerDimension}/>
                    })
                }}>
                    User
                </Vertical>

            </Horizontal>
        </Vertical>
    </Vertical>
    </SlidePanel>

}