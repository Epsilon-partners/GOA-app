import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from './components/layout/Footer';
import { AuthProvider } from "./components/contexts/AuthContext";
import Profile from "./components/user/Profile";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/layout/Navbar";
import Order from "./components/order/Order";
import Home from "./components/home/Home";
import MenuList from "./components/Menu/MenuList";
import MenuItem from "./components/Menu/MenuItem";
import Delivery from "./components/home/Delivery";
import Admin from "./components/admin/Admin";
import { OrderProvider } from "./components/contexts/OrderContext";
import ScrollToTop from './components/contexts/ScrollToTop';

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <Switch>
          <AuthProvider>
            <OrderProvider>
              <NavBar />
              <Route exact path="/">
                <Home />
                <MenuList />
                <Delivery />
              </Route>
              <Route exact path="/admin-panel">
                <Admin />
              </Route>
              <PrivateRoute exact path="/dashboard" component={Profile} />
              <Route exact path="/valider-commande">
                <Order />
              </Route>
              <Route exact path="/menu/:id" component={MenuItem}></Route>
              <Route exact path="/menu-list">
                <MenuList></MenuList>
              </Route>
              <Footer />
            </OrderProvider>
          </AuthProvider>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
