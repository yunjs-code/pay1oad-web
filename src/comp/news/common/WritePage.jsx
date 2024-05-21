import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WritePage.css';

const WritePage = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('웹');  // 기본 카테고리 값을 설정합니다.
  const [postType, setPostType] = useState('게시글'); // 기본 글 종류 값을 설정합니다.
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const defaultImage = 'path/to/default-image.jpg';  // 기본 이미지 경로

  const handleSubmit = () => {
    const imageUrl = image ? URL.createObjectURL(image) : defaultImage;
    const newPost = { title, content, category, postType, imageUrl };
    addPost(newPost);
    navigate('/');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="write-page">
      <h1>글쓰기</h1>
      <input 
        type="text" 
        placeholder="제목" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select 
        value={postType}
        onChange={(e) => setPostType(e.target.value)}
      >
        <option value="게시글">게시글</option>
        <option value="공지">공지</option>
        <option value="질문">질문</option>
      </select>
      {postType === '게시글' || postType === '질문' ? (
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="웹">웹</option>
          <option value="시스템">시스템</option>
          <option value="리버싱">리버싱</option>
          <option value="암호학">암호학</option>
          <option value="포렌식">포렌식</option>
        </select>
      ) : null}
      <textarea 
        placeholder="여기에 글을 작성하세요..." 
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange}
      />
      {imagePreview && <img src={imagePreview} alt="미리보기" className="image-preview" />}
      <button className="submit-button" onClick={handleSubmit}>제출</button>
    </div>
  );
};

export default WritePage;
