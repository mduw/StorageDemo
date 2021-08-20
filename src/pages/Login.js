import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useUserStore from "../stores/UserStore";

const Login = () => {
  const history = useHistory();
  const [localUser, setLocalUser] = useState({
    email: "",
  });
  const [error, setError] = useState(false);
  const { getUserByEmail, setCurrentUser } = useUserStore();

  const handleLogin = () => {
    let validatedUser = getUserByEmail(localUser.email);
    if (!validatedUser) {
      setError(true);
      return;
    }
    setCurrentUser(validatedUser);
    history.push("/chatbox");
  };
  const handleInputChange = (e) => {
    if (error) setError(false);
    setLocalUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && localUser.email) handleLogin();
  };

  return (
    <div className="container">
      <div className="vertical-center">
        <h2 className="title">Welcome to Simple Chatapp</h2>
        <input
          className="loginInp"
          type="text"
          name="email"
          placeholder="Email"
          value={localUser.email}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        ></input>
        {/* <input
          className="loginInp"
          type="text"
          name="username"
          placeholder="Username"
          value={localUser.username}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        ></input> */}
        <div className={`error-login ${error ? "visible" : "hidden"}`}>
          Invalid login credential! Please try again
        </div>
        <button
          className="btn-login"
          onClick={handleLogin}
          disabled={!localUser.email}
        >
          Login me in
        </button>
      </div>
    </div>
  );
};

export default Login;
