import React from "react";
import Template from "./Template";
import styled from "styled-components";

const newsData = [
  {
    title: "News Title 1",
    content: "1111111",
  },
  {
    title: "News Title 2",
    content: "222222",
  },
  {
    title: "News Title 3",
    content: "33333333",
  },
];
const Wrapper = styled.div`
  height: 100px;
  width: 100px;
`;

function ClubNews() {
  return (
    <Wrapper>
      <h1>Club News</h1>
      {newsData.map((newsItem, index) => {
        console.log(index + 1); // Log the index, adding 1 to start from 1 instead of 0
        return <Template key={index} data={newsItem} />;
      })}
    </Wrapper>
  );
}

export default ClubNews;
