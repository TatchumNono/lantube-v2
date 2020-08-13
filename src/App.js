import React from 'react';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import Home from './components/Home/Home';
import Upload from './components/Upload/Upload';
import { CookiesProvider } from 'react-cookie';

import UserContextProvider from './contexts/userContext';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <CookiesProvider>
        <BrowserRouter>
          <Switch>
            <UserContextProvider>
              <Route exact path="/" component={Home} />
              <Route path="/SignUp" component={SignUp} />
              <Route path="/SignIn" component={SignIn} />
              <Route path="/Upload" component={Upload} />
            </UserContextProvider>
          </Switch>
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;
