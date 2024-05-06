// NickName.jsx

import React, { useState, useEffect } from "react";
import "./NickName.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/api";

function NickName() {
    const navigate = useNavigate();
    const [uploadImgUrl, setUploadImgUrl] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [inputs, setInputs] = useState({
      name: "",
      nickname: "",
    });
  
    const handleProfileImageUpload = (e) => {
      const file = e.target.files[0]; // 파일 선택 창에서 선택된 파일
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImgUrl(reader.result); // 선택된 파일을 업로드 이미지 URL로 설정
      };
      reader.readAsDataURL(file); // 파일을 읽어서 URL로 변환
      setSelectedFile(file); // 선택된 파일 저장
    };
  
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
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    };
  
    const handleUpload = async () => {
      try {
        const formData = new FormData();
        formData.append("image", selectedFile);
        // 파일을 업로드할 API 엔드포인트로 POST 요청 보내기
        const response = await axios.post("/api/---주소---", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("파일 업로드 성공:", response.data);
      } catch (error) {
        console.error("파일 업로드 에러:", error);
      }
    };
  
    const goToSignIn = () => {
      navigate("/signin");
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
            <Text onClick={goToSignIn}>이전</Text>
            <Text onClick={handleNextClick}>다음</Text>
          </TextWrapper>
        </Box>
      </BackgroundColor>
    );
  }
  

export default NickName;
