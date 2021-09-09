import React, { useState } from "react";
import Modal from "react-modal";

function FilterModal({ label, filters }) {
  // Functional modal component for additional filters

  // Show / hide modal
  const [show, setShow] = useState(false);

  function handleOpen() {
    // Function for opening modal
    setShow(true);
  }

  function handleClose() {
    // Function for closing modal
    setShow(false);
  }

  return (
    <div>
      <button onClick={handleOpen}>More {label}</button>
      <Modal isOpen={show} onRequestClose={handleClose} ariaHideApp={false}>
        <div>
          <button onClick={handleClose} className="close-modal">
            X
          </button>
          <div className="modal-content">{filters}</div>
        </div>
      </Modal>
    </div>
  );
}

export default FilterModal;
