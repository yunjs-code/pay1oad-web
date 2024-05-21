import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopContainer.css';

const popularPosts = [
  { id: 1, title: 'pay1oad', summary: '인기 글 요약 1', content: '인기 글 내용 1', image: 'data:image/png;base64,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' },
  { id: 2, title: '인기 글 제목 2', summary: '인기 글 요약 2', content: '인기 글 내용 2', image: 'https://via.placeholder.com/800x400' },
  { id: 3, title: '인기 글 제목 3', summary: '인기 글 요약 3', content: '인기 글 내용 3', image: 'https://via.placeholder.com/800x400' },
  { id: 4, title: '인기 글 제목 4', summary: '인기 글 요약 4', content: '인기 글 내용 4', image: 'https://via.placeholder.com/800x400' },
  { id: 5, title: '인기 글 제목 5', summary: '인기 글 요약 5', content: '인기 글 내용 5', image: 'https://via.placeholder.com/800x400' },
];

const TopContainer = () => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [hoveredPostIndex, setHoveredPostIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPostIndex((prevIndex) => (prevIndex + 1) % popularPosts.length);
    }, 3000); // 3초마다 변경
    return () => clearInterval(interval);
  }, []);

  const postToShow = hoveredPostIndex !== null ? popularPosts[hoveredPostIndex] : popularPosts[currentPostIndex];

  return (
    <div className="top-container">
      <div className="top-left">
        <Link to={`/post/${postToShow.id}`}>
          <img src={postToShow.image} alt={postToShow.title} />
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
              key={post.id}
              onMouseEnter={() => setHoveredPostIndex(index)}
              onMouseLeave={() => setHoveredPostIndex(null)}
            >
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopContainer;
