import React from "react";
import styled from "styled-components";

const BackgroundColor = styled.div`
  background-color: white;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  height: 50px;
  width: 50px;
`;

const Content = styled.p``;

const Template = ({ data }) => {
  return (
    <BackgroundColor>
      <Title>{data.title}</Title>
      <Content>{data.content}</Content>
    </BackgroundColor>
  );
};

export default Template;
