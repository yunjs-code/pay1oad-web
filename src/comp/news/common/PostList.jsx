import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 전체 게시물 목록을 가져오는 API 호출
    axios.get('/board/list')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post.boardId} className="post-item">
          <h2><Link to={`/post/${post.boardId}`}>{post.title}</Link></h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
