import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ setSearchQuery }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const handleLogin = () => {
    navigate('/login');
  };

  const goHome = () => {
    navigate('/');
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(inputValue);
  };

  return (
    <header className="header">
      <img src="logo.png" alt="Logo" className="logo" onClick={goHome}/>
      <nav className="navigation">
        <a href="/club-news">동아리 소식</a>
        <a href="/security-news">보안 소식</a>
        <a href="http://192.168.74.128:8000/" target="_blank" rel="noopener noreferrer">CTF</a> {/* CTFd 페이지로 직접 연결 서버에서 실행 할때 주소 변결 필요 */}
      </nav>
      <div className="search-container">
        <input
          type="search"
          placeholder="웹사이트 검색..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button type="submit" onClick={handleSearch}>검색</button>
      </div>
      <button className="login-button" onClick={handleLogin}>로그인</button>
    </header>
  );
}

export default Header;
