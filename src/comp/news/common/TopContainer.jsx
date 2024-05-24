import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TopContainer.css';

const BASE_URL = 'http://pay1oad.com/api';  // HTTP로 변경

const TopContainer = () => {
  const [popularPosts, setPopularPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [hoveredPostIndex, setHoveredPostIndex] = useState(null);

  useEffect(() => {
    // 인기 게시글 목록을 가져오는 API 호출
    axios.get(`${BASE_URL}/board/list`)
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        // 조회수 기준으로 정렬하여 인기 게시글 5개 가져오기
        const sortedPosts = data.sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);
        setPopularPosts(sortedPosts);
      })
      .catch(error => {
        console.error("There was an error fetching the popular posts!", error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPostIndex((prevIndex) => (prevIndex + 1) % popularPosts.length);
    }, 3000); // 3초마다 변경
    return () => clearInterval(interval);
  }, [popularPosts.length]);

  if (popularPosts.length === 0) {
    return <div>인기 게시글을 불러오는 중입니다...</div>;
  }

  const postToShow = hoveredPostIndex !== null ? popularPosts[hoveredPostIndex] : popularPosts[currentPostIndex];

  return (
    <div className="top-container">
      <div className="top-left">
        <Link to={`/board/post/${postToShow.boardId}`}>
          <img src={postToShow.image || 'https://via.placeholder.com/800x400'} alt={postToShow.title} />
          <div className="overlay">
            <h2>{postToShow.title}</h2>
          </div>
        </Link>
      </div>
      <div className="top-right">
        <h3>인기 글 목록</h3>
        <ul>
          {popularPosts.map((post, index) => (
            <li
              key={post.boardId}
              onMouseEnter={() => setHoveredPostIndex(index)}
              onMouseLeave={() => setHoveredPostIndex(null)}
            >
              <Link to={`/board/post/${post.boardId}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopContainer;
