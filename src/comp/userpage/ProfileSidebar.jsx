import React from 'react';
import './ProfileSidebar.css';

function ProfileSidebar({ userName }) {
  return (
    <aside className="profile-sidebar">
      <div className="profile-header">
        <div className="profile-picture"></div>
        {userName}{/* Display the username passed as a prop */}
        <button className="edit-profile-button">프로필 수정</button>
      </div>
      <div className="profile-info">
        <div className="profile-info-item">
          <span className="profile-info-title">참가 소개</span>
          <span className="profile-info-value">5</span>
        </div>
        <div className="profile-info-item">
          <span className="profile-info-title">좋아요</span>
          <span className="profile-info-value">20</span>
        </div>
        <div className="profile-info-item">
          <span className="profile-info-title">북마크</span>
          <span className="profile-info-value">10</span>
        </div>
      </div>
      <div className="profile-actions">
        <button className="promotion-request-button">승급 요청</button>
        <button className="withdrawal-button">회원 탈퇴</button>
      </div>
    </aside>
  );
}

export default ProfileSidebar;
