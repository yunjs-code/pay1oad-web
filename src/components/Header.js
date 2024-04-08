import React from 'react';
import { useNavigate } from 'react-router-dom';  
import './Header.css';

function Header() {
  const navigate = useNavigate();  

  const handleLogin = () => {
    navigate('/login');  
  };

  const goHome = () => {
    navigate('/'); 
  };

  return (
    <header className="header">
      <img src="logo.png" alt="Logo" className="logo" onClick={goHome}/>
      <nav className="navigation">
        <a href="/club-news">동아리 소식</a>
        <a href="/security-news">보안 소식</a>
        <a href="/ctf">CTF</a>
      </nav>
      <div className="search-container">
        <input type="search" placeholder="웹사이트 검색..." />
        <button type="submit">검색</button>
      </div>
      <button className="login-button" onClick={handleLogin}>로그인</button>
    </header>
  );
}

export default Header;
