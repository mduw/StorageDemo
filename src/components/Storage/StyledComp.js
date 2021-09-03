import styled, { keyframes } from "styled-components";
import SDefault from "../DefaultStyledComp";

const SStorage = {};

SStorage.Wrapper = styled.div`
  padding: 24px;
  min-width: 500px;
`;

SStorage.Btn = styled(SDefault.Btn)`
  float: right;
  margin: 20px 0 20px 20px;
  text-align: center;
  outline: none;
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
  border-top: 1px solid lightgray;
  margin: 20px auto;
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

SStorage.ClearAllBtn = styled(SDefault.Btn)`
  margin: -30px auto;
  width: 200px;
  float: right;
`;

export default SStorage;
