import React from 'react';
import SignIn from '../Login/SignIn';
import SignUp from '../Login/SignUp';
import Home from '../Home/Home';
import Upload from '../Upload/Upload';
import Player from '../Player/Player';
import { CookiesProvider } from 'react-cookie';
import Nav from '../Navbar/Nav';

import UserContextProvider from '../../contexts/userContext';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <CookiesProvider>
        <BrowserRouter>
          <Switch>
            <UserContextProvider>
              <Nav />
              <Route exact path="/" component={Home} />
              <Route path="/SignUp" component={SignUp} />
              <Route path="/SignIn" component={SignIn} />
              <Route path="/Upload" component={Upload} />
              <Route path="/Player/:id" component={Player} />
            </UserContextProvider>
          </Switch>
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
};

export default App;
