import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import { OrderProvider } from "./components/contexts/OrderContext";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop from './components/contexts/ScrollToTop';
import { Spinner } from 'react-bootstrap';
const Footer = lazy(() => import('./components/layout/Footer'));
const Profile = lazy(() => import("./components/user/Profile"));
const NavBar = lazy(() => import("./components/layout/Navbar"));
const Order = lazy(() => import("./components/order/Order"));
const Home = lazy(() => import("./components/home/Home"));
const MenuList = lazy(() => import("./components/Menu/MenuList"));
const MenuItem = lazy(() => import("./components/Menu/MenuItem"));
const Delivery = lazy(() => import("./components/home/Delivery"));
const Admin = lazy(() => import("./components/admin/Admin"));


function App() {

  useEffect(() => {
    const verifyLocalStorage = () => {
      if (JSON.parse(localStorage.getItem('recapArray')) === null || JSON.parse(localStorage.getItem('recapArray')) === undefined) {
        localStorage.setItem('recapArray', '[]');
      }
    };
    verifyLocalStorage();
  }, []);

  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={
       <div className="d-flex justify-content-center align-items-center m-auto">
        Chargement...  <Spinner variant="dark" animation="grow" />
       </div>
      }>
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
              <Route exact path="/menu/:id" component={MenuItem} />
              <Route exact path="/menu-list">
                <MenuList />
              </Route>
              <Footer />
            </OrderProvider>
          </AuthProvider>
        </Switch>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
