import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/main/Header';
import ProfileSidebar from './components/userpage/ProfileSidebar';
import UserInfo from './components/userpage/UserInfo';
import UserPosts from './components/userpage/UserPosts';
import LoginPage from './components/login/LoginPage';
import MainHome from "./components/main/MainHome";
import ToS from "./components/signin/ToS";
import NickName from "./components/signin/NickName";
import SignIn from "./components/signin/SignIn";
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');  // 검색 쿼리 상태 추가

  return (
    <Router>
      <div className="app">
        <Header setSearchQuery={setSearchQuery} />  
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/nickname" element={<NickName />} />
          <Route path="/tos" element={<ToS />} />
          <Route path="/" element={
            <div className="main-content">
              <ProfileSidebar />
              <div className="right-content">
                <UserInfo />
                <UserPosts searchQuery={searchQuery} />  
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
