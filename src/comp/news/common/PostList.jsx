import React from 'react';
import { Link } from 'react-router-dom';

const posts = [
  { id: 1, title: '게시물 제목 1', summary: '게시물 요약 1' },
  { id: 2, title: '게시물 제목 2', summary: '게시물 요약 2' },
  { id: 3, title: '게시물 제목 3', summary: '게시물 요약 3' },
];

const PostList = () => {
  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post.id} className="post-item">
          <h2><Link to={`/post/${post.id}`}>{post.title}</Link></h2>
          <p>{post.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
