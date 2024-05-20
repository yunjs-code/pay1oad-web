import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk"; // 명명된 내보내기로 수정
import authReducer from "./reducers/authReducer";
import otherReducer from "./reducers/otherReducer";
import boardReducer from "./reducers/boardReducer";  // 추가

// 여러 리듀서를 결합
const rootReducer = combineReducers({
  auth: authReducer,
  other: otherReducer,
  board: boardReducer,
});

// Thunk 미들웨어를 적용한 스토어 생성
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
