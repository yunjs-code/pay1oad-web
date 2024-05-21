import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // 백엔드 서버 주소

// Action Types
export const FETCH_BOARDS = 'FETCH_BOARDS';
export const FETCH_BOARD = 'FETCH_BOARD';
export const CREATE_BOARD = 'CREATE_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';

// Action Creators
export const fetchBoards = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/post/list`);
    dispatch({ type: FETCH_BOARDS, payload: response.data });
  } catch (error) {
    console.error('Error fetching boards:', error);
  }
};

export const fetchBoard = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/post/${id}`);
    dispatch({ type: FETCH_BOARD, payload: response.data });
  } catch (error) {
    console.error('Error fetching board:', error);
  }
};

export const createBoard = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/post/write`, data);
    dispatch({ type: CREATE_BOARD, payload: response.data });
  } catch (error) {
    console.error('Error creating board:', error);
  }
};

export const updateBoard = (id, data) => async (dispatch) => {
  try {
    const response = await axios.patch(`${API_URL}/post/${id}/update`, data);
    dispatch({ type: UPDATE_BOARD, payload: response.data });
  } catch (error) {
    console.error('Error updating board:', error);
  }
};

export const deleteBoard = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/post/${id}/delete`);
    dispatch({ type: DELETE_BOARD, payload: id });
  } catch (error) {
    console.error('Error deleting board:', error);
  }
};
