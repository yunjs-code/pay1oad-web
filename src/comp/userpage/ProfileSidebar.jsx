import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileSidebar.css';

function ProfileSidebar() {
  const [profileData, setProfileData] = useState({
    nickname: '', // Initially empty, will be updated from API
    ctfParticipated: 5,
    likesReceived: 20,
    bookmarksMade: 10,
  });

  useEffect(() => {
    // Fetch the user data from the API
    axios.get('http://pay1oad.com/ctfd/api/v1/users/2', {
      headers: { 'Authorization': 'Bearer ctfd_58937b6c68c0adb28aeeaf169727ab380902d51dc7d4ca66feba05d5d3610f3c' } // Add a valid token here
    })
    .then(response => {
      if (response.data && response.data.data) {
        // Assuming the API returns data in this format
        setProfileData(prevData => ({
          ...prevData,
          nickname: response.data.data.name // Update nickname with name from API
        }));
      }
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  const handleProfileEdit = () => {
    console.log('프로필 수정 버튼이 클릭되었습니다.');
    axios.post('/api/edit-profile', {
      nickname: profileData.nickname
    })
    .then(response => console.log('프로필 수정 응답:', response))
    .catch(error => console.error('프로필 수정 에러:', error));
  };

  const handlePromotionRequest = () => {
    console.log('승급 요청 버튼이 클릭되었습니다.');
    axios.post('/api/request-promotion', {
      nickname: profileData.nickname
    })
    .then(response => console.log('승급 요청 응답:', response))
    .catch(error => console.error('승급 요청 에러:', error));
  };

  const handleWithdrawal = () => {
    console.log('회원 탈퇴 버튼이 클릭되었습니다.');
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
        {profileData.nickname} {/* Display the fetched nickname */}
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
