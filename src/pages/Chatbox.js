import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isEmpty } from "../lib/HelperFuncs";
import useUserStore from "../stores/UserStore";
import ChatList from "./ChatList";
import Messages from "./Message";
import useMessageStore from "../stores/MessageStore";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
let conversation = "chatbox-msg";

const Chatbox = () => {
  const history = useHistory();
  const currentUser = useUserStore((state) => state.currentUser);

  const currentChatID = useMessageStore((state) => state.currentChat);
  const currentChatObj = useMessageStore((state) => state.getChatById)(
    currentChatID
  );

  const addMessageToChat = useMessageStore(state=>state.addMessageToChat);
  const getChatById = useMessageStore(state=>state.getChatById);
  const getCurrentChat = useMessageStore(state=>state.getCurrentChat);

  if (isEmpty(currentUser)) {
    history.push("/");
  }
  const [message, setMessage] = useState("");
  const [conversationData, setConversationData] = useState([]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (!isEmpty(currentChatObj.messages)) {
      setConversationData(currentChatObj.messages);
    }
  }, [currentChatObj.messages]);

  const handleSend = () => {
    if (!message) return;
    let today = new Date();

    let time =
      today.getHours() +
      ":" +
      (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());

    const data2Send = {
      id: currentChatID,
      from: currentUser.id,
      createAt: time,
      message: message,
    };
    addMessageToChat(currentChatID, data2Send);
    ipcRenderer.sendSync(conversation, data2Send);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    let eventHandler = (event, incoming) => {
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
    ipcRenderer.on(conversation, eventHandler);

    return () => {
      ipcRenderer.removeListener(conversation, eventHandler);
    };
  }, []);

  return (
    <div className="chat-container">
      <div className="users">
        <ChatList />
      </div>
      <div className="chat">
        {!isEmpty(conversationData) && (
          <Fragment>
            <div className="chatbox-area">
              <Messages data={conversationData} />
            </div>

            <div className="inp-area">
              <input
                className="chatbox-inp"
                placeholder="type your message..."
                type="text"
                value={message}
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown}
              />
              <button
                className="btn-send"
                onClick={handleSend}
                disabled={!message}
              >
                Send
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Chatbox;
