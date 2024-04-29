import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProfileSidebar from './components/ProfileSidebar';
import UserInfo from './components/UserInfo';
import UserPosts from './components/UserPosts';
import LoginPage from './components/LoginPage';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');  // 검색 쿼리 상태 추가

  return (
    <Router>
      <div className="app">
        <Header setSearchQuery={setSearchQuery} />  
        <Routes>
          <Route path="/login" element={<LoginPage />} />
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
