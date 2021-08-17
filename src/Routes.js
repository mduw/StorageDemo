import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Chatbox from "./pages/Chatbox";

const Routes = () => (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/chatbox" component={Chatbox} />
      </Switch>

);

export default Routes;
