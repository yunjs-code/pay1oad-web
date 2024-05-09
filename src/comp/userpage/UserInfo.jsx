import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInfo.css';

function UserInfo() {
  const [solvesCount, setSolvesCount] = useState(0); // 사용자가 푼 문제 수를 저장할 상태
  const [totalValue, setTotalValue] = useState(0); // 사용자가 푼 문제의 value 총합을 저장할 상태

  useEffect(() => {
    const fetchSolves = async () => {
      try {
        // CTFd API 엔드포인트를 사용, 특정 사용자의 해결한 문제들을 가져오는 가정
        const response = await axios.get('http://pay1oad.com/ctfd/api/v1/users/2/solves', {
          headers: { 'Authorization': 'Bearer ctfd_58937b6c68c0adb28aeeaf169727ab380902d51dc7d4ca66feba05d5d3610f3c' }
        });
        // 문제들 중에서 사용자가 해결한 문제들만 필터링
        const solvedByMe = response.data.data.filter(c=>c.type==="correct");
        setSolvesCount(solvedByMe.length); // 해결된 문제의 수를 상태로 설정

        // solved_by_me가 true인 항목들의 value 값을 합산
        const totalSolvedValue = solvedByMe.reduce((val, elem) => val + elem.challenge.value, 0);
        setTotalValue(totalSolvedValue); // value 합계를 상태로 설정
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
      <div className="user-info-section">
        <div className="user-info-title">해결한 문제의 값 합계</div>
        <div className="user-info-content">{totalValue}점</div>
      </div>
    </div>
  );
}

export default UserInfo;
