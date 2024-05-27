import React, { useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import logo from '../../assets/img/KakaoTalk_20240521_193733793.png'; // 이미지 경로

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    console.log("로그아웃 버튼 클릭");
    dispatch(logoutUser());
    navigate("/");
  };

  const goToSign = () => {
    navigate("/signin");
  };

  const goToLogIn = () => {
    navigate("/login");
  };

  const goToUserPage = () => {
    navigate("/userpage");
  };

  const goToCtf = () => {
    window.location.href = "http://pay1oad.com:50001/";
  };

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <div className="header">
      <div className="left-wrapper">
        <div className="logo" onClick={goToHome}> {/* 로고 클릭 시 홈으로 이동 */}
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <div className="text-css" onClick={() => navigate("/board")}>Club News</div>
        <div className="text-css">Security News</div>
        <div className="text-css" onClick={goToCtf}>CTF</div>
      </div>
      <div className="right-wrapper">
        {isLoggedIn ? (
          <>
            <div className="text-css" onClick={goToUserPage}>{user.username} 님</div>
            <button className="button" onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <div className="text-css" onClick={goToSign}>Sign UP</div>
            <div className="text-css" onClick={goToLogIn}>LOG IN</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
