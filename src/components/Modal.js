import React from 'react';
import "./Modal.css"

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
      <div className="backdrop" onClick={onClose}></div>
    </div>
  );
};

export default Modal;