import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './Footer/Footer';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import { AuthProvider } from './auth/contexts/AuthContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <AuthProvider>
              <Footer />
              <SignUp/>
              <SignIn />
            </AuthProvider>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
