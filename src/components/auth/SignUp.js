import React, { useState } from "react";
import { Modal, Button, Form, Col, Row, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignUp = ({ text, classStyle, directTo, icon, closeModal }) => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [passwordEqual, setPasswordEqual] = useState(false);
  const { signup } = useAuth();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [sameEmail, setSameEmail] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailReset, setEmailReset] = useState("");
  const [resetMessageSuccess, setResetMessageSuccess] = useState(false);
  const [resetMessageFailed, setResetMessageFailed] = useState(false);
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stayConnected, setStayConnected] = useState(false);
  const [conditions, setConditions] = useState(false);

  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      if (password !== confirmPassword) {
        setPasswordEqual(true);
        setIsInvalidPassword(true);
      }
      setValidated(true);
      return;
    }
    if (password !== confirmPassword) {
      setPasswordEqual(true);
      setIsInvalidPassword(true);
      setValidated(true);
      return;
    }
    setIsInvalidPassword(false);
    setValidated(true);
    setPasswordEqual(false);

    const user = {
      firstName,
      lastName,
      phone,
      stayConnected,
      conditions,
    };

    try {
      await signup(email, password, user);
      setShow(false);
      closeModal();
      history.push(directTo);
    } catch (e) {
      console.error(e);
      if (e.code === "auth/email-already-in-use") {
        setIsInvalidEmail(true);
        setSameEmail(true);
      } else {
        setError(true);
      }
    }
  };

  const allowOnlyLetters = (e) => {
    let value = e.target.value;
    return value.replace(/[^A-Za-z\s]/gi, "");
  };

  const allowOnlyNumbers = (e) => {
    let value = e.target.value;
    return value.replace(/[^0-9]*$/gi, "");
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
      <a href="#creer-un-compte" onClick={handleShow} className={classStyle}>
        {icon ? <FontAwesomeIcon icon={icon} color="black" size="lg" /> : text}
      </a>

      <Modal
        show={show}
        onHide={handleClose}
        className="border border-dark rounded modal-custom"
        id="signUpModal"
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
              Créer mon compte
            </Modal.Header>
            <Modal.Body>
              <Form
                noValidate
                validated={validated}
                className="d-flex flex-column justify-content-center"
                onSubmit={handleSubmit}
              >
                <Form.Group as={Row} controlId="nameCreateAccount">
                  <Form.Label column sm="4">
                    Prénom
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      placeholder="Prénom"
                      value={firstName}
                      onChange={(e) => setFirstName(allowOnlyLetters(e))}
                      name="nameCreateAccount"
                      required
                    />
                    <Form.Control.Feedback type="valid">
                      Valide
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Non valide
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="lastNameCreateAccount">
                  <Form.Label column sm="4">
                    Nom
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      placeholder="Nom"
                      value={lastName}
                      onChange={(e) => setLastName(allowOnlyLetters(e))}
                      name="lastNameCreateAccount"
                      required
                    />
                    <Form.Control.Feedback type="valid">
                      Valide
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Non valide
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="phoneCreateAccount">
                  <Form.Label column sm="4">
                    Téléphone
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="tel"
                      placeholder="xx.xx.xx.xx.xx"
                      pattern="[0-9]{10}"
                      minLength="10"
                      maxLength="10"
                      value={phone}
                      onChange={(e) => setPhone(allowOnlyNumbers(e))}
                      name="phone"
                      required
                    />
                    <Form.Control.Feedback type="valid">
                      Valide
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Non valide
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="emailCreateAccount">
                  <Form.Label column sm="4">
                    Adresse mail
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="email"
                      placeholder="xxxx.@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      required
                      isInvalid={isInvalidEmail}
                      className={isInvalidEmail ? "is-not-valid" : ""}
                    />
                    {isInvalidEmail ? (
                      <Form.Control.Feedback type="invalid">
                        Non valide
                      </Form.Control.Feedback>
                    ) : (
                      <Form.Control.Feedback type="valid">
                        Valide
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="password">
                  <Form.Label column sm="4">
                    Créer un mot de passe
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="password"
                      placeholder="xxxxxxxxxx"
                      value={password}
                      minLength={6}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      required
                      isInvalid={isInvalidPassword}
                      className={isInvalidPassword ? "is-not-valid" : ""}
                    />
                    {isInvalidPassword ? (
                      <Form.Control.Feedback type="invalid">
                        Non valide
                      </Form.Control.Feedback>
                    ) : (
                      <Form.Control.Feedback type="valid">
                        Valide
                      </Form.Control.Feedback>
                    )}
                    <div className="text-right text-small">
                      6 caractères minimum
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="confirmPassword">
                  <Form.Label column sm="4">
                    Confirmez le mot de passe
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="password"
                      placeholder="xxxxxxxxxx"
                      value={confirmPassword}
                      className={isInvalidPassword ? "is-not-valid" : ""}
                      minLength={6}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      name="confirmPassword"
                      required
                      isInvalid={isInvalidPassword}
                    />
                    {isInvalidPassword ? (
                      <Form.Control.Feedback type="invalid">
                        Non valide
                      </Form.Control.Feedback>
                    ) : (
                      <Form.Control.Feedback type="valid">
                        Valide
                      </Form.Control.Feedback>
                    )}
                    {passwordEqual && (
                      <div className="text-danger">
                        Les mots de passe ne sont pas égaux !
                      </div>
                    )}
                  </Col>
                </Form.Group>
                <div className="custom-control custom-checkbox">
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
                  <Form.Control.Feedback type="valid">
                    Valide
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Non valide
                  </Form.Control.Feedback>
                </div>
                <div className="custom-control custom-checkbox mb-3">
                  <input
                    type="checkbox"
                    id="conditionsCreateAccount"
                    className="custom-control-input"
                    value={conditions}
                    onChange={(e) => setConditions(e.target.checked)}
                    name="conditionsCreateAccount"
                    required
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="conditionsCreateAccount"
                  >
                    En cochant cette case, j'accepte et je reconnais avoir pris
                    connaissance{" "}
                    <a href="#conditions-generales">des conditions générales</a>{" "}
                    de vente et de
                    <a href="#donnees-personnelles">
                      {" "}
                      la notice de données personnelles.
                    </a>
                  </label>
                  <Form.Control.Feedback type="valid">
                    Valide
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Non valide
                  </Form.Control.Feedback>
                </div>
                <Button
                  variant="outline-success"
                  type="submit"
                  className="mx-auto w-75 rounded-pill btn-outline-custom-white"
                >
                  Continuer
                </Button>
              </Form>
              {error && (
                <Alert variant="danger" className="my-4">
                  Un problème est survenu avec votre inscription, veuillez
                  réessayer.
                </Alert>
              )}
              {sameEmail && (
                <Alert variant="danger" className="my-4">
                  Cette adresse mail est déjà utilisé. Vous avez oublié votre
                  mot de passe ?
                  <Button
                    variant="link"
                    className="btn-password"
                    onClick={(e) => setForgotPassword(true)}
                    style={{paddingLeft: '0.2rem'}}
                  >
                    Cliquez ici.
                  </Button>
                </Alert>
              )}
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
};

export default SignUp;
