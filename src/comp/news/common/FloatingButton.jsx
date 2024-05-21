import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa'; // 플러스 아이콘과 닫기 아이콘을 가져옵니다.
import './FloatingButton.css';

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleWriteClick = () => {
    navigate('/write');
  };

  return (
    <div className="floating-button-container">
      <button className="floating-button main-button" onClick={toggleOpen}>
        {isOpen ? <FaTimes color="white" size="24" /> : <FaPlus color="white" size="24" />}
      </button>
      <div className={`floating-buttons ${isOpen ? 'open' : ''}`}>
        <button className="floating-button" onClick={handleWriteClick}>
          글쓰기
        </button>
        {/* 다른 버튼들도 추가할 수 있습니다 */}
      </div>
    </div>
  );
};

export default FloatingButton;
