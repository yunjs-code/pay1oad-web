import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  max-height: 80%;
  overflow-y: auto;
`;
const Box = styled.div`
  background-color: #ffffff;
  height: 600px;
  width: 500px;
  border-radius: 30px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 700px) {
    height: 500px;
    width: 350px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

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
