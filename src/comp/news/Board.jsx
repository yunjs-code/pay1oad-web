import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BoardList from './common/BoardList';
import BoardDetail from './common/BoardDetail';
import BoardWrite from './common/BoardWrite';
import Header from '../main/Header';


const Board = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<BoardList />} />
      <Route path="/:id" element={<BoardDetail />} />
      <Route path="/write" element={<BoardWrite />} />
      
    </Routes>
    </>
  );
};

export default Board;
