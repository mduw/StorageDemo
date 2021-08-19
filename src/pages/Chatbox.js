import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isEmpty } from "../lib/HelperFuncs";
import useUserStore from "../stores/UserStore";
import ChatList from "./ChatList";
import Messages from "./Message";
import useMessageStore from "../stores/MessageStore";
import AddUserSectionDetails from "./AddUsersSection";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
let conversation = "chatbox-msg";
const groupChatEvent = "create-groupchat";

const Chatbox = () => {
  const history = useHistory();
  const usersXXXXX = useUserStore(state=>state.users);
  console.log(usersXXXXX);
  const currentUser = useUserStore((state) => state.currentUser);
  const getUserById = useUserStore((state) => state.getUserById);
  const updateUserChatList = useUserStore(state=>state.updateUserChatList);

  const currentChatID = useMessageStore((state) => state.currentChat);
  const currentChatObj = useMessageStore((state) => state.getChatById)(
    currentChatID
  );
  const addMessageToChat = useMessageStore((state) => state.addMessageToChat);
  const getChatById = useMessageStore((state) => state.getChatById);
  const getCurrentChat = useMessageStore((state) => state.getCurrentChat);
  const addNewChat = useMessageStore(state=>state.addNewChat);
  
  const [addingUser, setAddingUser] = useState(false);

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
    console.log('data2send', data2Send)
    addMessageToChat(currentChatID, data2Send);
    ipcRenderer.sendSync(conversation, data2Send);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

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

    const createGroupChatHander = (event, incoming) => {
      console.log('RECEIVED CREATE', incoming);
      addNewChat(incoming);
      updateUserChatList(incoming.id, incoming.users);
    };
    ipcRenderer.on(conversation, incomingMessageHandler);

    ipcRenderer.on(groupChatEvent, createGroupChatHander);

    return () => {
      ipcRenderer.removeListener(conversation, incomingMessageHandler);
      ipcRenderer.removeListener(groupChatEvent, createGroupChatHander);

    };
  }, []);

  useEffect(() => {
    setAddingUser(false);
  }, [currentChatID]);

  const getChatboxTitle = () => {
    let chatTitle = "";
    currentChatObj.users.every((userId) => {
      if (userId === currentUser.id) return true;
      chatTitle += chatTitle ? ", " : "";
      chatTitle += getUserById(userId).username;
      return true;
    });
    return chatTitle;
  };
  const handleCloseAddingUser = () => setAddingUser(false);
  return (
    <div className="chat-container">
      <div className="users">
        <ChatList />
      </div>
      <div className="chat">
        {!isEmpty(conversationData) && (
          <Fragment>
            <div className="chatbox-area">
              <div className="chatbox-header">
                <h2 className="chatbox-title">{getChatboxTitle()}</h2>
                <div className="btn" onClick={() => setAddingUser(!addingUser)}>
                  Add Friends +
                </div>
              </div>
              <Messages messages={conversationData} />
              <div className="wrapper">
                <div
                  className={`${addingUser ? "slide wrapperslide" : "slide"}`}
                >
                  <div className="btn" onClick={() => setAddingUser(false)}>
                    X
                  </div>
                  <div className="userList">
                    <AddUserSectionDetails show={addingUser} currentChat={currentChatObj} close={handleCloseAddingUser} />
                    <br />
                  </div>
                </div>
              </div>
            </div>

            {!addingUser && (
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
                  className="btn-blue"
                  onClick={handleSend}
                  disabled={!message}
                >
                  Send
                </button>
              </div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Chatbox;
