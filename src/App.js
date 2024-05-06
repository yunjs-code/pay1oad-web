import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./comp/main/MainPage";
import SignIn from "./comp/signin/SignIn";
import LogIn from "./comp/login/LogIn";
import ClubNews from "./comp/news/NewsTemplate";
import NickName from "./comp/signin/NickName";
import UserPage from "./comp/userpage/UserPage";
import ToS from "./comp/signin/ToS";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/clubnews" element={<ClubNews />} />
            <Route path="/nickname" element={<NickName />} />
            <Route path="/tos" element={<ToS />} />
            <Route path="/userpage" element={<UserPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
