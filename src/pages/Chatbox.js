import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isEmpty } from "../lib/HelperFuncs";
import useUserStore from "../stores/UserStore";
import useMessageStore from "../stores/MessageStore";
import ChatList from "../components/Chat/ChatList";
import ChatDetails from "../components/Chat/ChatDetails";
import ResizableChatWindow from "../components/Chat/";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
let conversation = "chatbox-msg";
const groupChatEvent = "create-groupchat";

const Chatbox = () => {
  const history = useHistory();

  const currentUser = useUserStore((state) => state.currentUser);
  const updateUserChatList = useUserStore((state) => state.updateUserChatList);

  const currentChatID = useMessageStore((state) => state.currentChat);
  const currentChatInfo = useMessageStore((state) => state.getChatById)(
    currentChatID
  );
  const addMessageToChat = useMessageStore((state) => state.addMessageToChat);
  const getChatById = useMessageStore((state) => state.getChatById);
  const getCurrentChat = useMessageStore((state) => state.getCurrentChat);
  const addNewChat = useMessageStore((state) => state.addNewChat);

  const [conversationData, setConversationData] = useState([]);

  const handleSend = (data) => {
    if (!data) return;
    let today = new Date();
    let time =
      today.getHours() +
      ":" +
      (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());

    const data2Send = {
      id: currentChatID,
      from: currentUser.id,
      createAt: time,
      message: data,
    };
    addMessageToChat(currentChatID, data2Send);
    ipcRenderer.sendSync(conversation, data2Send);
    setConversationData((prev) => [...prev, data2Send]);
  };

  useEffect(() => {
    if (isEmpty(currentUser)) {
      history.push("/");
      return;
    }
  }, []);

  useEffect(() => {
    let incomingMessageHandler = (event, incoming) => {
      if (!incoming || !incoming.id) return;
      if (
        conversationData &&
        conversationData.length &&
        conversationData[conversationData.length - 1].id === incoming.id
      )
        return;
      addMessageToChat(incoming.id, incoming);
      // only fetch chat details if selected
      if (incoming.id === getCurrentChat()) {
        setConversationData(getChatById(getCurrentChat()).messages);
      }
    };
    ipcRenderer.on(conversation, incomingMessageHandler);

    return () => {
      ipcRenderer.removeListener(conversation, incomingMessageHandler);
    };
  }, []);

  useEffect(() => {
    const createGroupChatHander = (event, incoming) => {
      addNewChat(incoming);
      updateUserChatList(incoming.id, incoming.users);
      setConversationData([]);
    };
    ipcRenderer.on(groupChatEvent, createGroupChatHander);
    return () => {
      ipcRenderer.removeListener(groupChatEvent, createGroupChatHander);
    };
  }, []);

  useEffect(() => {
    const unsub_CurrentChat = useMessageStore.subscribe(
      (curID, prevID) => {
        if (curID !== prevID) {
          const curChat = getChatById(curID).messages || [];
          setConversationData(curChat);
        }
      },
      (state) => state.currentChat
    );
    return () => unsub_CurrentChat();
  }, []);

  return (
    <ResizableChatWindow
      ChatList={<ChatList />}
      ChatDetails={
        <ChatDetails data={conversationData} handleSend={handleSend} />
      }
    />
  );
};

export default Chatbox;
