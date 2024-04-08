import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProfileSidebar from './components/ProfileSidebar';
import UserInfo from './components/UserInfo';
import UserPosts from './components/UserPosts';
import LoginPage from './components/LoginPage'; // 로그인 페이지 컴포넌트 경로 확인
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <div className="main-content">
              <ProfileSidebar />
              <div className="right-content">
                <UserInfo />
                <UserPosts />
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
