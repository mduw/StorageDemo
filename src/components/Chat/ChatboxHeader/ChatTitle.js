import React, { useState, useEffect, memo } from "react";
import useUserStore from "../../../stores/UserStore";
import useMessageStore from "../../../stores/MessageStore";
import { isEmpty } from "../../../lib/HelperFuncs";

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

const ChatboxTitle = () => {
  const getChatById = useMessageStore((state) => state.getChatById);
  const currentUser = useUserStore((state) => state.currentUser);
  const getUserById = useUserStore((state) => state.getUserById);
  const currentChatID = useMessageStore((state) => state.currentChat);

  const [currentChatInfo, setCurrentChatInfo] = useState(
    getChatById(currentChatID)
  );
  const [chatboxTitle, setChatboxTittle] = useState("");

  useEffect(() => {
    const unsub_CurrentChat = useMessageStore.subscribe(
      (current, prev) => {
        setCurrentChatInfo(getChatById(current));
      },
      (state) => state.currentChat
    );

    return () => unsub_CurrentChat();
  }, []);

  useEffect(() => {
    if (!isEmpty(currentChatInfo)) {
      const title = getChatTitle(
        currentChatInfo.users,
        currentUser,
        getUserById
      );
      setChatboxTittle(title);
    }
  }, [currentChatInfo]);

  return <h2 className="chatbox-title">{chatboxTitle}</h2>;
};

export default memo(ChatboxTitle);
