import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './Footer/Footer';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import { AuthProvider } from './auth/contexts/AuthContext';
import Profile from './user/Profile';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <AuthProvider>
            <Route exact path='/'>
                <Footer />
                <SignUp/>
                <SignIn />
            </Route>
            <PrivateRoute exact path='/dashboard' component={Profile} />
          </AuthProvider>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
