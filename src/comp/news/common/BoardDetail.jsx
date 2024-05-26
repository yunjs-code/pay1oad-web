import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BoardDetail.css';

const BoardDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('토큰이 없습니다. 로그인 해주세요.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://pay1oad.com/api/board/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!data) return <p>게시글 데이터를 불러올 수 없습니다.</p>;

  return (
    <div className="board-detail">
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <p>작성자: {data.writerName}</p>
      <p>작성일: {new Date(data.createdDate).toLocaleString()}</p>
    </div>
  );
};

export default BoardDetail;
