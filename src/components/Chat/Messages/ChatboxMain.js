import React, { useState, memo, useEffect, useRef } from "react";
import AddUserSection from "./AddUserSection";
import ChatboxTitle from "../ChatboxHeader/ChatTitle";
import AddFriendsBtn from "../ChatboxHeader/AddFriendsBtn";
import Messages from "./Message";
import useMessageStore from "../../../stores/MessageStore";
import OptimizedMsgList from "./OptimizedMsgList";

const ChatboxMain = ({ messages, ChatboxInput }) => {
  const currentChat = useMessageStore((state) => state.currentChat);
  const [addingUser, setAddingUser] = useState(false);
  const [observed, setObserved] = useState();
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const showHideGroupChat = () => {
    setAddingUser(!addingUser);
  };
  const quitCreatingGroupChat = () => setAddingUser(false);

  useEffect(() => {
    if (!observed) return;
    setDimension({
      height: observed.clientHeight,
      width: observed.clientWidth,
    });
    function handleResize() {
      setDimension({
        height: observed.clientHeight,
        width: observed.clientWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [observed]);

  if (!currentChat) return <></>;
  return (
    <>
      <div className="chatbox-block">
        <div className="chatbox-header">
          <ChatboxTitle />
          <AddFriendsBtn showFriendsToAdd={showHideGroupChat} />
        </div>

        <div className="chatbox-message" ref={(el) => setObserved(el)}>
          <AddUserSection show={addingUser} close={quitCreatingGroupChat} />
          {/* <Messages messages={messages} dimension={dimension} /> */}
          <OptimizedMsgList messages={messages}/>
        </div>
      </div>
      {ChatboxInput}
    </>
  );
};

export default memo(ChatboxMain);
