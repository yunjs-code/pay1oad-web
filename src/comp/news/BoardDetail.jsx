import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoard } from '../../redux/actions/boardActions';

const BoardDetail = ({ match }) => {
  const dispatch = useDispatch();
  const board = useSelector(state => state.board.currentBoard);

  useEffect(() => {
    dispatch(fetchBoard(match.params.id));
  }, [dispatch, match.params.id]);

  if (!board) return <div>Loading...</div>;

  return (
    <div>
      <h1>{board.title}</h1>
      <p>{board.content}</p>
      <p>작성자: {board.writerName}</p>
    </div>
  );
};

export default BoardDetail;
