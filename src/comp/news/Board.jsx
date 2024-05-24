import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainContainer from './common/MainContainer';
import TopContainer from './common/TopContainer';
import MiddleContainer from './common/MiddleContainer';
import FloatingButton from './common/FloatingButton';
import PostDetail from './common/PostDetail';
import WritePage from './common/WritePage';
import AnnouncementDetail from './common/AnnouncementDetail';
import Header from '../main/Header';
import axios from 'axios';
import './Board.css';

const BASE_URL = 'http://pay1oad.com';  // HTTP로 변경

const Board = () => {
  const location = useLocation();
  const loggedIn = location.state?.loggedIn || false;
  const username = location.state?.username || "";

  const [posts, setPosts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

    // 공지사항 목록을 가져오는 API 호출11
    axios.get(`${BASE_URL}/board/list`)
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        const announcements = data.filter(post => post.postType === '공지');
        setAnnouncements(announcements);
      })
      .catch(error => {
        console.error("There was an error fetching the announcements!", error);
      });
  }, []);

  const addPost = (newPost) => {
    // 게시글 작성 API 호출
    axios.post(`${BASE_URL}/board/write`, newPost)
      .then(response => {
        setPosts([...posts, response.data]);
        if (newPost.postType === '공지') {
          setAnnouncements([...announcements, response.data]);
        }
      })
      .catch(error => {
        console.error("There was an error creating the post!", error);
      });
  };

  const updatePost = (updatedPost) => {
    // 게시글 수정 API 호출
    axios.patch(`${BASE_URL}/board/${updatedPost.id}/update`, updatedPost)
      .then(response => {
        setPosts(posts.map(post => post.id === updatedPost.id ? response.data : post));
      })
      .catch(error => {
        console.error("There was an error updating the post!", error);
      });
  };

  const deletePost = (id) => {
    // 게시글 삭제 API 호출
    axios.delete(`${BASE_URL}/board/${id}/delete`, { data: { password: 'password' } }) // 비밀번호는 적절히 수정 필요
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the post!", error);
      });
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <MainContainer setSearchTerm={setSearchTerm} posts={posts} searchTerm={searchTerm}>
            <TopContainer />
            <MiddleContainer announcements={announcements} />
            <FloatingButton />
          </MainContainer>
        } />
        <Route path="/post/:id" element={<PostDetail posts={posts} updatePost={updatePost} deletePost={deletePost} />} />
        <Route path="/announcement/:id" element={<AnnouncementDetail />} />
        <Route path="/write" element={<WritePage addPost={addPost} />} />
      </Routes>
    </>
  );
};

export default Board;
