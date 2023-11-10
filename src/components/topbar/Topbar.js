import React, { useContext } from "react";
import "./topbar.css";
import axios from "axios";
import Modal2 from "../Modal2/Modal2";
import { MyContext } from "../../MyContextProvider";
import ImageUploader from "../OCR/ImageUploader";

export default function Topbar({ onEditContent, showSaveButton, onHideEditor }) {
  const {currentPageId, setCurentPageId} = useContext(MyContext);
  const { currentPageContent, setCurrentPageContent } = useContext(MyContext);

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

  const handleCheck = () => {
    // Add logic to handle 'Check' button click
    // You can set some content for the modal
    const modalContent = "This is the content of the modal.";

    // Open the modal
    setModalOpen(true);
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
      <Modal2 isOpen={isModalOpen} onClose={() => setModalOpen(false)} content="일단공백" />
    </div>
  );
}
