import './Modal2.css'; // You'll need to create a corresponding CSS file for styling
import axios from 'axios';
import React, { useContext, useState } from "react";
import { MyContext } from "../../MyContextProvider";

const Modal2 = ({ isOpen, onClose, content }) => {
  const {currentPageId, setCurentPageId} = useContext(MyContext);
  const { currentPageContent, setCurrentPageContent } = useContext(MyContext);
  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      // Assuming you have an API endpoint for updating page content
      const apiUrl = `http://localhost:8080/page/${currentPageId}`;

      // Prepare the data to be sent in the request body
      const requestData = {
        pageContents: content,
      };

      // Send a POST request to update page content
      const response = await axios.post(apiUrl, requestData);

      // Log the response (you might want to handle it differently)
      console.log("Save response:", response.data);
      setCurrentPageContent(content);

      // onHideEditor function or any other logic after successful save
      onClose();
    } catch (error) {
      console.error("Error saving content:", error);
      // Handle errors as needed
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className='modal2-title'> 검사된 내용 </div>
        <div className='modal2-content'>{content}</div>
        <button className='spell-button' onClick={handleSave}> 내용수정 </button>
      </div>
      
    </div>
  );
};

export default Modal2;
