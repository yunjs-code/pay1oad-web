import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import './BoardDetail.css';

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('토큰이 없습니다. 로그인 해주세요.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://pay1oad.com/api/board/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // 데이터 정화
        const sanitizedData = {
          ...response.data,
          title: DOMPurify.sanitize(response.data.title),
          content: DOMPurify.sanitize(response.data.content)
        };
        setData(sanitizedData);
        await fetchComments();
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const fetchComments = async () => {
    const token = localStorage.getItem('token');
    try {
      const commentResponse = await axios.get(`http://pay1oad.com/api/board/${id}/comment/list`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (Array.isArray(commentResponse.data.content)) {
        const sanitizedComments = commentResponse.data.content.map(comment => ({
          ...comment,
          content: DOMPurify.sanitize(comment.content)
        }));
        setComments(sanitizedComments);
      } else {
        setComments([]);
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('토큰이 없습니다. 로그인 해주세요.');
      return;
    }

    try {
      const cleanCommentContent = DOMPurify.sanitize(commentContent);
      await axios.post(`http://pay1oad.com/api/board/${id}/comment/write`, {
        content: cleanCommentContent
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCommentContent('');
      fetchComments(); // 댓글 작성 후 댓글 목록을 다시 불러옴
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleCommentDelete = async (commentId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://pay1oad.com/api/board/${id}/comment/delete/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchComments(); // 댓글 삭제 후 댓글 목록을 다시 불러옴
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleCommentEdit = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditCommentContent(content);
  };

  const handleCommentEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('토큰이 없습니다. 로그인 해주세요.');
      return;
    }

    try {
      const cleanEditCommentContent = DOMPurify.sanitize(editCommentContent);
      await axios.patch(`http://pay1oad.com/api/board/${id}/comment/update/${editingCommentId}`, {
        content: cleanEditCommentContent
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditingCommentId(null);
      setEditCommentContent('');
      fetchComments(); // 댓글 수정 후 댓글 목록을 다시 불러옴
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://pay1oad.com/api/board/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/board'); // 게시글 삭제 후 /board로 이동
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(data.title);
    setEditContent(data.content);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('토큰이 없습니다. 로그인 해주세요.');
      return;
    }

    try {
      const cleanEditTitle = DOMPurify.sanitize(editTitle);
      const cleanEditContent = DOMPurify.sanitize(editContent);
      await axios.patch(`http://pay1oad.com/api/board/${id}/update`, {
        title: cleanEditTitle,
        content: cleanEditContent
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData({ ...data, title: cleanEditTitle, content: cleanEditContent });
      setIsEditing(false);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!data) return <p>게시글 데이터를 불러올 수 없습니다.</p>;

  return (
    <div className="board-detail">
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <div>
            <label htmlFor="editTitle">제목</label>
            <input
              type="text"
              id="editTitle"
              name="editTitle"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="editContent">내용</label>
            <textarea
              id="editContent"
              name="editContent"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              required
            />
          </div>
          <button type="submit">수정 완료</button>
          <button type="button" onClick={() => setIsEditing(false)}>취소</button>
        </form>
      ) : (
        <>
          <h1>{data.title}</h1>
          <p>{data.content}</p>
          <p>작성자: {data.username}</p>
          <p>작성일: {new Date(data.createdDate).toLocaleString()}</p>
          <div className="author-actions">
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </div>
        </>
      )}

      <div className="comments-section">
        <h2>댓글</h2>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
          />
          <button type="submit">댓글 작성</button>
        </form>
        <ul>
          {comments.map(comment => (
            <li key={comment.commentId}>
              <p>{comment.content}</p>
              <p>작성자: {comment.commentWriterName}</p>
              <p>작성일: {new Date(comment.createdDate).toLocaleString()}</p>
              <button onClick={() => handleCommentEdit(comment.commentId, comment.content)}>수정</button>
              <button onClick={() => handleCommentDelete(comment.commentId)}>삭제</button>
              {editingCommentId === comment.commentId && (
                <form onSubmit={handleCommentEditSubmit}>
                  <textarea
                    value={editCommentContent}
                    onChange={(e) => setEditCommentContent(e.target.value)}
                    required
                  />
                  <button type="submit">수정 완료</button>
                  <button type="button" onClick={() => setEditingCommentId(null)}>취소</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BoardDetail;
