import React, { useState, useEffect, memo } from "react";
import AddUserSectionDetails from "./AddUsersSectionDetails";
import useMessageStore from "../../../stores/MessageStore";

const AddUserSection = ({ show, close }) => {
  const getChatById = useMessageStore((state) => state.getChatById);
  const currentChatID = useMessageStore((state) => state.currentChat);

  const [currentChatInfo, setCurrentChatInfo] = useState(
    getChatById(currentChatID)
  );
  useEffect(() => {
    const unsub_CurrentChat = useMessageStore.subscribe(
      (current, prev) => {
        setCurrentChatInfo(getChatById(current));
      },
      (state) => state.currentChat
    );

    return () => {
      unsub_CurrentChat();
      close();
    };
  }, [currentChatID]);

  return (
    <div className="wrapper">
      <div className={`${show ? "slide wrapperslide" : "slide"}`}>
        <div className="btn" onClick={close}>
          X
        </div>
        <div className="userList">
          {currentChatInfo.users && (
            <AddUserSectionDetails
              show={show}
              usersInGroupChat={currentChatInfo.users}
              close={close}
            />
          )}
          <br />
        </div>
      </div>
    </div>
  );
};

export default memo(AddUserSection);
