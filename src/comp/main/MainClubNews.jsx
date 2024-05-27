// MainClubNews.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MainClubNews.css";

function MainClubNews() {
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopPosts = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('토큰이 없습니다. 로그인 해주세요.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://pay1oad.com/api/board/list', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            page: 0,
            size: 1000
          }
        });

        const topPostsSorted = response.data.content
          .sort((a, b) => b.viewCount - a.viewCount)
          .slice(0, 5);

        setTopPosts(topPostsSorted);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPosts();
  }, []);

  const handleItemClick = (id) => {
    navigate(`/board/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="background-color">
      <div className="name-wrapper">
        <div className="name-css">인기글</div>
      </div>
      <div className="news-box-wrapper">
        {topPosts.map(post => (
          <div className="news-box" key={post.boardId} onClick={() => handleItemClick(post.boardId)}>
            <h3>{post.title}</h3>
            <p>{new Date(post.createdDate).toLocaleDateString()}</p>
            <p>by {post.username}</p>
            <p>조회수: {post.viewCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainClubNews;
