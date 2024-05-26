import React, { useState, useEffect } from "react";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loggedIn = location.state?.loggedIn || false;
    if (loggedIn) {
      setLoginSuccess(true);
      const usernameFromState = location.state?.username || "";
      setUserName(usernameFromState);
    } else {
      setLoginSuccess(false);
      setUserName("");
    }
  }, [location.state]);

  const handleLogout = () => {
    console.log("로그아웃 버튼 클릭");
    dispatch(logoutUser());
    setLoginSuccess(false);
    setUserName("");
    navigate("/");
  };

  const goToSign = () => {
    navigate("/signin");
  };

  const goToLogIn = () => {
    navigate("/login");
  };

  const goToClubNews = () => {
    navigate("/board", { state: { loggedIn: true, username: userName } });
  };

  const goToUserPage = () => {
    navigate("/userpage", { state: { loggedIn: true, username: userName } });
  };

  const goToCtf = () => {
    window.location.href = "http://pay1oad.com:50001/";
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="header">
      <div className="left-wrapper">
        <div className="logo" onClick={goToHome}> {/* 로고 클릭 시 홈으로 이동 */}
          <img src="" alt="Logo" className="logo-image" />
        </div>
        <div className="text-css" onClick={goToClubNews}>Club News</div>
        <div className="text-css">Security News</div>
        <div className="text-css" onClick={goToCtf}>CTF</div>
      </div>
      <div className="right-wrapper">
        {loginSuccess ? (
          <>
            <div className="text-css" onClick={goToUserPage}> {userName} 님 </div>
            <button className="button" onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <div className="text-css" onClick={goToSign}>Sign IN</div>
            <div className="text-css" onClick={goToLogIn}>LOG IN</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
