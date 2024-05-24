import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://pay1oad.com';  // 기본 URL 설정

const AnnouncementDetail = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    // 공지사항 조회 API 호출
    axios.get(`${BASE_URL}/board/${id}`)
      .then(response => {
        setAnnouncement(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the announcement!", error);
      });
  }, [id]);

  if (!announcement) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h1>{announcement.title}</h1>
      <p>{announcement.content}</p>
      <div className="announcement-info">
        <span>작성 시간: {announcement.createdDate}</span>
        <span>작성자: {announcement.writerName}</span>
      </div>
    </div>
  );
};

export default AnnouncementDetail;
