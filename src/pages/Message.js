import React, { Fragment, memo } from "react";
import useUserStore from "../stores/UserStore";

const Message = ({ data }) => {
  const { createAt, from, message } = data;
  const currentUser = useUserStore((state) => state.currentUser);
  const fromUserObj = useUserStore((state) => state.getUserById)(from);

  return (
    <Fragment>
      <div
        className={`msg ${
          from === currentUser.id ? "msg-sender" : "msg-receiver"
        }`}
      >
        <div className="msg-author">
          {fromUserObj && <h3>{fromUserObj.username}</h3>} {createAt}
        </div>
        <div className="msg-details">{message}</div>
      </div>
    </Fragment>
  );
};

const Messages = ({ data }) => {
  return data.map((each, index) => <Message key={index} data={each} />);
};

export default memo(Messages);
