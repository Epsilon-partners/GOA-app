import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import logo from "../../img/Logo.png";
import { useAuth } from "../auth/contexts/AuthContext";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import { Alert, Nav, Navbar } from "react-bootstrap";
import React, { useState } from "react";


const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(false);

  const handleLogOut = async () => {
    try {
      await logout();
      history.push("/");
    } catch (e) {
      console.error(e);
      setErrorMessage(true);
    }
  };

  return (
    <>
      <Navbar expand="lg">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navabr-nav">
          <Nav className="links">
            <Link to="/">Accueil</Link>
            <Link to="/menu-list">Nos Menus</Link>
            <a href="#footer">Contact</a>
            {!currentUser ? (
              <>
                <SignIn text="Se connecter" directTo="/dashboard" />
                <SignUp text="Créer un compte" directTo="/dashboard" />
              </>
            ) : (
              <a href="#deconnexion" onClick={handleLogOut}>
                Se déconnecter
              </a>
            )}
              {currentUser && currentUser.email ? (
                <div className="icon">
                  <Link to="/dashboard">
                    <FontAwesomeIcon icon={faUserAlt} size="lg" />
                  </Link>
                </div>
              ) : null}
              <div className="icon">
                <Link to='/valider-commande'>
                  <FontAwesomeIcon icon={faShoppingBasket} size="lg" />
                </Link>
              </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {errorMessage && (
        <>
          <Alert
            variant="danger"
            onClose={() => setErrorMessage(false)}
            dismissible
          >
            Un problème est survenu. Veuillez réessayer.
          </Alert>
        </>
      )}
    </>
  );
};

export default NavBar;
