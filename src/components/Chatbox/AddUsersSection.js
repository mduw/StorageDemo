import React, { Fragment, memo, useEffect, useState } from "react";
import useUserStore from "../../stores/UserStore";
import useMessageStore, { createNewChat } from "../../stores/MessageStore";
import { isEmpty } from "../../lib/HelperFuncs";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const UsernameTag = ({ username, id, addToSelected }) => {
  console.log('Add user tag');
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
  console.log('Add users');
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
    const NewChat = createNewChat(NewUserList);
    addNewChat(NewChat);
    updateUserChatList(NewChat.id, NewUserList);

    ipcRenderer.sendSync("create-groupchat", NewChat);
    setSelectedUsers([]);
    close();
  };

  useEffect(() => {
    setSelectedUsers([]);
  }, [show]);

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
      <button
        className="btn-blue"
        onClick={handleCreateGroupChat}
        disabled={!selectedUsers.length}
      >
        Add
      </button>
    </Fragment>
  );
};

export default memo(AddUserSectionDetails);
