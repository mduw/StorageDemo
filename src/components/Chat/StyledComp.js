import styled from "styled-components";
import SDefault from "../DefaultStyledComp";
import { List } from "react-virtualized";

const SChatbox = {};

SChatbox.Wrapper = styled.div`
  display: block;
  width: auto;
  height: 100%;
  padding: 0;
  margin: 0;
`;

SChatbox.Messages = styled.div`
  height: calc(100% - 50px);
`;

SChatbox.InputWrapper = styled.div`
  position: absolute;
  width: inherit;
  bottom: 0;
  resize: none;
  margin: 0;
  border-top: 2px solid #f0f0f0;
  height: auto;
`;

SChatbox.InputField = styled.textarea`
  bottom: 0;
  position: absolute;
  padding: 8px;
  margin: auto 2px 0 2px;
  width: calc(100% - 20px);
  outline: none;
  border: none;
  height: auto;

  &::placeholder {
    text-align: left;
  }
  &:focus,
  &:active {
    outline: none;
  }
  font-size: 1.1em;
  resize: none;
`;

SChatbox.Btn = styled(SDefault.Btn)`
  display: inline-block;
  width: 100px;
`;

SChatbox.VirtualizedList = styled(List)`
  outline: none;
  padding: 5px 10px 20px 10px;
`;

SChatbox.VirtualizedChatList = styled(List)`
  outline: none;
`;

SChatbox.ChatListWrapper = styled.div`
  width: 300px;
  height: 100%;
  overflow: scroll;
`;

SChatbox.ChatListDetailsWrapper = styled.div`
  padding-bottom: 15px;
  height: 50px; 
  width: 100%;
`;

export default SChatbox;
