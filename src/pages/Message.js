import React, { Fragment, memo } from "react";
import { getChatTitleFromUserList } from "../lib/HelperFuncs";
import useUserStore from "../stores/UserStore";

const Message = ({ message }) => {
  const { createAt, from, message: content } = message;
  const currentUser = useUserStore((state) => state.currentUser);
  const fromUserObj = useUserStore((state) => state.getUserById)(from);

  return (
    <Fragment>
      <div
        className={`msg ${
          from === currentUser.id ? "msg-sender" : "msg-receiver"
        }`}
      >
        <div className="msg-time">
           {createAt}
        </div>
        <div className="msg-details">{content}</div>
      </div>
    </Fragment>
  );
};

const Messages = ({ messages }) => {
  console.log('here')  
  return messages.map((each, index) => <Message key={index} message={each} />)
};

export default memo(Messages);
