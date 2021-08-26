import React, { Fragment, useEffect, useState, memo } from "react";
import useUserStore from "../../stores/UserStore";
import useMessageStore from "../../stores/MessageStore";
import VirtualizedChatList from "./VirtualizedChatList";
import { isEmpty } from "../../lib/HelperFuncs";
import SChatbox from "./StyledComp";

export const getChatTitle = (users, me, getUserById) => {
  let chatTitle = "";
  users.every((userID) => {
    if (userID === me.id) {
      if (users.length > 2)
        chatTitle = "You" + (chatTitle ? ", " : "") + chatTitle;
      return true;
    }
    chatTitle += chatTitle ? ", " : "";
    chatTitle += getUserById(userID).username;
    return true;
  });
  return chatTitle;
};

export const ChatListDetails = memo(({ chatID }) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const getChatById = useMessageStore((state) => state.getChatById);
  const setCurrentChat = useMessageStore((state) => state.setCurrentChat);
  const getCurrentChat = useMessageStore((state) => state.getCurrentChat);
  const setSeenBy = useMessageStore((state) => state.setSeenBy);
  const getUserById = useUserStore((state) => state.getUserById);

  const [chatDetail, setChatDetail] = useState(getChatById(chatID));
  const [currentChatId, setCurrentChatId] = useState(getCurrentChat());
  const [isSeen, setIsSeen] = useState(true);
  const [chatPreview, setChatPreview] = useState({
    title: "",
    message: "",
  });

  const handleSelectedChat = () => {
    setCurrentChat(chatID);
    setIsSeen(true);
    if (!chatDetail.seenBy.includes(currentUser.id)) {
      setSeenBy(chatID, currentUser.id);
    }
  };

  useEffect(() => {
    setChatPreview((prev) => ({
      ...prev,
      message: chatDetail.messages[chatDetail.messages.length - 1]?.message,
    }));
    if (!chatDetail.seenBy.includes(currentUser.id)) setIsSeen(false);
  }, [chatDetail]);

  useEffect(() => {
    const previewTitle = getChatTitle(
      chatDetail.users,
      currentUser,
      getUserById
    );
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
        className={`chat-item ${chatID === currentChatId && "bg"} ${
          !isSeen && "bold"
        }`}
      >
        <div className="title">{chatPreview.title}</div>
        <div className="msg-preview">{chatPreview.message}</div>
      </div>
    </Fragment>
  );
});

const ChatList = () => {
  const { getCurrentUser } = useUserStore();
  const [currentChatList, setCurrentChatList] = useState([]);
  const [observed, setObserved] = useState();
  const [dimension, setDimension] = useState({});

  useEffect(() => {
    if (!observed) return;
    setDimension({
      height: observed.clientHeight,
      width: observed.clientWidth,
    });
    function resizeHandler() {
      setDimension({
        height: observed.clientHeight,
        width: observed.clientWidth,
      });
    }
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [observed]);

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
    <SChatbox.ChatListWrapper ref={(el) => setObserved(el)}>
      {!isEmpty(dimension) && !isEmpty(currentChatList) && (
        <VirtualizedChatList data={currentChatList} dimension={dimension} />
      )}
    </SChatbox.ChatListWrapper>
  );
};

export default memo(ChatList);
