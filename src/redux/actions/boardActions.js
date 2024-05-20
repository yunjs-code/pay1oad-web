import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Action Types
export const FETCH_BOARDS = 'FETCH_BOARDS';
export const FETCH_BOARD = 'FETCH_BOARD';
export const CREATE_BOARD = 'CREATE_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';

// Action Creators
export const fetchBoards = () => async (dispatch) => {
  const response = await axios.get(`${API_URL}/board/list`);
  dispatch({ type: FETCH_BOARDS, payload: response.data });
};

export const fetchBoard = (id) => async (dispatch) => {
  const response = await axios.get(`${API_URL}/board/${id}`);
  dispatch({ type: FETCH_BOARD, payload: response.data });
};

export const createBoard = (data) => async (dispatch) => {
  const response = await axios.post(`${API_URL}/board/write`, data);
  dispatch({ type: CREATE_BOARD, payload: response.data });
};

export const updateBoard = (id, data) => async (dispatch) => {
  const response = await axios.patch(`${API_URL}/board/${id}/update`, data);
  dispatch({ type: UPDATE_BOARD, payload: response.data });
};

export const deleteBoard = (id) => async (dispatch) => {
  await axios.delete(`${API_URL}/board/${id}/delete`);
  dispatch({ type: DELETE_BOARD, payload: id });
};
