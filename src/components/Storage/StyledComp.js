import styled, { keyframes } from "styled-components";
import SDefault from "../DefaultStyledComp";

const SStorage = {};

SStorage.Wrapper = styled.div`
  padding: 24px;
  min-width: 680px;
  font-size: 18px;
`;

SStorage.Btn = styled(SDefault.Btn)`
  float: right;
  width: 100px;
  margin: 40px 0 35px 30px;
  text-align: center;
  outline: none;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
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
  position: relative;
  display: block;
  border-top: 1px solid lightgray;
  margin: 26px auto;
  clear: both;
  height: 100px;
  width: 80%;
  padding: 0 10px;
  @media (max-width: 990px) {
    width: 100%;
  }
`;

SStorage.SectionOuter = styled(SStorage.Section)`
  border: none;
  margin-top: 10vh;
`;
SStorage.PlainSectionOuter = styled(SStorage.Section)`
  border: none;
`;
SStorage.Btn.Clear = styled(SStorage.Btn)`
  background: #d44500;
  width: 100px;
`;
SStorage.Btn.ClearAll = styled(SStorage.Btn)`
  margin: -30px auto;
  width: 220px;
  float: right;
  background: #d44500;
`;

SStorage.InputField = styled(SDefault.InputField)`
  float: right;
  margin: 40px 0 0 20px;
  text-align: center;
  padding: 8px;
  border: none;
  border-bottom: 1px solid black;
  width: ${(props) => (props.width ? props.width : "40px")};
`;

SStorage.StaleData = styled.h3`
  display: block;
  margin: 10px 0;
  color: red;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default SStorage;
