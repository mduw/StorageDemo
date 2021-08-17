import React from "react";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";
import Header from "./pages/Header";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <Header />

          <Routes />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
