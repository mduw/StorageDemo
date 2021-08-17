import React, { Fragment } from "react";
import { useUpdateUser, useUsername } from "../context/UserContext";

const Header = () => {
  const getUsername = useUsername();
  const user = getUsername();
  const updateUser = useUpdateUser();
  const handleLogout = () => {
    updateUser("");
  };
  return (
    <Fragment>
      {user && (
        <div className="user-info">
          Welcome, <b>{user}</b> |{" "}
          <span className="btn" onClick={handleLogout}>
            Logout
          </span>
        </div>
      )}
    </Fragment>
  );
};

export default Header;
