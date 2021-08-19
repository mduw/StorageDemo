import React, { createContext, useState, useMemo, useContext } from "react";

export const UserContext = createContext({
  user: null,
  updateUser: () => {},
});

export const useUpdateUser = () => useContext(UserContext).updateUser;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
  });

  const updateUser = (user) => {
    setUser(user);
  }
  
  const value = useMemo(
    () => ({
      user,
      setUser,
      updateUser
    }),
    [user, setUser, updateUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
