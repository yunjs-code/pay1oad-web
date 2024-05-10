import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInfo.css';

function UserInfo() {
  const [solvesCount, setSolvesCount] = useState(0); // 사용자가 푼 문제 수를 저장할 상태
  const [totalValue, setTotalValue] = useState(0); // 사용자가 푼 문제의 value 총합을 저장할 상태
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    joinDate: ''
  }); // 사용자 정보를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 문제 해결 데이터 API 요청
        const responseSolves = await axios.get('http://pay1oad.com/ctfd/api/v1/users/2/solves', {
          headers: { 'Authorization': 'Bearer ctfd_58937b6c68c0adb28aeeaf169727ab380902d51dc7d4ca66feba05d5d3610f3c' }
        });
        const solvedByMe = responseSolves.data.data.filter(c=>c.type==="correct");
        setSolvesCount(solvedByMe.length); // 해결된 문제 수 업데이트
        const totalSolvedValue = solvedByMe.reduce((val, elem) => val + elem.challenge.value, 0);
        setTotalValue(totalSolvedValue); // 해결한 문제의 값 합계 업데이트

        // 사용자 정보 API 요청
        const responseUserInfo = await axios.get('http://pay1oad.com/ctfd/api/v1/users/2', {
          headers: { 'Authorization': 'Bearer ctfd_58937b6c68c0adb28aeeaf169727ab380902d51dc7d4ca66feba05d5d3610f3c' }
        });
        if (responseUserInfo.data.success && responseUserInfo.data.data) {
          setUserInfo({ // 사용자 정보 업데이트
            name: responseUserInfo.data.data.name,
            joinDate: responseUserInfo.data.data.date
          });
        } else {
          console.error('사용자 데이터를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="user-info">
      <div className="user-info-section">
        <div className="user-info-title">사용자 이름</div>
        <div className="user-info-content">{userInfo.name}</div>
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
