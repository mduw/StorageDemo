import styled, { keyframes } from "styled-components";
import SDefault from "../DefaultStyledComp";

const SStorage = {};

SStorage.Wrapper = styled.div`
  padding: 24px;
  min-width: 500px;
`;

SStorage.Btn = styled(SDefault.Btn)`
  float: right;
  width: 100px;
  margin: 20px 0 20px 20px;
  text-align: center;
  outline: none;
  opacity: 0.9;
  &:hover { opacity: 1; }
`;

SStorage.InfoWrapper = styled.span`
  position: relative;
  top: 50%;
`;

SStorage.Value = styled.span`
  font-size: 1.2em;
  font-weight: bold;
`;

SStorage.Section = styled.section`
  display: block;
  border-top: 0px solid lightgray;
  margin: 26px auto;
  height: 60px;
  width: 50%;
  padding: 0 10px;
  @media (max-width: 990px) {
    width: 100%;
  }
`;

SStorage.SectionOuter = styled(SStorage.Section)`
  border: none;
  margin-top: 10vh;
`;
SStorage.Btn.Clear = styled(SStorage.Btn)`
  background: #D44500;
  width: 100px;
`;
SStorage.Btn.ClearAll = styled(SStorage.Btn)`
  margin: -30px auto;
  width: 220px;
  float: right;
  background: #D44500;
`;

SStorage.InputField = styled(SDefault.InputField)`
  float: right;
  margin: 20px 0 0 20px;
  text-align: center;
  padding: 8px;
  width: 35px;
`;

export default SStorage;
