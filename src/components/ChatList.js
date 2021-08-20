import React, { Fragment, useEffect, useState, memo } from "react";
import useUserStore from "../stores/UserStore";
import useMessageStore from "../stores/MessageStore";

const ChatListDetails = ({ chatID }) => {
  const currentUser = useUserStore((state) => state.currentUser);
  //if (!chatId) return null;

  const getChatById = useMessageStore((state) => state.getChatById);
  const setCurrentChat = useMessageStore((state) => state.setCurrentChat);
  const getCurrentChat = useMessageStore((state) => state.getCurrentChat);
  const setSeenBy = useMessageStore((state) => state.setSeenBy);
  const getUserById = useUserStore((state) => state.getUserById);

  const [chatDetail, setChatDetail] = useState(getChatById(chatID));
  const [currentChatId, setCurrentChatId] = useState(getCurrentChat());
  const [isSelected, setIsSelected] = useState(false);
  const [isSeen, setIsSeen] = useState(true);

  const [chatPreview, setChatPreview] = useState({
    title: "",
    message: "",
  });

  const handleSelectedChat = () => {
    setCurrentChat(chatID);
    setIsSeen(true);
    setIsSelected(true);
    if (!chatDetail.seenBy.includes(currentUser.id)) {
      setSeenBy(chatID, currentUser.id);
      
    }
  };

  const getChatTitle = () => {
    let chatTitle = "";
    chatDetail.users.every((userId) => {
      if (userId === currentUser.id) {
        if (chatDetail.users.length > 2) chatTitle = "You, " + chatTitle;
        return true;
      }
      chatTitle += chatTitle ? ", " : "";
      chatTitle += getUserById(userId).username;
      return true;
    });
    return chatTitle;
  };
  const getLatestMessage = () => {
    let lastMessage =
      chatDetail.messages[chatDetail.messages.length - 1]?.message;
    return lastMessage;
  };
  useEffect(() => {
    setChatPreview((prev) => ({
      ...prev,
      message: chatDetail.messages[chatDetail.messages.length - 1]?.message,
    }));
    if (!chatDetail.seenBy.includes(currentUser.id)) setIsSeen(false);
  }, [chatDetail]);

  useEffect(() => {
    const previewTitle = getChatTitle();
    setChatPreview((prev) => ({ ...prev, title: previewTitle }));
    const unsubGetChatById = useMessageStore.subscribe(
      () => {
        setChatDetail(getChatById(chatID));
      },
      (state) => state.chats
    );
    const unsubGetCurrentChat = useMessageStore.subscribe(
      (currentID, prevID) => {
        if (chatID === prevID) setCurrentChatId(""); // deselect selected one
        if (prevID !== currentID && chatID === currentID)
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
        className={`chat-item ${chatID === currentChatId && "bg"} ${!isSeen && "bold"}`}
      >
        <div className="title">{chatPreview.title}</div>
        <div className="msg-preview">{chatPreview.message}</div>
      </div>
    </Fragment>
  );
};

const ChatList = () => {
  const { getCurrentUser } = useUserStore();
  const [currentChatList, setCurrentChatList] = useState([]);

  useEffect(() => {
    // retrieve current chatList
    const initialChatList = getCurrentUser()?.chatList || [];
    setCurrentChatList(initialChatList);

    // listen to changes in chatlist (user create a new group chat)
    const unsub_CurrentChatList = useUserStore.subscribe(
      (chatList) => {
        setCurrentChatList(chatList);
      },
      (state) => state.currentUser.chatList
    );
    return () => unsub_CurrentChatList();
  }, []);
  return (
    <Fragment>
      <div className="users">
      {currentChatList.map((chatID) => <ChatListDetails key={chatID} chatID={chatID} />)}
      </div>
    </Fragment>
  );
};

export default memo(ChatList);
