import create from "zustand";
import produce from "immer";
import { generateUID } from "../lib/HelperFuncs";

const createNewChat = (userList = []) => {
  return {
    id: generateUID(),
    users: userList,
    seenBy: [],
    messages: [],
  };
};

const initialChats = [
  {
    id: 1,
    users: [1, 2],
    seenBy: [1, 2],
    messages: [
      {
        from: 1,
        to: 2,
        createAt: "4:00",
        message: "initial message, initial message",
      },
    ],
  },
  {
    id: 2,
    users: [2, 3],
    seenBy: [1, 2],
    messages: [
      {
        from: 2,
        to: 3,
        createAt: "4:00",
        message: "initial message",
      },
    ],
  },
  {
    id: 3,
    users: [1, 3],
    seenBy: [1, 2],
    messages: [
      {
        from: 1,
        to: 3,
        createAt: "4:00",
        message: "initial message",
      },
    ],
  },
  {
    id: 4,
    users: [4,1],
    seenBy: [4,1],
    messages: [
      {
        from: 1,
        to: 4,
        createAt: new Date().getTime(),
        message: "initial message",
      },
    ],
  },
];

/*
  chats: [
      { chatId: string, 
        users[id,..], 
        messages: [
            { createAt: string, 
              from: string, 
              to: string, 
              message: string
            }
        ]},
      ...
  ]
*/

const useChatStore = create((set, get) => ({
  currentChat: "",
  chats: [...initialChats],
  getChatById: (id) => get().chats.find((chat) => chat.id === id) || {},
  getCurrentChat: () => get().currentChat,
  setCurrentChat: (id) => set(produce(state=>{state.currentChat = id})),
  setSeenBy: (chatId, userId) => set(
    produce((state) => {
        let idx = state.chats.findIndex((chat) => chat.id === chatId);
        if (state.chats[idx].seenBy.includes(userId)) return;
        state.chats[state.chats.findIndex((chat) => chat.id === chatId)].seenBy.push(userId);
    })
  ),
  addMessageToChat: (chatId, NewMessage) =>
    set(
      produce((state) => {
        let idx = state.chats.findIndex((chat) => chat.id === chatId);
        state.chats[idx].messages.push(NewMessage);
        state.chats[idx].seenBy = [NewMessage.from];

      })
    ),
  addUserToChat: (userList) =>
    set(
      produce((state) => {
        state.chats.push(createNewChat(userList));
      })
    ),
}));

export default useChatStore;
