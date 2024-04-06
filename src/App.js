import React from 'react';
import Header from './components/Header';
import ProfileSidebar from './components/ProfileSidebar';
import UserInfo from './components/UserInfo';
import UserPosts from './components/UserPosts'; 
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <ProfileSidebar />
        <div className="right-content">
          <UserInfo />

          <UserPosts />
        </div>
      </div>
    </div>
  );
}

export default App;
