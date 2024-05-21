import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = ({ posts, updatePost, deletePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((post) => post.id === parseInt(id));
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post?.title || '');
  const [editedContent, setEditedContent] = useState(post?.content || '');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (post) {
      updatePost({ ...post, views: post.views + 1 });
    }
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, newComment]);
    setNewComment('');
  };

  const handleEditSubmit = () => {
    updatePost({ ...post, title: editedTitle, content: editedContent });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deletePost(post.id);
    navigate('/');
  };

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="post-detail">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          ></textarea>
          <button onClick={handleEditSubmit}>수정 완료</button>
          <button onClick={() => setIsEditing(false)}>취소</button>
        </>
      ) : (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <div className="post-info">
            <span>작성 시간: {post.timestamp}</span>
            <span>조회수: {post.views}</span>
          </div>
          <button onClick={() => setIsEditing(true)}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </>
      )}
      <div className="comments-section">
        <h2>댓글</h2>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 작성하세요"
          ></textarea>
          <button type="submit">댓글 작성</button>
        </form>
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              {comment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
