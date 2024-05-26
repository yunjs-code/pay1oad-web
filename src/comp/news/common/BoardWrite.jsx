import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BoardWrite.css';

const BoardWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('토큰이 없습니다. 로그인 해주세요.');
      return;
    }

    try {
      const response = await axios.post('http://pay1oad.com/api/board/write', {
        title,
        content
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('게시글 작성 응답:', response.data);
      navigate('/');
    } catch (err) {
      console.error('게시글 작성 에러:', err.response);
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <div className="board-write">
      <h1>글쓰기</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">작성</button>
      </form>
    </div>
  );
};

export default BoardWrite;
