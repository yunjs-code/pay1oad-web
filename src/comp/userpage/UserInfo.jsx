import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserInfo.css';

function UserInfo() {
  const [selectedTab, setSelectedTab] = useState('정보');
  const [solvesCount, setSolvesCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [userPostCount, setUserPostCount] = useState(0);
  const [userInfo, setUserInfo] = useState({
    username: localStorage.getItem('username') || ''
  });
  const [ctfduserInfo, ctfdsetUserInfo] = useState({
    name: '',
    joinDate: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [searchQuery, setSearchSearch] = useState('');
  const [savedPosts, setSavedPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');

      if (!token || !username) {
        console.error('토큰 또는 사용자 이름이 없습니다. 로그인 해주세요.');
        return;
      }

      try {
        const responseUserPosts = await axios.post('http://pay1oad.com/api/board/search', {
          title: "",
          content: "",
          username: username
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (responseUserPosts.data && Array.isArray(responseUserPosts.data.content)) {
          setUserPostCount(responseUserPosts.data.content.length);
        } else {
          console.error('사용자 작성 글 데이터를 불러오는데 실패했습니다.');
        }

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
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [location.state?.postCreated]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      if (!token || !username) {
        console.error('토큰 또는 사용자 이름이 없습니다. 로그인 해주세요.');
        return;
      }

      try {
        let allPosts = [];
        let page = 0;
        let totalPages = 1;

        while (page < totalPages) {
          const response = await axios.post('http://pay1oad.com/api/board/search', {
            title: "",
            content: "",
            username: username,
            page: page,
            size: 100 // 큰 페이지 사이즈로 설정하여 가능한 한 많은 데이터를 한 번에 가져옴
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.data && Array.isArray(response.data.content)) {
            allPosts = allPosts.concat(response.data.content);
            totalPages = response.data.totalPages; // 전체 페이지 수를 업데이트
          } else {
            console.error('사용자 작성 글 데이터를 불러오는데 실패했습니다.');
            break;
          }

          page++;
        }

        setSavedPosts(allPosts);
        setUserPostCount(allPosts.length); // 전체 글의 수를 업데이트
      } catch (error) {
        console.error('저장된 글을 불러오는데 오류 발생:', error);
      }
    };

    if (selectedTab === '저장') {
      fetchSavedPosts();
    }
  }, [selectedTab]);

  const handleSelectTab = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
    setSearchSearch('');
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePostClick = (boardId) => {
    navigate(`/board/${boardId}`);
  };

  const handlePostEdit = async (boardId) => {
    // Edit post logic
  };

  const handlePostDelete = async (boardId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('토큰이 없습니다. 로그인 해주세요.');
      return;
    }

    try {
      await axios.delete(`http://pay1oad.com/api/board/${boardId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // 글 삭제 후 목록 갱신
      setSavedPosts(savedPosts.filter(post => post.boardId !== boardId));
      setUserPostCount(prevCount => prevCount - 1);
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
    }
  };

  const filteredPosts = savedPosts.filter(post => post.content.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderTabContent = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    switch (selectedTab) {
      case '정보':
        return (
          <div className="tab-content">
            <div className="detail-item">{userInfo.username} 님의 가입 정보입니다.</div>
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
                <div key={post.boardId} className="detail-item">
                  <span onClick={() => handlePostClick(post.boardId)}>{post.title}</span>
                  <div>
                    <button className="delete" onClick={() => handlePostDelete(post.boardId)}>삭제</button>
                  </div>
                </div>
              ))}
              <div>
                <button disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>이전</button>
                <button disabled={endIndex >= filteredPosts.length} onClick={() => setCurrentPage(currentPage + 1)}>다음</button>
              </div>
            </div>
          );

      case '커뮤니티':
        return (
          <div className="tab-content">
            <div className="detail-item">댓글</div>
            <div className="detail-item">질문</div>
            <div className="detail-item">작성 글: {userPostCount}</div>
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
