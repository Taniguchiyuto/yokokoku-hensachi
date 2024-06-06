import React from "react";
import "./Modal.css";

function Modal({ isOpen, closeModal, name, introduction }) {
  if (isOpen) {
    // isOpen プロパティが true の場合にモーダルを表示
    return (
      <div className="modal">
        <div className="modal-inner">
          <h2>{name}</h2>
          <p>{introduction}</p>
          <button onClick={closeModal} className="modal-close-btn">
            とじる
          </button>
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default Modal;
