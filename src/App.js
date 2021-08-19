import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";
import Header from "./pages/Header";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
          <Header />
          <Routes />
      </BrowserRouter>
    </div>
  );
};

export default App;
