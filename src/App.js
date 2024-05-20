import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./comp/main/MainPage";
import SignIn from "./comp/signin/SignIn";
import LogIn from "./comp/login/LogIn";
import NickName from "./comp/signin/NickName";
import UserPage from "./comp/userpage/UserPage";
import ToS from "./comp/signin/ToS";
import { Provider } from "react-redux";
import store from "./redux/store";

// 추가된 컴포넌트들
import BoardList from "./comp/news/BoardList";
import BoardDetail from "./comp/news/BoardDetail";
import BoardForm from "./comp/news/BoardForm";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/nickname" element={<NickName />} />
            <Route path="/tos" element={<ToS />} />
            <Route path="/userpage" element={<UserPage />} />
            
            {/* 게시판 관련 경로 추가 */}
            <Route path="/board" element={<BoardList />} />
            <Route path="/board/:id" element={<BoardDetail />} />
            <Route path="/board/new" element={<BoardForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
