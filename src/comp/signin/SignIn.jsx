import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
// import "./css/style.css";

// 스타일 컴포넌트 설정
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
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Input = styled.input`
  background-color: transparent;
  border: solid gray;
  height: 60px;
  width: 80%;
  margin-top: 20px;
  border-radius: 10px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  font-size: 15px;
  background-color: transparent;
  border: none;
  align-items: center;
`;

const Text = styled.button`
  width: 100%;
  height: 30px;
  background-color: transparent;
  border: none;
`;

// 회원가입 컴포넌트
function Join() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const changeId = (event) => {
    setId(event.target.value);
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changePwd = (event) => {
    setPwd(event.target.value);
  };

  const changeCheckPwd = (event) => {
    setCheckPwd(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  // SQL 인젝션 방어 및 입력 유효성 검사 함수들
  const checkInput = (input) => {
    const specialChar = /[%=*><]/;
    if (specialChar.test(input)) {
      return false;
    }

    const sqlWord = [
      "SELECT", "INSERT", "DELETE", "UPDATE", "CREATE", "DROP", "EXEC",
      "UNION", "FETCH", "DECLARE", "TRUNCATE"
    ];
    const uppercaseInput = input.toUpperCase();
    for (let i = 0; i < sqlWord.length; i++) {
      if (uppercaseInput.includes(sqlWord[i])) {
        return false;
      }
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const handlePasswordPaste = (e) => {
    e.preventDefault();
    alert("비밀번호는 복사 붙여넣기 할 수 없습니다.");
  };

  // 아이디 중복 체크
  const checkIdDuplicate = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/user", { params: { id: id } });
      console.log("[Join.js] checkIdDuplicate() success :D");
      console.log(resp.data);

      if (resp.status === 200) {
        alert("사용 가능한 아이디입니다.");
      }
    } catch (err) {
      console.log("[Join.js] checkIdDuplicate() error :<");
      console.log(err);

      const resp = err.response;
      if (resp.status === 400) {
        alert(resp.data);
      }
    }
  };

  // 회원가입
  const join = async () => {
    if (!id) {
      return alert("ID를 입력하세요.");
    } else if (!checkInput(id)) {
      return alert("ID에 입력할 수 없는 특수문자나 단어가 포함되어 있습니다.");
    } else if (!email) {
      return alert("email을 입력하세요");
    } else if (!checkInput(email)) {
      return alert("email에 입력할 수 없는 특수문자나 단어가 포함되어 있습니다.");
    } else if (!validateEmail(email)) {
      alert("올바른 이메일 주소를 입력하세요.");
    } else if (!pwd) {
      return alert("password를 입력해주세요");
    } else if (!checkInput(pwd)) {
      return alert("password에 입력할 수 없는 특수문자나 단어가 포함되어 있습니다.");
    } else if (pwd.length < 8) {
      alert("비밀번호는 8자리 이상이어야 합니다.");
    } else if (!passwordRegex.test(pwd)) {
      alert("비밀번호는 영문자, 숫자, 특수문자를 모두 포함해야 합니다.");
    } else if (!checkPwd) {
      return alert("password를 다시 한번 입력해 주세요");
    } else if (!checkInput(checkPwd)) {
      return alert("confirmPassword에 입력할 수 없는 특수문자나 단어가 포함되어 있습니다.");
    } else if (pwd !== checkPwd) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      const req = {
        id: id,
        name: name,
        pwd: pwd,
        checkPwd: checkPwd,
        email: email,
      };

      try {
        const resp = await axios.post("http://localhost:3000/user/join", req);
        console.log("[Join.js] join() success :D");
        console.log(resp.data);

        alert(resp.data.id + "님 회원가입을 축하드립니다 🎊");
        navigate("/login");
      } catch (err) {
        console.log("[Join.js] join() error :<");
        console.log(err);

        const resp = err.response;
        if (resp.status === 400) {
          alert(resp.data);
        }
      }
    }
  };

  return (
    <BackgroundColor>
      <Box>
        <TextBoxWrapper>회원가입</TextBoxWrapper>
        <InputBoxWrapper>
          <Input
            placeholder="ID"
            name="id"
            value={id}
            onChange={changeId}
          />
          <Input
            placeholder="이름"
            name="name"
            value={name}
            onChange={changeName}
          />
          <Input
            placeholder="email"
            name="email"
            value={email}
            onChange={changeEmail}
          />
          <Input
            placeholder="password"
            name="pwd"
            type="password"
            value={pwd}
            onChange={changePwd}
            onPaste={handlePasswordPaste}
          />
          <Input
            placeholder="confirm password"
            name="checkPwd"
            type="password"
            value={checkPwd}
            onChange={changeCheckPwd}
          />
        </InputBoxWrapper>
        <TextWrapper>
          <Text onClick={() => navigate(-1)}>이전</Text>
          <Text onClick={join}>회원가입</Text>
        </TextWrapper>
      </Box>
    </BackgroundColor>
  );
}

export default Join;
