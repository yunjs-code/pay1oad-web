import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BoardList.css';
import DefaultImage from '../../../assets/img/KakaoTalk_20240521_193746437.png'; // 기본 이미지 경로 설정

const BoardList = () => {
  const [data, setData] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 3줄 x 4줄
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('title');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('토큰이 없습니다. 로그인 해주세요.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://pay1oad.com/api/board/list', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            page: currentPage - 1,
            size: itemsPerPage
          }
        });

        setData(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('토큰이 없습니다. 로그인 해주세요.');
      return;
    }

    if (!searchTerm.trim()) {
      setError('검색어를 입력해주세요.');
      return;
    }

    let searchParams = { title: '', content: '', username: '' };

    if (searchOption === 'title') {
      searchParams.title = searchTerm;
    } else if (searchOption === 'content') {
      searchParams.content = searchTerm;
    } else if (searchOption === 'myPosts') {
      searchParams.username = '';
    } else if (searchOption === 'otherPosts') {
      searchParams.username = searchTerm;
    }

    try {
      const response = await axios.post('http://pay1oad.com/api/board/search', searchParams, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setData(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data.content || data.content.length === 0) return <p>게시판 데이터가 없습니다.</p>;

  const handleNextPage = () => {
    if (data.content.length === itemsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemClick = (id) => {
    navigate(`/board/${id}`);
  };

  const handleWriteClick = () => {
    navigate('/board/write');
  };

  return (
    <div className="board-list">
      <div className="search-and-count">
        <div className="total-posts">총 {data.totalElements}개의 글</div>
        <form onSubmit={handleSearch} className="search-form">
          <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="myPosts">내가 쓴 글</option>
            <option value="otherPosts">타인이 쓴 글</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={searchOption === 'myPosts'}
          />
          <button type="submit">검색</button>
        </form>
        <button className="write-button" onClick={handleWriteClick}>글쓰기</button>
      </div>
      <div className="board-grid">
        {data.content.map(board => (
          <div className="board-item" key={board.boardId} onClick={() => handleItemClick(board.boardId)}>
            <img src={DefaultImage} alt="기본 이미지" className="board-image" />
            <div className="board-info">
              <h2>{board.title}</h2>
              <p>by {board.username}</p>
              <p>조회수: {board.viewCount}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>이전</button>
        <button onClick={handleNextPage} disabled={data.content.length < itemsPerPage}>다음</button>
      </div>
    </div>
  );
};

export default BoardList;
