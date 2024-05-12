import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInfo.css';

function UserInfo() {
  const [selectedTab, setSelectedTab] = useState('정보');
  const [solvesCount, setSolvesCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: '',
    joinDate: '',
    username: '' // username 상태 추가
  });
  const [ctfduserInfo, ctfdsetUserInfo] = useState({
    name: '',
    joinDate: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Items per page for pagination
  const [searchQuery, setSearchSearch] = useState('');

  const savedPosts = [
    { id: 1, content: "저장 1" },
    { id: 2, content: "저장 2" },
    { id: 3, content: "저장 3" },
    { id: 4, content: "저장 4" },
    { id: 5, content: "저장 5" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSolves = await axios.get('http://pay1oad.com/ctfd/api/v1/users/2/solves', {
          headers: { 'Authorization': 'Bearer ctfd_58937b6c68c0adb28aeeaf169727ab380902d51dc7d4ca66feba05d5d3610f3c' }
        });
        const solvedByMe = responseSolves.data.data.filter(c => c.type === "correct");
        setSolvesCount(solvedByMe.length);
        const totalSolvedValue = solvedByMe.reduce((val, elem) => val + elem.challenge.value, 0);
        setTotalValue(totalSolvedValue);

        const responseUserInfo = await axios.get('http://pay1oad.com/ctfd/api/v1/users/2', {
          headers: { 'Authorization': 'Bearer ctfd_58937b6c68c0adb28aeeaf169727ab380902d51dc7d4ca66feba05d5d3610f3c' }
        });
        if (responseUserInfo.data.success && responseUserInfo.data.data) {
          ctfdsetUserInfo({
            name: responseUserInfo.data.data.name,
            joinDate: responseUserInfo.data.data.date
          });
        } else {
          console.error('사용자 데이터를 불러오는데 실패했습니다.');
        }

        const postResponseUserInfo = await axios.post('https://pay1oad.com/api/auth/signin', {}, {
          headers: { 'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaXNzIjoiUGF5MW9hZCBIb21lcGFnZSIsImlhdCI6MTcxMjQwNDI3OSwiZXhwIjoxNzEyNDkwNjc5fQ._uaCHew4ufXju6_WFpad0VBTZRKzh0TjZqp0dvA33I2Pjrnc1jOv3_w-8z6zJRsWRVyODkm_QCC3pFdADAQenA' }
        });
        if (responseUserInfo.data.success && responseUserInfo.data.data) {
          setUserInfo({
            name: postResponseUserInfo.data.data.name,
            joinDate: postResponseUserInfo.data.data.date
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

  const handleSelectTab = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
    setSearchSearch('');
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredPosts = savedPosts.filter(post => post.content.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderTabContent = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    switch (selectedTab) {
      case '정보':
        return (
          <div className="tab-content">
            <div className="detail-item">{userInfo.username} 님의 가입 정보입니다.</div>
            <div className="detail-item">이름: {ctfduserInfo.name}</div>
            <div className="detail-item">가입 날짜: {ctfduserInfo.joinDate}</div>
          </div>
        );
      case 'CTF':
        return (
          <div className="tab-content">
            <div className="detail-item">CTF: {ctfduserInfo.name} 님의 가입 정보입니다.</div>
            <div className="detail-item">푼 문제 수: {solvesCount}개</div>
            <div className="detail-item">해결한 문제의 값 합계: {totalValue}점</div>
          </div>
        );
      case '커뮤니티':
        return (
          <div className="tab-content">
            <div className="detail-item">댓글</div>
<div className="detail-item">질문</div>
<div className="detail-item">작성 글</div>
</div>
);
case '저장':
return (
<div className="tab-content">
<input
type="text"
placeholder="Search posts..."
value={searchQuery}
onChange={(e) => setSearchSearch(e.target.value)}
/>
{filteredPosts.slice(startIndex, endIndex).map(post => (
<div key={post.id} className="detail-item">{post.content}</div>
))}
<div>
<button disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
<button disabled={endIndex >= filteredPosts.length} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
</div>
</div>
);
default:
return (
<div className="tab-content">
탭을 선택해주세요.
</div>
);
}
};

return (
<div className="user-info">
<div className="tab-buttons">
{['정보', 'CTF', '커뮤니티', '저장'].map(tab => (
<button
key={tab}
className={selectedTab === tab ? 'active' : ''}
onClick={() => handleSelectTab(tab)}
>
{tab}
</button>
))}
</div>
{renderTabContent()}
</div>
);
}

export default UserInfo;  
