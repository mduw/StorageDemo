import React, { Fragment, memo, forwardRef, useState, useEffect } from "react";
import useUserStore from "../../../stores/UserStore";
import VirtualizedMessageList from "./MessageList";

// export const Message = memo(({ message }) => {
//   const { createAt, from, message: content } = message;
//   const currentUser = useUserStore((state) => state.currentUser);
//   return (
//     <Fragment>
//       <div
//         className={`msg ${
//           from === currentUser.id ? "msg-sender" : "msg-receiver"
//         }`}
//       >
//         <div className="msg-time">{createAt}</div>
//         <div className="msg-details">{content}</div>
//       </div>
//     </Fragment>
//   );
// });

export const Message = memo(
  forwardRef((props, ref) => {
    const { createAt, from, message: content } = props.message;
    const currentUser = useUserStore((state) => state.currentUser);
    const getUserById = useUserStore((state) => state.getUserById);
    const [name, setName] = useState("");
    useEffect(()=>{
      const userInfo = getUserById(from);
      if (userInfo && userInfo.username) setName(userInfo.username);
    },[]);
    return (
      <Fragment>
        {from === currentUser.id ? (
          <div ref={ref} className="msg-container-sender">
            <div className="msg-sender">{content}</div>
          </div>
        ) : (
          <div ref={ref} className="msg-container-receiver">
            <span className="msg-username">{name.slice(0,2).toUpperCase()}</span>
            <div className="msg-receiver">{content}</div>
          </div>
        )}
      </Fragment>
    );
  })
);

const Messages = ({ messages, dimension }) => {
  return (
    <Fragment>
      {messages && messages.length ? (
        <VirtualizedMessageList data={messages} dimension={dimension} />
      ) : (
        <div>No message found</div>
      )}
    </Fragment>
  );
};

export default memo(Messages);
