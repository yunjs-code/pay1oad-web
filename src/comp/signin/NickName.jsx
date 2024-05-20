import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://pay1oad.com/api";

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

const ImgWrapper = styled.div`
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

const ProfileImgWrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #cccccc;
  cursor: pointer;
  background-image: url(${(props) => props.img});
  background-size: cover;
`;

function NickName() {
  const navigate = useNavigate();
  const [uploadImgUrl, setUploadImgUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const checkInput = (input) => {
    const specialChar = /[%=*><]/;
    if (specialChar.test(input)) {
      return false;
    }

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleNextClick = () => {
    const { name, nickname } = inputs;
    if (!name) {
      return alert("이름을 입력하세요.");
    } else if (!nickname) {
      return alert("닉네임을 입력하세요.");
    } else if (!checkInput(name)) {
      return alert(
        "이름에 입력할 수 없는 특수문자나 단어가 포함되어 있습니다.."
      );
    } else if (!checkInput(nickname)) {
      return alert(
        "닉네임에 입력할 수 없는 특수문자나 단어가 포함되어 있습니다.."
      );
    } else {
      navigate("/tos");
    }
  };

  return (
    <BackgroundColor>
      <Box>
        <TextBoxWrapper>회원가입</TextBoxWrapper>
        <ImgWrapper>
          <Text>프로필 사진</Text>
          <ProfileImgWrapper>
            <ProfileImg
              onClick={() => document.getElementById("uploadImg").click()}
              img={uploadImgUrl}
            />
            <Input
              type="file"
              id="uploadImg"
              accept="image/*"
              onChange={handleProfileImageUpload}
              style={{ display: "none" }}
            />
          </ProfileImgWrapper>
        </ImgWrapper>
        <InputBoxWrapper>
          <Input
            placeholder="name"
            name="name"
            value={inputs.name}
            onChange={handleInputChange}
          />
          <Input
            placeholder="nickname"
            name="nickname"
            value={inputs.nickname}
            onChange={handleInputChange}
          />
        </InputBoxWrapper>
        <TextWrapper>
          <Text onClick={() => navigate("/signin")}>이전</Text>
          <Text onClick={handleNextClick}>다음</Text>
        </TextWrapper>
      </Box>
    </BackgroundColor>
  );
}

export default NickName;
