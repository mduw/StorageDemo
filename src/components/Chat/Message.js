import React, { Fragment, memo } from "react";
import useUserStore from "../../stores/UserStore";
import VirtualizedList from "./List";

export const Message = ({ message }) => {
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

const Messages = ({ messages, dimension }) => {
  return (
    <Fragment>
      {messages && messages.length ? (
        <VirtualizedList data={messages} dimension={dimension} />
      ) : (
        <div>No message found</div>
      )}
    </Fragment>
  );
};

export default memo(Messages);