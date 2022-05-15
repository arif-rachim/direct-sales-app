import Vertical from "../../../layout/Vertical";
import React, {useContext} from "react";
import Horizontal from "../../../layout/Horizontal";
import classes from "../Home.module.css";
import {ProductListPanel} from "../../product/ProductListPanel";
import {DepoPanel} from "../../depo/DepoPanel";
import {OrderPanel} from "../../order/OrderPanel";
import {PaymentPanel} from "../../payment/PaymentPanel";
import {DeliveryPanel} from "../../delivery/DeliveryPanel";
import {UserPanel} from "../../user/UserPanel";
import {AppContext} from "../Home";
import {HeaderTitle} from "../../component/HeaderTitle";
import {HeaderPanel} from "../../component/HeaderPanel";

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
                            return <ProductListPanel closePanel={close} containerDimension={containerDimension}/>
                        }, {animation: "right"})
                    }}>
                        Product
                    </Vertical>
                    <Vertical className={classes.icon} onClick={async () => {
                        const result = await showPanel((close, containerDimension) => {
                            return <DepoPanel closePanel={close} containerDimension={containerDimension}/>
                        }, {animation: "right"})
                    }}>
                        Depo
                    </Vertical>


                </Horizontal>
                <Horizontal>
                    <Vertical className={classes.icon} onClick={async () => {
                        const result = await showPanel((close, containerDimension) => {
                            return <OrderPanel closePanel={close} containerDimension={containerDimension}/>
                        }, {animation: "right"})
                    }}>
                        Order
                    </Vertical>
                    <Vertical className={classes.icon} onClick={async () => {
                        const result = await showPanel((close, containerDimension) => {
                            return <PaymentPanel closePanel={close} containerDimension={containerDimension}/>
                        }, {animation: "right"})
                    }}>
                        Payment
                    </Vertical>

                </Horizontal>
                <Horizontal>
                    <Vertical className={classes.icon} onClick={async () => {
                        const result = await showPanel((close, containerDimension) => {
                            return <DeliveryPanel closePanel={close} containerDimension={containerDimension}/>
                        }, {animation: "right"})
                    }}>
                        Delivery
                    </Vertical>
                    <Vertical className={classes.icon} onClick={async () => {
                        const result = await showPanel((close, containerDimension) => {
                            return <UserPanel closePanel={close} containerDimension={containerDimension}/>
                        }, {animation: "right"})
                    }}>
                        User
                    </Vertical>
                </Horizontal>
            </Vertical>
        </Vertical>
    </Vertical>
}