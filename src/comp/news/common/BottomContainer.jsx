import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BottomContainer.css';

const BASE_URL = 'http://pay1oad.com';  // HTTP로 변경

const BottomContainer = ({ searchTerm, selectedMainCategory, selectedSubCategory }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 게시글 목록을 가져오는 API 호출
    axios.get(`${BASE_URL}/board/list`)
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        setPosts(data);
      })
      .catch(error => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesMainCategory = selectedMainCategory === '전체글' || post.postType === selectedMainCategory;
    const matchesSubCategory = selectedSubCategory === 'ALL' || post.category === selectedSubCategory;
    const matchesSearchTerm = post.title.includes(searchTerm) || post.content.includes(searchTerm);
    return matchesMainCategory && matchesSubCategory && matchesSearchTerm;
  });

  if (filteredPosts.length === 0) {
    return <div>게시글이 없습니다.</div>;
  }

  return (
    <div className="bottom-container">
      {filteredPosts.map(post => (
        <Link key={post.boardId} to={`/board/post/${post.boardId}`} className="bottom-item">
          <img src={post.imageUrl || 'https://via.placeholder.com/150'} alt={post.title} className="post-image" />
          <div className="post-info">
            <span className="post-category">{post.category}</span>
            <h2 className="post-title">{post.title}</h2>
          </div>
          <div className="post-meta">
            <span>작성 시간: {post.createdDate}</span>
            <span>조회수: {post.viewCount}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BottomContainer;
