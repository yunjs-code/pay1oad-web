import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInfo.css';

function UserInfo() {
  const [solvesCount, setSolvesCount] = useState(0); // 사용자가 푼 문제 수를 저장할 상태

  useEffect(() => {
    const fetchSolves = async () => {
      try {
        // CTFd API 엔드포인트를 사용
        const response = await axios.get('http://pay1oad.com/ctfd/api/v1/challenges/1', {
          headers: { 'Authorization': 'ctfd_58937b6c68c0adb28aeeaf169727ab380902d51dc7d4ca66feba05d5d3610f3c' }
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
