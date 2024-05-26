import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BoardList.css';

const BoardList = () => {
  const [data, setData] = useState({ content: [] }); // 게시판 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리할 상태
  const [error, setError] = useState(null); // 에러 메시지를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호를 저장할 상태
  const itemsPerPage = 16; // 페이지당 항목 수를 16개로 설정
  const navigate = useNavigate(); // 페이지 이동을 위한 함수

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
      } catch (err) {
        console.error('에러 응답:', err.response);
        setError(err.response ? err.response.data.message : err.message); // 에러 메시지 설정
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchData();
  }, [currentPage]); // currentPage가 변경될 때마다 fetchData를 다시 호출

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
      <h1>게시판 목록</h1>
      <button className="write-button" onClick={handleWriteClick}>글쓰기</button>
      <div className="board-grid">
        {data.content.map(board => (
          <div className="board-item" key={board.boardId} onClick={() => handleItemClick(board.boardId)}>
            <h2>{board.title}</h2>
            <p>{new Date(board.createdDate).toLocaleDateString()}</p>
            <p>by {board.username}</p> {/* 작성자를 표시 */}
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
