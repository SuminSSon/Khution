import React, { useContext, useState } from "react";
import "./topbar.css";
import axios from "axios";
import Modal2 from "../Modal2/Modal2";
import { MyContext } from "../../MyContextProvider";
import ImageUploader from "../OCR/ImageUploader";

export default function Topbar({ onEditContent, showSaveButton, onHideEditor }) {
  const {currentPageId, setCurentPageId} = useContext(MyContext);
  const { currentPageContent, setCurrentPageContent } = useContext(MyContext);
  const [spellCheck, setSpellCheck] = useState('');

  const handleSave = async () => {
    try {
      // Assuming you have an API endpoint for updating page content
      const apiUrl = `http://localhost:8080/page/${currentPageId}`;

      // Prepare the data to be sent in the request body
      const requestData = {
        pageContents: currentPageContent,
      };

      // Send a POST request to update page content
      const response = await axios.post(apiUrl, requestData);

      // Log the response (you might want to handle it differently)
      console.log("Save response:", response.data);

      // onHideEditor function or any other logic after successful save
      onHideEditor();
    } catch (error) {
      console.error("Error saving content:", error);
      // Handle errors as needed
    }
  };

  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleCheck = async () => {
    console.log("내용", currentPageContent);
    try {
      // Assuming you have an API endpoint for spell checking
      const apiUrl = 'http://localhost:8080/util/spellcheck';
  
      // Prepare the data to be sent in the request body
      const requestData = {
        page_contents: currentPageContent,
      };
  
      // Send a POST request to spell check the page content
      const response = await axios.post(apiUrl, requestData);
  
      // Log the response
      console.log("Spell check response:", response.data);
      const doc = new DOMParser().parseFromString(response.data, "text/html");
      const plainText = doc.body.textContent || "";
      setSpellCheck(plainText);
      setModalOpen(true);
  
      // You can handle the response data as needed, for example, update the state
      // or display the checked contents somewhere in your UI
    } catch (error) {
      console.error("Error during spell check:", error);
      // Handle errors as needed
    }
  };


  return (
    <div className={"topbar"}>
      <div className={"topbarWrapper"}>
        <div className={"topLeft"}></div>
        <div className={"topRight"}>
          <ImageUploader/>
          {showSaveButton && (
            <div className={'mainbutton'} onClick={() => handleSave()}>
              Save
            </div>
          )}
          <div className={'mainbutton'} onClick={() => onEditContent()}>
            Edit
          </div>
          <div className={'mainbutton'} onClick={() => handleCheck()}>CHECK</div>
        </div>
      </div>
      <Modal2 isOpen={isModalOpen} onClose={() => setModalOpen(false)} content={spellCheck} />
    </div>
  );
}
