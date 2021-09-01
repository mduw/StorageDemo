import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Chatbox from "./pages/Chatbox";
import StorageDemo from "./pages/StorageDemo";
import Home from "./pages";

const Routes = () => (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/storagedemo" component={StorageDemo} />
        <Route path="/chat" component={Login} />
        <Route path="/chatbox" component={Chatbox} />
        <Redirect to="/" />
      </Switch>

);

export default Routes;
