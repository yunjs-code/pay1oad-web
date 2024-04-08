import React from 'react';
import axios from 'axios';
import './ProfileSidebar.css';

function ProfileSidebar() {
  const profileData = {
    nickname: '김가천',
    ctfParticipated: 5,
    likesReceived: 20,
    bookmarksMade: 10,
  };

  const handleProfileEdit = () => {
    console.log('프로필 수정 버튼이 클릭되었습니다.');
    // Spring Boot 서버로 프로필 수정 요청 보내기
    axios.post('/api/edit-profile', {
      nickname: profileData.nickname
      // 여기에 추가 데이터를 포함할 수 있습니다.
    })
    .then(response => console.log('프로필 수정 응답:', response))
    .catch(error => console.error('프로필 수정 에러:', error));
  };

  const handlePromotionRequest = () => {
    console.log('승급 요청 버튼이 클릭되었습니다.');
    // Spring Boot 서버로 승급 요청 보내기
    axios.post('/api/request-promotion', {
      nickname: profileData.nickname
    })
    .then(response => console.log('승급 요청 응답:', response))
    .catch(error => console.error('승급 요청 에러:', error));
  };

  const handleWithdrawal = () => {
    console.log('회원 탈퇴 버튼이 클릭되었습니다.');
    // Spring Boot 서버로 회원 탈퇴 요청 보내기
    axios.post('/api/withdraw', {
      nickname: profileData.nickname
    })
    .then(response => console.log('회원 탈퇴 응답:', response))
    .catch(error => console.error('회원 탈퇴 에러:', error));
  };

  return (
    <aside className="profile-sidebar">
      <div className="profile-header">
        <div className="profile-picture"></div>
        {profileData.nickname}
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
