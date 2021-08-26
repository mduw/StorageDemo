import React, { memo } from "react";
import Messages from "./Message";
import ChatboxInput from "./ChatboxInput";
import ChatboxMain from "./ChatboxMain";
import { isEmpty } from "../../lib/HelperFuncs";
import SChatbox from "./StyledComp";

const ChatboxDetails = ({ data, handleSend }) => {
  return (
    <ChatboxMain
      messages={data}
      ChatboxInput={<ChatboxInput sendData={handleSend} />}
    />
  );
};

export default memo(ChatboxDetails);
