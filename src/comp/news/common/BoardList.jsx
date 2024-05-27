import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BoardList.css';

const BoardList = () => {
  const [data, setData] = useState({ content: [] }); // 게시판 데이터를 저장할 상태
  const [topPosts, setTopPosts] = useState([]); // 조회수가 높은 게시글을 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리할 상태
  const [error, setError] = useState(null); // 에러 메시지를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호를 저장할 상태
  const itemsPerPage = 16; // 페이지당 항목 수를 16개로 설정
  const navigate = useNavigate(); // 페이지 이동을 위한 함수
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [searchOption, setSearchOption] = useState('title'); // 검색 옵션 상태

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져옴

      if (!token) {
        setError('토큰이 없습니다. 로그인 해주세요.'); // 토큰이 없으면 에러 설정
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://pay1oad.com/api/board/list', {
          headers: {
            Authorization: `Bearer ${token}` // 요청 헤더에 토큰을 포함
          },
          params: {
            page: currentPage - 1, // 현재 페이지 번호를 요청 파라미터로 전달 (0-based index)
            size: itemsPerPage // 페이지당 항목 수를 요청 파라미터로 전달
          }
        });
        console.log('응답 데이터:', response.data);
        setData(response.data); // 응답 데이터를 상태에 저장

        // 조회수가 높은 글 5개 가져오기
        const topResponse = await axios.get('http://pay1oad.com/api/board/list', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            page: 0, // 첫 페이지에서 가져옴
            size: 1000 // 충분히 큰 값을 설정하여 모든 게시글을 가져옴
          }
        });

        const topPostsSorted = topResponse.data.content
          .sort((a, b) => b.viewCount - a.viewCount)
          .slice(0, 5); // 조회수 기준으로 정렬 후 상위 5개 추출

        setTopPosts(topPostsSorted); // 조회수 높은 게시글을 상태에 저장
      } catch (err) {
        console.error('에러 응답:', err.response);
        setError(err.response ? err.response.data.message : err.message); // 에러 메시지 설정
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchData();
  }, [currentPage]); // currentPage가 변경될 때마다 fetchData를 다시 호출

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져옴

    if (!token) {
      setError('토큰이 없습니다. 로그인 해주세요.');
      return;
    }

    let searchParams = { title: '', content: '', username: '' };

    if (searchOption === 'title') {
      searchParams.title = searchTerm;
    } else if (searchOption === 'content') {
      searchParams.content = searchTerm;
    } else if (searchOption === 'myPosts') {
      searchParams.username = ''; // 현재 사용자의 username으로 설정
    } else if (searchOption === 'otherPosts') {
      searchParams.username = searchTerm;
    }

    try {
      const response = await axios.post('http://pay1oad.com/api/board/search', searchParams, {
        headers: {
          Authorization: `Bearer ${token}` // 요청 헤더에 토큰을 포함
        }
      });
      console.log('검색 결과 데이터:', response.data);
      setData(response.data); // 검색 결과 데이터를 상태에 저장
    } catch (err) {
      console.error('검색 에러 응답:', err.response);
      setError(err.response ? err.response.data.message : err.message); // 에러 메시지 설정
    }
  };

  if (loading) return <p>Loading...</p>; // 로딩 중일 때 표시할 내용
  if (error) return <p>Error: {error}</p>; // 에러가 있을 때 표시할 내용

  if (!data.content || data.content.length === 0) {
    return <p>게시판 데이터가 없습니다.</p>; // 데이터가 없을 때 표시할 내용
  }

  const handleNextPage = () => {
    if (data.content.length === itemsPerPage) {
      setCurrentPage(currentPage + 1); // 다음 페이지로 이동
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // 이전 페이지로 이동
    }
  };

  const handleItemClick = (id) => {
    navigate(`/board/${id}`); // 게시글 클릭 시 상세 페이지로 이동
  };

  const handleWriteClick = () => {
    navigate('/board/write'); // 글쓰기 버튼 클릭 시 글쓰기 페이지로 이동
  };

  return (
    <div>
      <h2>조회수가 높은 글</h2>
      <div className="top-posts">
        {topPosts.map(post => (
          <div className="board-item" key={post.boardId} onClick={() => handleItemClick(post.boardId)}>
            <h3>{post.title}</h3>
            <p>{new Date(post.createdDate).toLocaleDateString()}</p>
            <p>by {post.username}</p>
            <p>조회수: {post.viewCount}</p>
          </div>
        ))}
      </div>

      <h1>게시판 목록</h1>
      <form onSubmit={handleSearch}>
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
      
      

      <div className="board-grid">
        {data.content.map(board => (
          <div className="board-item" key={board.boardId} onClick={() => handleItemClick(board.boardId)}>
            <h2>{board.title}</h2>
            <p>{new Date(board.createdDate).toLocaleDateString()}</p>
            <p>by {board.username}</p>
            <p>조회수: {board.viewCount}</p> {/* 조회수를 표시 */}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          이전
        </button>
        <button onClick={handleNextPage} disabled={data.content.length < itemsPerPage}>
          다음
        </button>
      </div>
    </div>
  );
};

export default BoardList;
