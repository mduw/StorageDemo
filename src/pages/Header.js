import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { isEmpty } from "../lib/HelperFuncs";
import useUserStore from "../stores/UserStore";

const Header = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const { setCurrentUser } = useUserStore();
  const history = useHistory();
  const handleLogout = () => {
    setCurrentUser({});
    history.push("/");
  };

  return (
    <Fragment>
      {!isEmpty(currentUser) && (
        <div className="user-info">
          Welcome, <b>{currentUser.username}</b> |{" "}
          <span className="btn" onClick={handleLogout}>
            Logout
          </span>
        </div>
      )}
    </Fragment>
  );
};

export default Header;
