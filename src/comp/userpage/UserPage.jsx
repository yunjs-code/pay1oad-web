// UserPage.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../main/Header';
import ProfileSidebar from './ProfileSidebar';
import UserInfo from './UserInfo';
import './UserPage.css';

function UserPage() {
  const location = useLocation();
  const userName = location.state?.username || "";

  return (
    <div>
      <Header />
      <div className="container">
        <div className="main-content">
          <ProfileSidebar userName={userName} />
          <div className="right-content">
            <UserInfo userName={userName} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
