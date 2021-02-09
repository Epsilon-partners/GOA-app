import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './Footer/Footer';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Footer />
            <SignUp/>
            <SignIn />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
