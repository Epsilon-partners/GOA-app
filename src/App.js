import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./components/auth/contexts/AuthContext";
import Profile from "./components/user/Profile";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/layout/Navbar";
import Order from './components/order/Order';
import Home from './components/home/Home';
import MenuList from './components/Menu/MenuList';
import MenuItem from './components/Menu/MenuItem';
import NotFound from './components/NotFound';
import Delivery from './components/home/Delivery';


function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <AuthProvider>
          <NavBar />
            <Route exact path="/">
              <Home />
              <MenuList />
            </Route>
            <Route exact path="/delivery">
              <Delivery></Delivery>
            </Route>
            <PrivateRoute exact path="/dashboard" component={Profile} />
            <Route exact path='/valider-commande'>
              <Order />
            </Route>
            <Route
              exact
              path="/menu/:id"
              component={MenuItem}
            ></Route>
            <Route exact path="/menu-list">
              <MenuList></MenuList>
            </Route>
            <Footer />
          </AuthProvider>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
