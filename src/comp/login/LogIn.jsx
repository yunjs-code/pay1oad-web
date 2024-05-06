import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

const BackgroundColor = styled.div`
  background-color: #36567d;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background-color: #ffffff;
  height: 600px;
  width: 500px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 700px) {
    height: 500px;
    width: 350px;
  }
`;
const TextBoxWrapper = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputBoxWrapper = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Input = styled.input`
  background-color: transparent;
  height: 60px;
  width: 80%;
  margin-top: 20px;
  border-radius: 10px;
`;
const ButtonCss = styled.button`
  height: 60px;
  width: 80%;
  margin-bottom: 10px;
  border-radius: 10px;
`;
const SignIn = styled.span`
  height: 50%;
  width: 100%;
  color: blue;
`;
const Blank = styled.div`
  height: 30px;
  width: 100%;
`;
const Form = styled.div`
  width: 100%;
  height: 200px;
`;

function LogIn() {
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg("");
        setLoading(false);
      }, 1500);
    }
  }, [msg]);

  const goToSign = () => {
    navigate("/SignIn");
  };

  //sql injection 예방
  const checkInput = (input) => {
    //특수문자
    const specialChar = /[%=*><]/;
    if (specialChar.test(input)) {
      return false;
    }

    //sql 문법
    const sqlWord = [
      "SELECT",
      "INSERT",
      "DELETE",
      "UPDATE",
      "CREATE",
      "DROP",
      "EXEC",
      "UNION",
      "FETCH",
      "DECLARE",
      "TRUNCATE",
    ];
    const uppercaseInput = input.toUpperCase();
    for (let i = 0; i < sqlWord.length; i++) {
      if (uppercaseInput.includes(sqlWord[i])) {
        return false;
      }
    }
    return true;
  };

  const LoginFunc = async (e) => {
    e.preventDefault();
    if (!username) {
      return alert("ID를 입력하세요.");
    } else if (!passwd) {
      return alert("Password를 입력하세요.");
    } else if (!checkInput(username) || !checkInput(passwd)) {
      return alert(
        "사용할 수 없는 특수문자나 단어, 한글이(가) 포함되어 있습니다."
      );
    } else {
      setLoading(true);

      const data = {
        username,
        passwd,
      };

      console.log(data);
      console.dir(data);

      axios
        .post("/auth/signin", data)
        .then((response) => {
          console.log("서버 응답 데이터:", response);
          const { error, data } = response;
          if (error) {
            // 에러가 있는 경우
            console.log("에러");
            setMsg(error); // 에러 메시지를 설정
          } else {
            // 에러가 없는 경우
            const { accessToken, userInfo } = data;
            console.log(accessToken);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            dispatch(loginUser(userInfo)); // 사용자 정보를 Redux store에 저장
            navigate("/", { state: { loggedIn: true, username: data.username}}); // mainhome으로 이동
          }
        })
        .catch((error) => {
          if (error.response) {
            const { status } = error.response;
            if (status === 400) {
              setMsg("ID, Password를 입력하세요.");
            } else if (status === 401) {
              setMsg("존재하지 않는 ID입니다.");
            } else if (status === 402) {
              setMsg("Password가 틀립니다.");
            } else {
              setMsg("서버 오류가 발생했습니다.");
            }
          } else {
            setMsg("서버에 연결할 수 없습니다.");
          }
        });
    }
  };

  return (
    <BackgroundColor>
      <Box>
        <TextBoxWrapper>로그인</TextBoxWrapper>

        <InputBoxWrapper>
          <Form onSubmit={LoginFunc}>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
            />
          </Form>
          <p style={{ textAlign: "right" }}>비밀번호 찾기</p>

          <Blank />
          <form onSubmit={LoginFunc}>
            <ButtonCss type="submit" disabled={loading}>
              로그인
            </ButtonCss>
          </form>
          <ButtonCss>카카오 로그인</ButtonCss>
          <Blank />
          <p>
            Pay1oad가 처음이라면?{" "}
            <SignIn style={{ color: "blue" }} onClick={goToSign}>
              회원가입
            </SignIn>
          </p>
        </InputBoxWrapper>
      </Box>
    </BackgroundColor>
  );
}

export default LogIn;
