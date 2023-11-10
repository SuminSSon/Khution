// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {content}
      </div>
    </div>
  );
};

export default Modal;
