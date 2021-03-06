import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import { OrderProvider } from "./components/contexts/OrderContext";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ScrollToTop from "./components/contexts/ScrollToTop";
import { Spinner } from "react-bootstrap";
import CookieConsent from "react-cookie-consent";
const Footer = lazy(() => import("./components/layout/Footer"));
const Profile = lazy(() => import("./components/user/Profile"));
const NavBar = lazy(() => import("./components/layout/Navbar"));
const Order = lazy(() => import("./components/order/Order"));
const Home = lazy(() => import("./components/home/Home"));
const MenuList = lazy(() => import("./components/Menu/MenuList"));
const MenuItem = lazy(() => import("./components/Menu/MenuItem"));
const Delivery = lazy(() => import("./components/home/Delivery"));
const Admin = lazy(() => import("./components/admin/Admin"));
const InstaFeed = lazy(() => import("./components/home/InstaFeed"));

function App() {
  useEffect(() => {
    const verifyLocalStorage = () => {
      if (
        JSON.parse(localStorage.getItem("recapArray")) === null ||
        JSON.parse(localStorage.getItem("recapArray")) === undefined
      ) {
        localStorage.setItem("recapArray", "[]");
      }
    };
    verifyLocalStorage();
  }, []);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense
          fallback={
            <div className="d-flex justify-content-center align-items-center m-auto">
              Chargement... <Spinner variant="dark" animation="grow" />
            </div>
          }
        >
          <Switch>
            <AuthProvider>
              <OrderProvider>
                <NavBar />
                <Route exact path="/">
                  <Home />
                  <MenuList />
                  <Delivery />
                  <InstaFeed />
                </Route>
                {/*
                  <Route exact path="/admin-panel">
                    <Admin />
                  </Route>
                */}
                <PrivateRoute exact path="/dashboard" component={Profile} />
                <AdminRoute exact path="/admin-panel" component={Admin} />
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
          <CookieConsent
            buttonText="Accepter"
            buttonStyle={{ backgroundColor: "#0B6C13", color: "white" }}
            style={{ backgroundColor: "white" }}
          >
            Des cookies sont utilisés sur notre site pour vous offrir la
            meilleure expérience en sauvegardant vos préférences et visites. En
            cliquant sur "Accepter", vous consentez l'utilisation de TOUS les
            cookies.
          </CookieConsent>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
