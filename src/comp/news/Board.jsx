import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Board = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      console.log('토큰:', token); // 토큰이 올바르게 저장되고 있는지 확인

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
        console.log('응답 데이터:', response.data); // 응답 데이터를 출력
        setData(response.data);
      } catch (err) {
        console.error('에러 응답:', err.response); // 에러 응답을 출력
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>게시판 목록</h1>
      <ul>
        {data.map(board => (
          <li key={board.boardId}>
            <h2>{board.title}</h2>
            <p>{board.content}</p>
            <p>작성자: {board.writerName}</p>
            <p>조회수: {board.viewCount}</p>
            <p>작성일: {new Date(board.createdDate).toLocaleString()}</p>
            <p>수정일: {new Date(board.modifiedData).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
