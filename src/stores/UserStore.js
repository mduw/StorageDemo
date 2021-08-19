import create from "zustand";
import produce from "immer";
import {generateUID} from "../lib/HelperFuncs";

// helper function to create a user obj from username and possible a list of
// chatId(s)
export const createNewUser = (userInfo) => {
  const user = {
    id: generateUID(),
    email: userInfo.email,
    username: userInfo.username,
    chatList: userInfo.chatList || [],
  };
  return user;
};

const initialUsers = [
  { id: 1, username: "Mark", email: "mark@test.com", chatList: [1, 3, 4] },
  { id: 2, username: "Kelly", email: "kelly@test.com", chatList: [1, 2] },
  { id: 3, username: "John", email: "john@test.com", chatList: [2, 3] },
  { id: 4, username: "Smith", email: "smith@test.com", chatList: [4] },
];

// user store contains a list of users where
// users : [{id, username, chatList, ...}]
const useUserStore = create((set, get) => ({
  currentUser: {},
  users: [...initialUsers],
  getCurrentUser: () => get().currentUser,
  getUserById: (id) => get().users.find((user) => user.id === id),
  getUserByEmail: (email) => get().users.find((each) => each.email === email),
  setCurrentUser: (currentUser) =>
    set(
      produce((state) => {
        state.currentUser = currentUser;
      })
    ),
  createUser: (username, email) =>
    set((state) => ({
      users: [...state.users, createNewUser({ username, email })],
    })),
  updateUserChatList: (chatId, userList) =>
    set(
      produce((state) => {
        state.users.map((user) => {
          if (userList.includes(user.id) && !user.chatList.includes(chatId)) {
            user.chatList.push(chatId);
          }
        });
      })
    ),
}));

export default useUserStore;
