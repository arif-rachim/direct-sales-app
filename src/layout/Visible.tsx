import React from "react";
export function Visible(props:React.PropsWithChildren<{visible:boolean|unknown}>){
    if(props.visible){
        return <>{props.children}</>;
    }
    return <></>;
}