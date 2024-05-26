import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Splash.css'; // CSS 파일 임포트

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); // 지정된 경로로 이동
    }, 9000); // 11초 후 이동 (이미지와 텍스트 애니메이션이 모두 끝난 후)

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <img src={`${process.env.PUBLIC_URL}/KakaoTalk_20240521_193733793.png`} alt="Splash Logo" className="splash-image" />
      <div className="information-security">Information Security</div>
    </div>
  );
};

export default Splash;
