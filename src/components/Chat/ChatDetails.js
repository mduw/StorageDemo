import React, { memo } from "react";
import Messages from "./Message";
import ChatboxInput from "./ChatboxInput";
import ChatboxMain from "./ChatboxMain";
import { isEmpty } from "../../lib/HelperFuncs";
import SChatbox from "./StyledComp";

const ChatboxDetails = ({ data, handleSend }) => {
  return (
    <SChatbox.Wrapper>
      <ChatboxMain
        messages={data}
        ChatboxInput={<ChatboxInput sendData={handleSend} />}
      />
    </SChatbox.Wrapper>
  );
};

export default memo(ChatboxDetails);
