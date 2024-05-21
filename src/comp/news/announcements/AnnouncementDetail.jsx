import React from 'react';
import { useParams } from 'react-router-dom';

const AnnouncementDetail = ({ announcements }) => {
  const { id } = useParams();
  const announcement = announcements.find(a => a.id === parseInt(id));

  if (!announcement) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h1>{announcement.title}</h1>
      <p>{announcement.content}</p>
    </div>
  );
};

export default AnnouncementDetail;
