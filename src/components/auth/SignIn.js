import React, { useState } from "react";
import { Modal, Button, Form, Col, Row, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "../../firebase";

const SignIn = ({ text, classStyle, directTo, icon, closeModal }) => {
  const [show, setShow] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetMessageSuccess, setResetMessageSuccess] = useState(false);
  const [resetMessageFailed, setResetMessageFailed] = useState(false);
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailReset, setEmailReset] = useState("");
  const [stayConnected, setStayConnected] = useState(false);

  const { login } = useAuth();
  const { resetPassword } = useAuth();
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password)
      .then(cred => {
        const db = firebase.firestore();
        db.collection("users").doc(cred.user.uid).get()
        .then(doc => {
          let user = doc.data();
          setShow(false);
          closeModal();
          if (user._IS_ADMIN_) {
            history.push('/admin-panel')
          } else {
            history.push(directTo);
          }
        })
        .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    } catch (e) {
      console.log('error', e);
      setError(true);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(emailReset);
      setResetMessageFailed(false);
      setResetMessageSuccess(true);
    } catch {
      setResetMessageSuccess(false);
      setResetMessageFailed(true);
    }
  };

  return (
    <>
      <a href="#connexion" onClick={handleShow} className={classStyle}>
        {icon ? <FontAwesomeIcon icon={icon} color="black" size="lg" /> : text}
      </a>

      <Modal
        show={show}
        onHide={handleClose}
        className="border border-dark rounded modal-custom"
        id="connect-modal"
      >
        {forgotPassword ? (
          <>
            <Modal.Header closeButton className="h2 border-0">
              Réinitialiser le mot de passe
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmitPassword} id="resetPassword">
                <Form.Group as={Row} controlId="email-reset-password">
                  <Form.Label column sm={4}>
                    Adresse mail
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="email" 
                      placeholder="exemple@gmail.com"
                      value={emailReset}
                      onChange={(e) => setEmailReset(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>
                <div className="d-flex justify-content-between my-4">
                  <Button
                    variant="outline-success"
                    type="button"
                    className="mr-3 rounded-pill w-50 btn-outline-custom-white"
                    onClick={() => setForgotPassword(false)}
                  >
                    Revenir en arrière
                  </Button>
                  <Button
                    variant="success"
                    type="submit"
                    className="rounded-pill w-50 btn-custom-white"
                  >
                    Envoyer
                  </Button>
                </div>
              </Form>
              {resetMessageSuccess && (
                <Alert variant="success">
                  Un mail vous a été envoyé pour réinitialiser votre mot de
                  passe
                </Alert>
              )}
              {resetMessageFailed && (
                <Alert variant="danger">
                  L'opération a échoué, avez vous saisi la bonne adresse mail ?
                </Alert>
              )}
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Header closeButton className="h2 border-0">
              Se connecter
            </Modal.Header>
            <Modal.Body>
              <Form
                className="d-flex flex-column justify-content-center"
                onSubmit={handleSumbit}
                id="signInForm"
              >
                <Form.Group as={Row} controlId="emailSignIn">
                  <Form.Label column sm="4">
                    Adresse mail
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="email"
                      placeholder="xxxx.@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="password" className="mt-4">
                  <Col md={12} className="d-flex justify-content-end mb-0">
                    <Button
                      variant="link"
                      onClick={() => setForgotPassword(true)}
                      className="btn-password"
                    >
                      Mot de passe oublié ?
                    </Button>
                  </Col>
                  <Form.Label column sm="4">
                    Mot de passe
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="password"
                      placeholder="xxxxxxxxxx"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>
                <div className="custom-control custom-checkbox mb-3">
                  <input
                    type="checkbox"
                    id="stayConnected"
                    className="custom-control-input"
                    value={stayConnected}
                    onChange={(e) => setStayConnected(e.target.checked)}
                    name="stayConnected"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="stayConnected"
                  >
                    Rester connecté
                  </label>
                </div>
                <Button
                  variant="success"
                  type="submit"
                  className="mx-auto w-75 rounded-pill btn-custom-white"
                >
                  Se connecter
                </Button>
              </Form>
              {error && (
                <Alert variant="danger" className="my-4">
                  Un problème est survenu, veuillez réessayer.
                </Alert>
              )}
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
};

export default SignIn;
