import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { isEmpty } from "../lib/HelperFuncs";
import useUserStore from "../stores/UserStore";
import useMessageStore from "../stores/MessageStore";
import SDefault from "../components/DefaultStyledComp";

const Header = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const { setCurrentUser } = useUserStore();
  const { setCurrentChat } = useMessageStore();
  const history = useHistory();
  const handleLogout = () => {
    setCurrentUser({});
    setCurrentChat("");
    history.push("/");
  };
  
  return (
    <Fragment>
      <SDefault.Link to="/">Home</SDefault.Link>
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
