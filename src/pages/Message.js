import React, { Fragment, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Message = ({ data }) => {
  const { user } = useContext(UserContext);
  const { createdAt, from, message } = data;
  return (
    <Fragment>
      <div className={`msg ${from === user ? "msg-sender" : "msg-receiver"}`}>
        <div className="msg-author">
          <h3>{from}</h3> {createdAt}
        </div>
        <div className="msg-details">{message}</div>
      </div>
    </Fragment>
  );
};

const Messages = ({ data }) => {
  return data.map((each, index) => <Message key={index} data={each} />);
};

export default Messages;
