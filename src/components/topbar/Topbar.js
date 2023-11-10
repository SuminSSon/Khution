import React from "react";
import './topbar.css';

export default function Topbar({ onEditContent, showSaveButton, onHideEditor }) {
  return (
    <div className={"topbar"}>
      <div className={"topbarWrapper"}>
        <div className={"topLeft"}></div>
        <div className={"topRight"}>
        <div className = {'mainbutton'}>CHECK</div>
          <div className={'mainbutton'} onClick={onEditContent}>
            Edit
          </div>
          {showSaveButton && (
            <div className={'mainbutton'} onClick={onHideEditor}>
              Save
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
