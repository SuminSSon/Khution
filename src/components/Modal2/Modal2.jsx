import React from 'react';
import './Modal2.css'; // You'll need to create a corresponding CSS file for styling

const Modal2 = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal2;
