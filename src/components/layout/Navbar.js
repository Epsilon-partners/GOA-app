import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import logo from "../../img/Logo.png";
import { useAuth } from "../auth/contexts/AuthContext";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import { Alert, Nav, Navbar, OverlayTrigger, Popover, ListGroup, Button } from "react-bootstrap";
import React, { useState } from "react";

const poppover = (
  <Popover id="popover-basic" className="card-order p-2">
    <Popover.Content as="div">
      <h5 className="text-center" style={{fontSize: 'small'}}>Résumé de votre commande</h5>
      <p className="text-center border-bottom text-dark">1 menu <FontAwesomeIcon icon={faTimesCircle} /></p>
      <ListGroup className="border-0">
        <ListGroup.Item className="list-small-cart">1 cheese naan</ListGroup.Item>
        <ListGroup.Item className="list-small-cart">1 coca light</ListGroup.Item>
        <ListGroup.Item className="list-small-cart">1 grande frite</ListGroup.Item>
      </ListGroup>
      <p className="text-dark text-center mt-3 mb-0 font-weight-bold">TOTAL: 20€</p>
      <div className="d-flex justify-content-center">
        <Button variant="success" className="rounded-pill my-3 w-75 mx-auto">Confirmer</Button>
      </div>
    </Popover.Content>
  </Popover>
)

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
                <a href="#pop">
                <OverlayTrigger trigger="click" placement="bottom" overlay={poppover}>
                  <FontAwesomeIcon icon={faShoppingBasket} size="lg" />
                </OverlayTrigger>
                </a>
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
