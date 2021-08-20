import React, { Fragment, useState, useEffect } from "react";
import AddUserSectionDetails from "./AddUsersSection";
import useUserStore from "../../stores/UserStore";
import useMessageStore from "../../stores/MessageStore";
import { isEmpty } from "../../lib/HelperFuncs";

const ChatboxMain = ({ children }) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const getUserById = useUserStore((state) => state.getUserById);
  const getChatById = useMessageStore((state) => state.getChatById);
  const currentChatID = useMessageStore((state) => state.currentChat);

  const [currentChatInfo, setCurrentChatInfo] = useState(
    getChatById(currentChatID)
  );

  const [addingUser, setAddingUser] = useState(false);
  const [chatboxTitle, setChatboxTittle] = useState("");
  const handleCloseAddingUser = () => {
    setAddingUser(!addingUser);
  };

  const getChatboxTitle = () => {
    let chatTitle = "";
    currentChatInfo.users.every((userId) => {
      if (userId === currentUser.id) return true;
      chatTitle += chatTitle ? ", " : "";
      chatTitle += getUserById(userId).username;
      return true;
    });
    return chatTitle;
  };

  useEffect(() => {
    const unsub_CurrentChat = useMessageStore.subscribe(
      (current, prev) => {
        setCurrentChatInfo(getChatById(current));
      },
      (state) => state.currentChat
    );

    return () => unsub_CurrentChat();
  }, []);

  useEffect(() => {
    if (!isEmpty(currentChatInfo)) {
      const title = getChatboxTitle(currentChatInfo);
      setChatboxTittle(title);
    }
    return () => {
      setAddingUser(false);
    };
  }, [currentChatInfo]);

  return (
    <Fragment>
      <div className="chatbox-area">
        <div className="chatbox-header">
          <h2 className="chatbox-title">{chatboxTitle}</h2>
          <div className="btn" onClick={handleCloseAddingUser}>
            Add Friends +
          </div>
        </div>

        <div className="wrapper">
          <div className={`${addingUser ? "slide wrapperslide" : "slide"}`}>
            <div className="btn" onClick={handleCloseAddingUser}>
              X
            </div>
            <div className="userList">
              {currentChatInfo.users && (
                <AddUserSectionDetails
                  show={addingUser}
                  usersInGroupChat={currentChatInfo.users}
                  close={handleCloseAddingUser}
                />
              )}
              <br />
            </div>
          </div>
        </div>
        {children}
      </div>
    </Fragment>
  );
};

export default ChatboxMain;
