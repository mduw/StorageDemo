import React, { Fragment, memo, useEffect, useState } from "react";
import useUserStore from "../stores/UserStore";
import useMessageStore, {createNewChat} from '../stores/MessageStore';

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

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

const AddUserSectionDetails = ({ show, currentChat, close }) => {
  if (!show) return null;
  // filter out people already in the conversation
  const users = useUserStore((state) => state.getUsers)().filter(
    (user) => !currentChat.users.includes(user.id)
  );
  const addNewChat = useMessageStore(state=>state.addNewChat);
  const updateUserChatList = useUserStore(state=>state.updateUserChatList);
  const usersSet = useUserStore(state=>state.users);  
  const chatsSet = useMessageStore(state=>state.chats);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleSelected = (id) => {
    if (selectedUsers.includes(id))
      setSelectedUsers(selectedUsers.filter((userID) => userID != id));
    else setSelectedUsers((prev) => [...prev, id]);
  };
  console.log("hereUSerAdd");
  console.log("all users",usersSet);
  console.log("all chats",chatsSet);
  const handleCreateGroupChat = () => {
      console.log("handling send")
    const NewUserList = [...selectedUsers, ...currentChat.users];
    const NewChat = createNewChat(NewUserList);
    addNewChat(NewChat);
    updateUserChatList(NewChat.id, NewUserList);
    //addUserToChat([...selectedUsers, ...currentChat.users]);
    //console.log('NEWCHAT', NewChat);
    ipcRenderer.sendSync("create-groupchat", NewChat);
    close();
  };
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
      <button className="btn-blue" onClick={handleCreateGroupChat}>
        Add
      </button>
    </Fragment>
  );
};

export default memo(AddUserSectionDetails);
