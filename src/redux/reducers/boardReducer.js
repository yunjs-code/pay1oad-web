import { FETCH_BOARDS, FETCH_BOARD, CREATE_BOARD, UPDATE_BOARD, DELETE_BOARD } from '../actions/boardActions';

const initialState = {
  boards: [],
  currentBoard: null,
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOARDS:
      return { ...state, boards: action.payload };
    case FETCH_BOARD:
      return { ...state, currentBoard: action.payload };
    case CREATE_BOARD:
      return { ...state, boards: [...state.boards, action.payload] };
    case UPDATE_BOARD:
      return {
        ...state,
        boards: state.boards.map(board => board.id === action.payload.id ? action.payload : board),
      };
    case DELETE_BOARD:
      return { ...state, boards: state.boards.filter(board => board.id !== action.payload) };
    default:
      return state;
  }
};

export default boardReducer;
