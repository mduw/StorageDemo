import React, { Fragment, memo, useState, useEffect } from "react";
import { getChatTitleFromUserList } from "../../lib/HelperFuncs";
import useUserStore from "../../stores/UserStore";
import useMessageStore from "../../stores/MessageStore";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
let conversation = "chatbox-msg";
const groupChatEvent = "create-groupchat";

const Message = ({ message }) => {
  const { createAt, from, message: content } = message;
  const currentUser = useUserStore((state) => state.currentUser);
  return (
    <Fragment>
      <div
        className={`msg ${
          from === currentUser.id ? "msg-sender" : "msg-receiver"
        }`}
      >
        <div className="msg-time">{createAt}</div>
        <div className="msg-details">{content}</div>
      </div>
    </Fragment>
  );
};

const Messages = ({messages}) => {
  return (
    <Fragment>
      {messages && messages.length &&
        messages.map((each, index) => <Message key={index} message={each} />)}
    </Fragment>
  );
};

export default memo(Messages);
