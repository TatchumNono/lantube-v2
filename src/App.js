import React from "react";
import SignIn from "./components/Login/SignIn";
import Signup from "./components/Login/Signup";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/Signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
