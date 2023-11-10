import React from "react";
import './topbar.css';


export default function Topbar(){
    return (
        <div className={"topbar"}>
            <div className={"topbarWrapper"}>
                <div className={"topLeft"}>
                    <span className={"khutionlogo"}>Khution</span>
                </div>
                <div className={"topRight"}>
                    <div className = {'mainbutton'}>CHECK</div>
                    <div className = {'mainbutton'}>CHANGE</div>
                    <div className = {'mainbutton'}>SAVE</div>
                </div>
            </div>
        </div>
    )
}