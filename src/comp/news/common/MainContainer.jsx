import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomContainer from './BottomContainer';
import './MainContainer.css';
import axios from 'axios';

const BASE_URL = 'http://pay1oad.com/api';  // 기본 URL 설정

const mainCategories = ['전체글', '공지', '게시글', '질문'];
const subCategories = ['ALL', '웹', '시스템', '리버싱', '암호학', '포렌식'];

const MainContainer = ({ children, setSearchTerm, searchTerm }) => {
  const [selectedMainCategory, setSelectedMainCategory] = useState('전체글');
  const [selectedSubCategory, setSelectedSubCategory] = useState('ALL');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 게시글 목록을 가져오는 API 호출
    axios.get(`${BASE_URL}/board/list`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  const handleMainCategoryClick = (category) => {
    setSelectedMainCategory(category);
    setSelectedSubCategory('ALL'); // 메인 카테고리가 변경되면 서브 카테고리는 기본값으로 설정
  };

  const handleSubCategoryClick = (category) => {
    setSelectedSubCategory(category);
  };

  return (
    <div className="main-container">
      <div className="content-container">
        {children}
        <div className="filter-search-container">
          <div className="main-category-filter">
            {mainCategories.map(category => (
              <button
                key={category}
                className={`category-button ${selectedMainCategory === category ? 'active' : ''}`}
                onClick={() => handleMainCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {selectedMainCategory === '게시글' || selectedMainCategory === '질문' ? (
            <div className="sub-category-filter">
              {subCategories.map(category => (
                <button
                  key={category}
                  className={`category-button ${selectedSubCategory === category ? 'active' : ''}`}
                  onClick={() => handleSubCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          ) : null}
          <div className="search-container">
            <input
              type="text"
              placeholder="검색어"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <BottomContainer 
          posts={posts} 
          searchTerm={searchTerm} 
          selectedMainCategory={selectedMainCategory} 
          selectedSubCategory={selectedSubCategory} 
        />
      </div>
    </div>
  );
};

export default MainContainer;
