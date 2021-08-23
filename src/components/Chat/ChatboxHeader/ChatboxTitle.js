import React, { useState, useEffect, memo } from "react";
import useUserStore from "../../../stores/UserStore";
import useMessageStore from "../../../stores/MessageStore";
import { isEmpty } from "../../../lib/HelperFuncs";
import { getChatTitle } from "../ChatList";

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
