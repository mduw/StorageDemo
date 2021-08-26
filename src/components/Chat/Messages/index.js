import React, { memo } from "react";
import ChatboxInput from "./ChatboxInput";
import ChatboxMain from "./ChatboxMain";

const ChatboxDetails = ({ data, handleSend }) => {
  return (
    <ChatboxMain
      messages={data}
      ChatboxInput={<ChatboxInput sendData={handleSend} />}
    />
  );
};

export default memo(ChatboxDetails);
