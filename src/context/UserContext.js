import React, { createContext, useState, useMemo, useContext } from "react";

export const UserContext = createContext({
  user: null,
  getUsername: ()=>{},
  updateUser: () => {},
});


export const useUsername = () => useContext(UserContext).getUsername;
export const useUpdateUser = () => useContext(UserContext).updateUser;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('');

  const getUsername = () => {
    return user;
  }
  const updateUser = (user) => {
    setUser(user);
  }
  
  const value = useMemo(
    () => ({
      user,
      setUser,
      getUsername,
      updateUser
    }),
    [user, setUser, getUsername, updateUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
