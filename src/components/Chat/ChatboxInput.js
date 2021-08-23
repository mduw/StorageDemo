import React, { useState, memo } from "react";
import SChatbox from "./StyledComp";

function ChatboxInput({ sendData }) {
  const [input, setInput] = useState("");
  const handleSendData = () => {
    sendData(input);
    setInput("");
  };
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendData();
    } else if (e.key === "Enter" && e.shiftKey) {
      setInput((prev) => prev.concat("\n"));
    }
  };

  return (
    <SChatbox.InputField
      placeholder="type your message..."
      value={input}
      onChange={handleInput}
      onKeyDown={handleKeyDown}
    />
  );
}

export default memo(ChatboxInput);
