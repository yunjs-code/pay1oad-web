import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInfo.css';

function UserInfo() {
  const [solvesCount, setSolvesCount] = useState(0); // 사용자가 푼 문제 수를 저장할 상태

  useEffect(() => {
    const fetchSolves = async () => {
      try {
        // CTFd API 엔드포인트를 사용
        const response = await axios.get('http://pay1oad.com:50001/api/v1/challenges/solves', {
          headers: { 'Authorization': 'ctfd_9f9756a2deh4d2a3511c837aa90d4a6fa587ca24f35557534eee6f634eea03807' }
        });
        setSolvesCount(response.data.data.length); // 해결된 문제의 수를 상태로 설정
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    };

    fetchSolves();
  }, []);

  const userInfo = {
    id: 'user1234',
    joinDate: '2021/01/01',
  };

  return (
    <div className="user-info">
      <div className="user-info-section">
        <div className="user-info-title">ID</div>
        <div className="user-info-content">{userInfo.id}</div>
      </div>
      <div className="user-info-section">
        <div className="user-info-title">가입일</div>
        <div className="user-info-content">{userInfo.joinDate}</div>
      </div>
      <div className="user-info-section">
        <div className="user-info-title">CTF 해결 문제 수</div>
        <div className="user-info-content">{solvesCount}개</div>
      </div>
    </div>
  );
}

export default UserInfo;
