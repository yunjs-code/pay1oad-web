// Modal.jsx

import React from "react";
import "./ModalComp.css";

const Modal = ({ onClose, children }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <ModalContainer onClick={handleClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>닫기</CloseButton>
        <Box>{children}</Box>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default Modal;
