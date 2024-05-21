import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContainer from '../common/MainContainer';
import TopContainer from '../common/TopContainer';
import MiddleContainer from '../common/MiddleContainer';
import FloatingButton from '../common/FloatingButton';
import PostDetail from '../common/PostDetail';
import WritePage from './WritePage';
import AnnouncementDetail from '../announcements/AnnouncementDetail';
import './Board.css';

const Board = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: '게시글 1', content: '게시글 내용 1', category: '웹', postType: '게시글', imageUrl: 'path/to/default-image.jpg', timestamp: '2023-05-20 14:30', views: 120 },
    { id: 2, title: '게시글 2', content: '게시글 내용 2', category: '시스템', postType: '공지', imageUrl: 'path/to/default-image.jpg', timestamp: '2023-05-21 09:20', views: 85 },
    // 다른 초기 게시글들
  ]);
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: '공지사항 1: 집에 좀 보내주세요', content: '공지사항 내용 1: 집에 좀 보내주세요.' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const addPost = (newPost) => {
    setPosts([...posts, { ...newPost, id: posts.length + 1, timestamp: new Date().toLocaleString(), views: 0 }]);
    if (newPost.postType === '공지') {
      setAnnouncements([...announcements, { id: announcements.length + 1, title: newPost.title, content: newPost.content }]);
    }
  };

  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainContainer setSearchTerm={setSearchTerm} posts={posts} searchTerm={searchTerm}>
            <TopContainer />
            <MiddleContainer announcements={announcements} />
            <FloatingButton/>
          </MainContainer>
        } />
        <Route path="/post/:id" element={<PostDetail posts={posts} updatePost={updatePost} deletePost={deletePost} />} />
        <Route path="/announcement/:id" element={<AnnouncementDetail announcements={announcements} />} />
        <Route path="/write" element={<WritePage addPost={addPost} />} />
      </Routes>
    </Router>
  );
};

export default Board;
