import React, { Fragment, memo, useEffect, useState } from "react";
import useUserStore from "../../../stores/UserStore";
import useMessageStore, { createNewChat } from "../../../stores/MessageStore";
import { isEmpty } from "../../../lib/HelperFuncs";
import SDefault from "../../DefaultStyledComp";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const createGroupChatFromUsers = (
  NewUserList,
  createChat,
  addChatToUserList
) => {
  const NewChat = createNewChat(NewUserList);
  createChat(NewChat);
  addChatToUserList(NewChat.id, NewUserList);
  //  trigger other window
  ipcRenderer.sendSync("create-groupchat", NewChat);
};

const UsernameTag = ({ username, id, addToSelected }) => {
  const [selected, setSelected] = useState(false);
  const handleSelected = () => {
    setSelected(!selected);
    addToSelected(id);
  };
  return (
    <div
      className={`usernameTag btn ${selected ? "selected" : ""}`}
      onClick={handleSelected}
    >
      {username}
    </div>
  );
};

const AddUserSectionDetails = ({ show, usersInGroupChat, close }) => {
  // filter out people already in the conversation
  const users = useUserStore((state) => state.getUsers)().filter(
    (user) => !usersInGroupChat.includes(user.id)
  );
  const updateUserChatList = useUserStore((state) => state.updateUserChatList);
  const addNewChat = useMessageStore((state) => state.addNewChat);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelected = (id) => {
    if (selectedUsers.includes(id))
      setSelectedUsers(selectedUsers.filter((userID) => userID != id));
    else setSelectedUsers((prev) => [...prev, id]);
  };

  const handleCreateGroupChat = () => {
    if (isEmpty(selectedUsers)) return;
    const NewUserList = [...selectedUsers, ...usersInGroupChat];
    createGroupChatFromUsers(NewUserList, addNewChat, updateUserChatList);
    setSelectedUsers([]);
    close();
  };

  useEffect(() => {
    setSelectedUsers([]);
    return () => setSelectedUsers([]);
  }, [show, usersInGroupChat]);

  return (
    <Fragment>
      {show &&
        users.map(({ username, id }, index) => (
          <UsernameTag
            key={index}
            id={id}
            username={username}
            addToSelected={handleSelected}
          />
        ))}
      <SDefault.Btn
        onClick={handleCreateGroupChat}
        disabled={!selectedUsers.length}
      >
        Add
      </SDefault.Btn>
    </Fragment>
  );
};

export default memo(AddUserSectionDetails);
