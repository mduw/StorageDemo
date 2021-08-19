import React, { Fragment, useEffect, useState, memo } from "react";
import { isEmpty } from "../lib/HelperFuncs";
import useUserStore from "../stores/UserStore";
import useMessageStore from "../stores/MessageStore";

const ChatListDetails = ({ chatId, index }) => {
  const currentUser = useUserStore((state) => state.currentUser);
  if (!chatId) return null;

  const getChatById = useMessageStore((state) => state.getChatById);
  const setCurrentChat = useMessageStore((state) => state.setCurrentChat);
  const getCurrentChat = useMessageStore((state) => state.getCurrentChat);
  const setSeenBy = useMessageStore((state) => state.setSeenBy);
  const getUserById = useUserStore((state) => state.getUserById);

  const [chatDetail, setChatDetail] = useState(getChatById(chatId));
  const [currentChatId, setCurrentChatId] = useState(getCurrentChat());

  const handleSelectedChat = () => {
    setCurrentChat(chatId);
    if (!chatDetail.seenBy.includes(currentUser.id)) {
      setSeenBy(chatId, currentUser.id);
    }
  };

  const getChatTitle = () => {
    let chatTitle = "";
    let maxUserDisplay = 2;
    chatDetail.users.every((userId) => {
      if (userId === currentUser.id) return true;
      maxUserDisplay--;
      chatTitle += chatTitle ? ", " : "";
      chatTitle += getUserById(userId).username;
      if (maxUserDisplay) return true;
      return false;
    });
    return chatTitle;
  };
  const getLatestMessage = () => {
    let lastMessage =
      chatDetail.messages[chatDetail.messages.length - 1].message;
    return lastMessage;
  };
  //console.log("test render child");
  useEffect(() => {
    const unsubGetChatById = useMessageStore.subscribe(
      () => {
        setChatDetail(getChatById(chatId));
      },
      (state) => state.chats
    );
    const unsubGetCurrentChat = useMessageStore.subscribe(
      (currentID, prevID) => {
        if (chatId === prevID) setCurrentChatId(""); // deselect selected one
        if (prevID !== currentID && chatId === currentID)
          setCurrentChatId(currentID);
      },
      (state) => state.currentChat
    );

    return () => {
      unsubGetChatById();
      unsubGetCurrentChat();
    };
  }, []);

  return (
    <Fragment>
      <div
        onClick={handleSelectedChat}
        className={`chat-item ${
          currentChatId && chatId === currentChatId ? "bg" : ""
        } ${!chatDetail.seenBy.includes(currentUser.id) ? "bold" : ""}`}
      >
        <div className="title">{getChatTitle()}</div>
        <div className="msg-preview">{getLatestMessage()}</div>
      </div>
    </Fragment>
  );
};

const ChatList = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  if (isEmpty(currentUser)) return null;
  //console.log("test render parent");
  return (
    <div>
      {currentUser.chatList.map((chat, index) => (
        <ChatListDetails key={index} chatId={chat} index={index} />
      ))}
    </div>
  );
};

export default memo(ChatList);
