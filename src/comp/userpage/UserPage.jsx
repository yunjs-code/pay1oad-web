// UserPage.jsx

import React from 'react';
import Header from './Header'; // Header 컴포넌트를 import 합니다.
import ProfileSidebar from './ProfileSidebar'; // ProfileSidebar 컴포넌트를 import 합니다.
import UserInfo from './UserInfo'; // UserInfo 컴포넌트를 import 합니다.
import UserPosts from './UserPosts'; // UserPosts 컴포넌트를 import 합니다.
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
          <UserPosts />
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default UserPage;