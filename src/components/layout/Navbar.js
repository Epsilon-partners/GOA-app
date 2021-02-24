import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faUserPlus, faSignInAlt, faUserFriends, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Goalogo from "../../img/goaImage.png";
import Goatitle from '../../img/GOA.png';
import { useAuth } from "../contexts/AuthContext";
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
      localStorage.removeItem('isUser');
      history.push("/");
    } catch (e) {
      console.error(e);
      setErrorMessage(true);
    }
  };

  return (
    <>
      <Navbar expand="lg" bg="white" className="w-100" fixed="top">
        <Link to="/">
          <div className="logo d-flex">
            <img src={Goalogo} alt="Logo" />
            <img src={Goatitle} alt="Name" />
          </div>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navabr-nav">
<<<<<<< HEAD
          <Nav className="links">
            <Link to="/menu-list">La carte</Link>
            <a href="#footer">Contact</a>
=======
          <Nav className="links d-flex justify-content-between w-100">
            <div className="d-flex justify-content-start">
            <Link to='/'>Goa Food</Link>
            <Link to="/menu-list">Nos Menus</Link>
            <a href="#footer" className="mr-auto">Contact</a>
            </div>
            <div className="d-flex">
>>>>>>> 8d61e0b43287a1e9bf84ca9562e73de28b93f864
            {!currentUser ? (
              <div className="icon">
                <SignIn icon={faSignInAlt} directTo="/dashboard" />
                <SignUp icon={faUserPlus} directTo="/dashboard" />
              </div>
            ) : (
<<<<<<< HEAD
                <a href="#deconnexion" onClick={handleLogOut}>
                  Se déconnecter
                </a>
              )}
            {currentUser && currentUser.email ? (
=======
              <a href="#deconnexion" onClick={handleLogOut}>
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
              </a>
            )}
              {currentUser && currentUser.email ? (
                <div className="icon">
                  <Link to="/dashboard">
                    <FontAwesomeIcon icon={faUserFriends} size="lg" />
                  </Link>
                </div>
              ) : null}
>>>>>>> 8d61e0b43287a1e9bf84ca9562e73de28b93f864
              <div className="icon">
                <Link to="/dashboard">
                  <FontAwesomeIcon icon={faUserAlt} size="lg" />
                </Link>
              </div>
<<<<<<< HEAD
            ) : null}
            <div className="icon">
              <Link to='/valider-commande'>
                <FontAwesomeIcon icon={faShoppingBasket} size="lg" />
              </Link>
            </div>
=======
              </div>
>>>>>>> 8d61e0b43287a1e9bf84ca9562e73de28b93f864
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
