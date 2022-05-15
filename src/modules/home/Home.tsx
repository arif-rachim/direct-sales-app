import Vertical from "../../layout/Vertical";
import React, {createContext, useState} from "react";
import {ShowPanelCallback, useSlidePanel} from "../../layout/useSlidePanel";
import {TabFooter, FooterItem} from "../component/TabFooter";
import {
    IoBagCheck,
    IoBagCheckOutline,
    IoBook,
    IoBookOutline,
    IoHome,
    IoHomeOutline,
    IoSettings,
    IoSettingsOutline
} from "react-icons/io5";
import {HomePanel} from "./tab-panel/HomePanel";
import {CheckOutPanel} from "./tab-panel/CheckOutPanel";
import {OrderHistoryPanel} from "./tab-panel/OrderHistoryPanel";
import {SettingsPanel} from "./tab-panel/SettingsPanel";

const tabData: Array<FooterItem> = [
    {
        icon: IoHomeOutline,
        iconSelected: IoHome,
        panel: HomePanel,
        label: 'Home'
    },
    {
        icon: IoBagCheckOutline,
        iconSelected: IoBagCheck,
        panel: CheckOutPanel,
        label: 'Checkout'
    },
    {
        icon: IoBookOutline,
        iconSelected: IoBook,
        panel: OrderHistoryPanel,
        label: 'Book'
    },
    {
        icon: IoSettingsOutline,
        iconSelected: IoSettings,
        panel: SettingsPanel,
        label: 'Settings'
    }
];


export const AppContext = createContext<{ showPanel: ShowPanelCallback }>({showPanel: constructor => Promise.resolve()});
export default function Home() {

    const {showPanel, SlidePanel} = useSlidePanel();
    const [selectedFooterItem, setSelectedFooterItem] = useState<FooterItem>(tabData[0]);

    return <SlidePanel style={{width: '100%', height: '100%'}}>
        <AppContext.Provider value={{showPanel}}>
            <Vertical style={{width: '100%', height: '100%', backgroundColor: '#EFEFEF'}}>
                {tabData.map(data => {
                    const isSelected = selectedFooterItem === data;
                    return <Vertical key={data.label} style={{height: '100%', display: isSelected ? 'flex' : 'none'}}>
                        <data.panel/>
                    </Vertical>
                })}
            </Vertical>
            <TabFooter selectedItem={selectedFooterItem} data={tabData} onSelectedItemChange={(item) => {
                setSelectedFooterItem(item);
            }}/>
        </AppContext.Provider>
    </SlidePanel>
}

