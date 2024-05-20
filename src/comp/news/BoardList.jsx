import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards } from '../../redux/actions/boardActions';

const BoardList = () => {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.board.boards);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  return (
    <div>
      <h1>게시판 목록</h1>
      <ul>
        {boards.map(board => (
          <li key={board.id}>
            <a href={`/board/${board.id}`}>{board.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
