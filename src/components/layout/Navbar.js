import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../../img/Logo.png";
import { useAuth } from "../auth/contexts/AuthContext";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import { Alert } from "react-bootstrap";
import React, { useState } from "react";

const Navbar = () => {
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
      <nav className="navbar">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </Link>
        <div className="links">
          <Link to="/">Accueil</Link>
          <Link to="/menu-list">Nos Menus</Link>
          <Link to="/contact">Contact</Link>
          {!currentUser ? (
            <>
              <SignIn />
              <SignUp />
            </>
          ) : (
            <a href="#deconnexion" onClick={handleLogOut}>
              Se déconnecter
            </a>
          )}
        </div>
        <div className="auth">
          {currentUser && currentUser.email ? (
            <div className="icon">
              <Link to="/dashboard">
                <FontAwesomeIcon icon={faUserAlt} size="lg" />
              </Link>
            </div>
          ) : null}
          <div className="icon">
            <Link to="/cart">
              <FontAwesomeIcon icon={faShoppingBasket} size="lg" />
            </Link>
          </div>
        </div>
      </nav>
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

export default Navbar;
