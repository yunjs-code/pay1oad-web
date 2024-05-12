// UserPage.jsx

import React from 'react';
import Header from '../main/Header'; // Header 컴포넌트를 import 합니다.
import ProfileSidebar from './ProfileSidebar'; // ProfileSidebar 컴포넌트를 import 합니다.
import UserInfo from './UserInfo'; // UserInfo 컴포넌트를 import 합니다.
import './UserPage.css';

function UserPage() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="main-content">
          <ProfileSidebar />
          <div className="right-content">
          <UserInfo />
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default UserPage;
