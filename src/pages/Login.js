import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUpdateUser } from "../context/UserContext";

const Login = () => {
  const history = useHistory();
  const updateUser = useUpdateUser();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    updateUser(username);
    history.push("/chatbox");
  };
  const handleUserInp = (e) => {
    if (!e.target.value) return;
    setUsername(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="container">
      <div className="vertical-center">
        <h2 className="title">Welcome to Simple Chatapp</h2>
        <input
          className="username"
          type="text"
          placeholder="enter username..."
          value={username}
          onChange={handleUserInp}
          onKeyDown={handleKeyDown}
        ></input>
        <button
          className="btn-login"
          onClick={handleLogin}
          disabled={!username}
        >
          Login me in
        </button>
      </div>
    </div>
  );
};

export default Login;
