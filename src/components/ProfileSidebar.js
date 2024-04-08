import React from 'react';
import './ProfileSidebar.css';

function ProfileSidebar() {

  const profileData = {
    nickname: '네니얼',
    ctfParticipated: 5,
    likesReceived: 20,
    bookmarksMade: 10,
  };


  const handleProfileEdit = () => {
    console.log('프로필 수정 버튼이 클릭되었습니다.');
  };

  const handlePromotionRequest = () => {
    console.log('승급 요청 버튼이 클릭되었습니다.');
  };

  const handleWithdrawal = () => {
    console.log('회원 탈퇴 버튼이 클릭되었습니다.');

  };

  return (
    <aside className="profile-sidebar">
      <div className="profile-header">
        <div className="profile-picture"></div>
        <button className="edit-profile-button" onClick={handleProfileEdit}>프로필 수정</button>
      </div>
      <div className="profile-info">
        <div className="profile-info-item">
          <span className="profile-info-title">참가 소개</span>
          <span className="profile-info-value">{profileData.ctfParticipated}</span>
        </div>
        <div className="profile-info-item">
          <span className="profile-info-title">좋아요</span>
          <span className="profile-info-value">{profileData.likesReceived}</span>
        </div>
        <div className="profile-info-item">
          <span className="profile-info-title">북마크</span>
          <span className="profile-info-value">{profileData.bookmarksMade}</span>
        </div>
      </div>
      <div className="profile-actions">
        <button className="promotion-request-button" onClick={handlePromotionRequest}>승급 요청</button>
        <button className="withdrawal-button" onClick={handleWithdrawal}>회원 탈퇴</button>
      </div>
    </aside>
  );
}

export default ProfileSidebar;
