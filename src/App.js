import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import { AuthProvider } from "./components/auth/contexts/AuthContext";
import Profile from "./components/user/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <AuthProvider>
            <Route exact path="/">
              <Navbar />
              <Footer />
            </Route>
            <PrivateRoute exact path="/dashboard" component={Profile} />
          </AuthProvider>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
