import React, { Fragment, useState, memo } from "react";

import styled from "styled-components";
import { StyledBtnDefault } from "../StyledButtons";

const StyledInput = styled.input`
  float: left;
  width: 96%;
  height: 2em;
  font-size: 1em;
  min-width: 400px;
  clear: both;
`;

function ChatboxInput({ sendData }) {
  const [input, setInput] = useState("");
  const handleSendData = () => {
    sendData(input);
    setInput("");
  };
  const handleInput = (e) => setInput(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendData();
  };
  return (
    <Fragment>
      <div className="inp-area">
        <StyledInput
          placeholder="type your message..."
          type="text"
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
        <StyledBtnDefault onClick={handleSendData} disabled={!input}>
          Send
        </StyledBtnDefault>
      </div>
    </Fragment>
  );
}

export default memo(ChatboxInput);
