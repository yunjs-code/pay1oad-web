import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';  // axios를 직접 임포트
import './PostDetail.css';

const BASE_URL = 'http://pay1oad.com/api';  // 기본 URL 설정

const PostDetail = ({ updatePost, deletePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // 게시글 조회 API 호출
    axios.get(`${BASE_URL}/board/${id}`)
      .then(response => {
        setPost(response.data);
        setEditedTitle(response.data.title);
        setEditedContent(response.data.content);
      })
      .catch(error => {
        console.error("There was an error fetching the post!", error);
      });
  }, [id]);

  useEffect(() => {
    if (post) {
      // 조회수 증가를 위해 게시글 조회 후 업데이트
      axios.patch(`${BASE_URL}/board/${id}/update`, { ...post, viewCount: post.viewCount + 1 })
        .then(response => {
          setPost(response.data);
        })
        .catch(error => {
          console.error("There was an error updating the view count!", error);
        });
    }
  }, [post]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // 댓글 작성 API 호출
    axios.post(`${BASE_URL}/board/${id}/comment/write`, { content: newComment })
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch(error => {
        console.error("There was an error posting the comment!", error);
      });
  };

  const handleEditSubmit = () => {
    // 게시글 수정 API 호출
    axios.patch(`${BASE_URL}/board/${id}/update`, { title: editedTitle, content: editedContent })
      .then(response => {
        setPost(response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error("There was an error updating the post!", error);
      });
  };

  const handleDelete = () => {
    // 게시글 삭제 API 호출
    axios.delete(`${BASE_URL}/board/${id}/delete`, { data: { password: 'password' } }) // 비밀번호는 적절히 수정 필요
      .then(() => {
        navigate('/board');
      })
      .catch(error => {
        console.error("There was an error deleting the post!", error);
      });
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
            <span>작성 시간: {post.createdDate}</span>
            <span>조회수: {post.viewCount}</span>
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
              {comment.content} - {comment.commentWriterName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
