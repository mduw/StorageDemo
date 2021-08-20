import React, { useEffect } from "react";
import Messages from "./Message";
import ChatboxInput from "./ChatboxInput";
import ChatboxMain from "./ChatboxMain";
import { isEmpty } from "../../lib/HelperFuncs";

const ChatboxDetails = ({ data, handleSend }) => {
  if (isEmpty(data)) return <div className="chat"></div>;
  return (
    <div className="chat">
      <ChatboxMain>
        <Messages messages={data} />
      </ChatboxMain>
      <ChatboxInput sendData={handleSend} />
    </div>
  );
};

export default ChatboxDetails;
