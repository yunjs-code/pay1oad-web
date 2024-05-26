import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BoardList.css';

const BoardList = () => {
  const [data, setData] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      console.log('토큰:', token);

      if (!token) {
        setError('토큰이 없습니다. 로그인 해주세요.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://pay1oad.com/api/board/list', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('응답 데이터:', response.data);
        setData(response.data);
      } catch (err) {
        console.error('에러 응답:', err.response);
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!data.content || data.content.length === 0) {
    return <p>게시판 데이터가 없습니다.</p>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedItems = data.content.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (startIndex + itemsPerPage < data.content.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemClick = (id) => {
    navigate(`/${id}`);
  };

  const handleWriteClick = () => {
    navigate('/write');
  };

  return (
    <div>
      <h1>게시판 목록</h1>
      <button className="write-button" onClick={handleWriteClick}>글쓰기</button>
      <div className="board-grid">
        {selectedItems.map(board => (
          <div className="board-item" key={board.boardId} onClick={() => handleItemClick(board.boardId)}>
            <h2>{board.title}</h2>
            <p>{new Date(board.createdDate).toLocaleDateString()}</p>
            <p>by {board.writerName}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          이전
        </button>
        <button onClick={handleNextPage} disabled={startIndex + itemsPerPage >= data.content.length}>
          다음
        </button>
      </div>
    </div>
  );
};

export default BoardList;
