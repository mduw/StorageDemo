import styled from "styled-components";
import SDefault from "../DefaultStyledComp";

const SLogin = {};

SLogin.Wrapper = styled.div`
  height: 100vh;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

SLogin.Main = styled.div`
  & > * {
    text-align: center;
  }
  text-align: center;
`;

SLogin.Btn = styled(SDefault.Btn)`
  display: block;
  margin: 20px auto;
`;

SLogin.InputField = styled(SDefault.InputField)`
  display: block;
  margin: 20px auto;
  min-width: 500px;
  text-align: center;
`;

export default SLogin;
