import React from 'react';
import './UserPosts.css';

const posts = [
  { id: 1, title: '1번 게시물', author: '작성자A' },
  { id: 2, title: '2번 게시물', author: '작성자B' },
];

function UserPosts({ searchQuery }) {
  const filteredPosts = posts.filter(post =>
    (post.title && searchQuery) ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) : false
  );

  return (
    <div className="user-posts">
      <h3>북마크한 글</h3>
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id} className="post">
            <span className="post-title">{post.title}</span>
            <span className="post-author">{post.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserPosts;
