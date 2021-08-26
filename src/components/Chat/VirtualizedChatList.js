import React, { memo, useRef, useEffect, useState, Fragment } from "react";
import ReactDOM from "react-dom";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import SChatbox from "./StyledComp";
import useUserStore from "../../stores/UserStore";
import useMessageStore from "../../stores/MessageStore";

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

const VirtualizedChatList = ({ data, dimension }) => {
  //console.log(dimension);
  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
  });
  const rowRenderer = ({ key, index, style, parent }) => {
    return (
      <CellMeasurer
        cache={cellMeasurerCache}
        rowIndex={index}
        key={key}
        parent={parent}
      >
        <div style={style}>
          <SChatbox.ChatListDetailsWrapper>
            <ChatListDetails key={key} chatID={data[index]} />
          </SChatbox.ChatListDetailsWrapper>
        </div>
      </CellMeasurer>
    );
  };
  return (
    <SChatbox.VirtualizedChatList
      height={dimension.height}
      width={dimension.width}
      rowCount={data.length}
      rowHeight={cellMeasurerCache.rowHeight}
      rowRenderer={rowRenderer}
      deferredMeasurementCache={cellMeasurerCache}
    />
  );
};

export default memo(VirtualizedChatList);
