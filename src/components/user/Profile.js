import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../auth/contexts/AuthContext";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase";

const Profile = () => {
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const emailRef = useRef();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordEqual, setPasswordEqual] = useState(false);
  const firstNameRef = useRef();
  const nameRef = useRef();
  const birthdayRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const zipCodeRef = useRef();
  const cityRef = useRef();

  const [error, setError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);
  const history = useHistory();
  const [user, setUser] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordEqual(true);
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const promises = [];

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (password) {
      promises.push(updatePassword(password));
    }

    const updateUser = {
      email: emailRef.current.value,
      name: nameRef.current.value,
      firstName: firstNameRef.current.value,
      birthday: birthdayRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      zipCode: zipCodeRef.current.value,
      city: cityRef.current.value,
    };

    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .update({
        ...updateUser,
      })
      .then(() => {
        setUpdateFailed(false);
        setUpdateSuccess(true);
      })
      .catch(err => {
        setUpdateSuccess(false);
        setUpdateFailed(true);
        console.error(err);
      });

    Promise.all(promises)
      .then(() => setTimeout(() => history.push('/'), 3000))
      .catch(() => setError(true));
  };

  useEffect(() => {
    const getUser = () => {
      const db = firebase.firestore();
      db.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          setUser(doc.data());
        })
        .catch((err) => console.error(err));
    };

    getUser();
  }, [currentUser]);

  return (
    <>
      <Container className="h-100" fluid>
        {user ? (
          <Row className="h-100">
            <Col className="h-100 d-flex flex-column align-items-center">
              {error && (
                <Alert variant="danger" className="my-4">
                  Un problème est survenu pour la modification de votre email ou
                  mot de passe
                </Alert>
              )}
              {updateSuccess && (
                <Alert variant="success" className="my-4">
                  Votre profil a été mis à jour
                </Alert>
              )}
              {updateFailed && (
                <Alert variant="danger" className="my-4">
                  Un problème est survenu avec la mise à jour de vos coordonnées
                </Alert>
              )}
              <Card
                className="border-dark mx-auto card-order"
                style={{ borderRadius: "33px" }}
              >
                <Card.Body>
                  <Card.Title className="text-center mb-5 font-weight-bold">
                    Mes informations personnelles
                  </Card.Title>
                  <Card.Text as="div">
                    <Form className="row" onSubmit={handleSubmit}>
                      <Col sm='12' md='6'>
                        <h6 className="font-weight-bold mb-4 text-center">
                          Votre identité
                        </h6>
                        <Form.Group as={Row}>
                          <Form.Label as="legend" column sm={4}>
                            Civilité
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Check
                              type="radio"
                              label="M"
                              name="civilité"
                              id="monsieur"
                              inline
                              value="monsieur"
                            />
                            <Form.Check
                              type="radio"
                              label="Mme"
                              name="civilité"
                              id="madame"
                              inline
                              value="madame"
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="lastName">
                          <Form.Label column sm={4}>
                            Nom
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              type="text"
                              placeholder="Dupont"
                              defaultValue={user.name}
                              ref={nameRef}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="firstName">
                          <Form.Label column sm={4}>
                            Prenom
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              type="text"
                              placeholder="Jean"
                              defaultValue={user.firstName}
                              ref={firstNameRef}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="birthday">
                          <Form.Label column sm={4}>
                            Date de naissance
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              type="date"
                              placeholder="XX/XX/XXXX"
                              defaultValue={user.birthday}
                              ref={birthdayRef}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="phone">
                          <Form.Label column sm={4}>
                            Mobile
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              type="tel"
                              placeholder="XX.XX.XX.XX.XX"
                              defaultValue={user.phone}
                              ref={phoneRef}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="email">
                          <Form.Label column sm={4}>
                            Adresse mail
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              type="email"
                              placeholder="exemple@gmail.com"
                              ref={emailRef}
                              defaultValue={currentUser.email}
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col sm='12' md='6'>
                        <h6 className="font-weight-bold mb-4 text-center">
                          Votre adresse de livraison
                        </h6>
                        <Form.Group as={Row} controlId="address">
                          <Form.Label column sm={4}>
                            Adresse
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              type="text"
                              placeholder="14 rue Brocherie"
                              defaultValue={user.address}
                              ref={addressRef}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="code-postal">
                          <Form.Label column sm={4}>
                            Code postal
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              type="number"
                              placeholder="38000"
                              max="99999"
                              defaultValue={user.zipCode}
                              ref={zipCodeRef}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="city">
                          <Form.Label column sm={4}>
                            Ville
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              type="text"
                              placeholder="Grenoble"
                              defaultValue={user.city}
                              ref={cityRef}
                            />
                          </Col>
                        </Form.Group>
                        <h6 className="font-weight-bold mb-4 text-center">
                          Réinitialiser votre mot de passe
                        </h6>
                        <Form.Group as={Row} controlId="password">
                          <Form.Label column sm={4}>
                            Nouveau mot de passe
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              type="password"
                              placeholder="xxxxxxxxxx"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="confirmPassword">
                          <Form.Label column sm={4}>
                            Confirmer le nouveau mot de passe
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              type="password"
                              placeholder="xxxxxxxxxx"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                            {passwordEqual && (
                              <div className="text-danger">
                                Les mots de passe ne sonts pas égaux !
                              </div>
                            )}
                          </Col>
                        </Form.Group>
                      </Col>
                      <Button
                        variant="outline-success"
                        type="submit"
                        className="mx-auto w-75 rounded-pill"
                      >
                        Valider
                      </Button>
                    </Form>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row className="h-100">
            <Col className="d-flex justify-content-center h-100">
              <Spinner animation="grow" className="my-auto"/>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Profile;
