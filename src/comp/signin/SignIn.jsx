import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 변경된 API의 기본 URL 설정
axios.defaults.baseURL = "http://pay1oad.com/api/";

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

const TextWrapper = styled.button`
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

function SignInMain() {
  const navigate = useNavigate();
  const [isIdAvailable, setIsIdAvailable] = useState(true);
  const [inputs, setInputs] = useState({
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const goToMain = () => {
    navigate("/");
  };

  const handleNextClick = () => {
    const { id, email, password, confirmPassword } = inputs;
    if (!id) {
      return alert("ID를 입력하세요.");
    } else if (!isIdAvailable) {
      alert("사용할 수 없는 ID입니다.");
    } else if (!checkInput(id)) {
      return alert("ID에 입력할 수 없는 특수문자나 단어가 포함되어 있습니다.");
    } else if (!email) {
      return alert("email을 입력하세요");
    } else if (!checkInput(email)) {
      return alert("email에 입력할 수 없는 특수문자나 단어가 포함되어 있습니다.");
    } else if (!validateEmail(email)) {
      alert("올바른 이메일 주소를 입력하세요.");
    } else if (!password) {
      return alert("password를 입력해주세요");
    } else if (!checkInput(password)) {
      return alert("password에 입력할 수 없는 특수문자나 단어가 포함되어 있습니다.");
    } else if (password.length < 8) {
      alert("비밀번호는 8자리 이상이어야 합니다.");
    } else if (!passwordRegex.test(password)) {
      alert("비밀번호는 영문자, 숫자, 특수문자를 모두 포함해야 합니다.");
    } else if (!confirmPassword) {
      return alert("password를 다시 한번 입력해 주세요");
    } else if (!checkInput(confirmPassword)) {
      return alert("confirmPassword에 입력할 수 없는 특수문자나 단어가 포함되어 있습니다.");
    } else if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      navigate("/nickname"); // 유저를 닉네임 설정 페이지로 이동
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    const checkIdAvailability = async () => {
      if (inputs.id === "") {
        setIsIdAvailable(true);
      } else {
        try {
          console.log(inputs.id);
          // axios.post를 await로 호출하여 비동기 처리를 기다립니다.
          const response = await axios.post(
            "http://pay1oad.com/api/auth/signin", 
            JSON.stringify({
              username: inputs.id,
              passwd: inputs.password
            }), 
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
          // 응답 완료 후 사용 가능 여부를 상태로 설정
          setIsIdAvailable(response.data.isAvailable);
        } catch (error) {
          console.error("Error checking ID availability:", error);
        }
      }
    };
  

    checkIdAvailability();
  }, [inputs.id]);

  const handlePasswordPaste = (e) => {
    e.preventDefault();
    alert("비밀번호는 복사 붙여넣기 할 수 없습니다.");
  };

  return (
    <BackgroundColor>
      <Box>
        <TextBoxWrapper>회원가입</TextBoxWrapper>
        <InputBoxWrapper>
          <Input
            placeholder="ID"
            name="id"
            value={inputs.id}
            onChange={handleInputChange}
          />
          <Input
            placeholder="email"
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
          />
          <Input
            placeholder="password"
            name="password"
            type="password"
            value={inputs.password}
            onChange={handleInputChange}
            onPaste={handlePasswordPaste}
          />
          <Input
            placeholder="confirm password"
            name="confirmPassword"
            type="password"
            value={inputs.confirmPassword}
            onChange={handleInputChange}
          />
        </InputBoxWrapper>
        <TextWrapper>
          <Text onClick={goToMain}>이전</Text>
          <Text onClick={handleNextClick}>다음</Text>
        </TextWrapper>
      </Box>
    </BackgroundColor>
  );
}

export default SignInMain;
