import React from "react";
import SContainer from "../components/Login/StyledComp";
import SHome from "../components/Home/StyledComp";

const Home = () => {
  return (
    <SContainer.Wrapper>
      <SContainer.Main>
        <h2>Welcome! Please select your preference</h2>
        <SHome.StyledLink to="/chat">Open Chatapp</SHome.StyledLink>
        <SHome.StyledLink to="/storagedemo">Open Storage demo</SHome.StyledLink>
      </SContainer.Main>
    </SContainer.Wrapper>
  );
};

export default Home;
