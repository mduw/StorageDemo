import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Messages from "./Message";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
let conversation = "chatbox-msg";

const Chatbox = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  if (!user) history.push("/");
  const [message, setMessage] = useState("");
  const [conversationData, setConversationData] = useState([]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (!message) return;
    let today = new Date();

    let time =
      today.getHours() +
      ":" +
      (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());

    const data2Send = {
      id: today.getTime(),
      from: user,
      createdAt: time,
      message: message,
    };
    setConversationData([...conversationData, data2Send]);
    ipcRenderer.sendSync(conversation, data2Send);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    let isUnsubscribed = false;
    ipcRenderer.on(conversation, async (event, incoming) => {
      if (!incoming || !incoming.id) return;
      if (
        conversationData &&
        conversationData.length &&
        conversationData[conversationData.length - 1].id === incoming.id
      )
        return;
      if (!isUnsubscribed) {
        console.log(incoming);
        setConversationData((prevState) => {
          return [...prevState, incoming];
        });
      }
    });

    return () => {
      ipcRenderer.removeListener(conversation, () => {
        console.log("unsubscribed");
        isUnsubscribed = true;
      });
    };
  }, []);

  return (
    <div>
      {conversationData && (
        <div className="chatbox-area">
          <Messages data={conversationData} />
        </div>
      )}
      <input
        className="chatbox-inp"
        placeholder="type your message..."
        type="text"
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
      />
      <button className="btn-send" onClick={handleSend} disabled={!message}>
        Send
      </button>
    </div>
  );
};

export default Chatbox;
