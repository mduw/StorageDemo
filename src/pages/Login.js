import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useUserStore from "../stores/UserStore";
import StyledLogin from "../components/Login/StyledComp";

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
    <StyledLogin.Wrapper>
      <StyledLogin.Main>
        <h2>Welcome to Simple Chatapp</h2>
        <StyledLogin.InputField
          type="email"
          name="email"
          placeholder="Email"
          value={localUser.email}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        ></StyledLogin.InputField>

        <div className={`error-login ${error ? "visible" : "hidden"}`}>
          Invalid login credential! Please try again
        </div>
        <StyledLogin.Btn onClick={handleLogin} disabled={!localUser.email}>
          Login me in
        </StyledLogin.Btn>
      </StyledLogin.Main>
    </StyledLogin.Wrapper>
  );
};

export default Login;
