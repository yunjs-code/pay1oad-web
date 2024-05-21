import React from 'react';
import { Link } from 'react-router-dom';
import './BottomContainer.css';

const BottomContainer = ({ posts, searchTerm, selectedMainCategory, selectedSubCategory }) => {
  if (!posts) {
    return null; // 또는 로딩 중 메시지를 표시할 수 있습니다.
  }

  const filteredPosts = posts.filter(post => {
    const matchesMainCategory = selectedMainCategory === '전체글' || post.postType === selectedMainCategory;
    const matchesSubCategory = selectedSubCategory === 'ALL' || post.category === selectedSubCategory;
    const matchesSearchTerm = post.title.includes(searchTerm) || post.content.includes(searchTerm);
    return matchesMainCategory && matchesSubCategory && matchesSearchTerm;
  });

  return (
    <div className="bottom-container">
      {filteredPosts.map(post => (
        <Link key={post.id} to={`/post/${post.id}`} className="bottom-item">
          <img src={post.imageUrl} alt={post.title} className="post-image" />
          <div className="post-info">
            <span className="post-category">{post.category}</span>
            <h2 className="post-title">{post.title}</h2>
          </div>
          <div className="post-meta">
            <span>작성 시간: {post.timestamp}</span>
            <span>조회수: {post.views}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BottomContainer;
