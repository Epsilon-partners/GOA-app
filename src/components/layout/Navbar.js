import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faUserFriends,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Goalogo from "../../img/goaImage.png";
import Goatitle from "../../img/GOA.png";
import { useAuth } from "../contexts/AuthContext";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import { Alert, Nav, Navbar, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogOut = async () => {
    try {
      await logout();
      localStorage.setItem("recapArray", JSON.stringify([]));
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
          <Nav className="links d-flex justify-content-end w-100">
            <Link to="/">Goa Food</Link>
            <Link to="/menu-list">La carte</Link>
            <ScrollLink
              activeClass="active"
              spy={true}
              smooth={true}
              to="footer"
              style={{ cursor: "pointer" }}
            >
              Contact
            </ScrollLink>
            {!currentUser ? (
              <div className="icon" style={{ marginLeft: "16px" }}>
                <FontAwesomeIcon
                  icon={faUser}
                  size="lg"
                  cursor="pointer"
                  onClick={() => setShowModal(true)}
                />
              </div>
            ) : (
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
            <div className="icon">
              <Link to="/valider-commande">
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
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        id="user-modal"
        className="border border-dark rounded modal-custom"
      >
        <Modal.Header closeButton className="h2 border-0">
          S'identifier
        </Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-between">
          <SignIn
            text="Se connecter"
            classStyle="btn btn-outline-success rounded-pill mb-4"
            directTo="/dashboard"
            closeModal={closeModal}
          />
          <SignUp
            text="Créer un compte"
            classStyle="btn btn-success rounded-pill"
            directTo="/dashboard"
            closeModal={closeModal}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavBar;
