import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBoard } from '../../redux/actions/boardActions';

const BoardForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBoard({ title, content }));
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>제목</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>내용</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      </div>
      <button type="submit">작성하기</button>
    </form>
  );
};

export default BoardForm;
