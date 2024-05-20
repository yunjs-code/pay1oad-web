import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, createComment } from '../../redux/actions/commentActions';

const CommentList = ({ boardId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comment.comments);
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch(fetchComments(boardId));
  }, [dispatch, boardId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment(boardId, { content }));
    setContent('');
  };

  return (
    <div>
      <h2>댓글</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          <label>댓글</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <button type="submit">작성하기</button>
      </form>
    </div>
  );
};

export default CommentList;
