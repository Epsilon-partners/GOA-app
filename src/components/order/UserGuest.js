import React, { useState } from "react";
import { Card, Col, Row, Form, Button, Alert } from "react-bootstrap";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";
import firebase from '../../firebase';

const UserGuest = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [conditions, setConditions] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);


  const handleSubmit = e => {
    e.preventDefault();

    const userGuest = {
      name,
      email,
      phone,
      conditions
    };

    const db = firebase.firestore();
    db.collection("guests")
    .doc()
    .set({
      ...userGuest
    })
    .then(() => {
      setShowFailed(false);
      setShowSuccess(true);
    })
    .catch(err => {
      console.error(err);
      setShowSuccess(false);
      setShowFailed(true);
    });

  }

  return (
    <Card className="card-order">
      <Card.Body>
        <Card.Title className="text-center mb-5">Vos coordonnées</Card.Title>
        <Card.Text as={Row}>
          <Col md="6" sm="12">
            <p className="text-center mb-1">
              <strong>Mode invité</strong>
            </p>
            <div className="text-center mt-0 mb-4" style={{ fontSize: "12px" }}>
              Je ne souhaite pas créer un compte mais je souhaiterai être
              informé lorsque ma commande est prête
            </div>
            <Form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
              <Form.Group as={Row} controlId="name">
                <Form.Label column sm="4">
                  Nom
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    placeholder="Jean"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="phone">
                <Form.Label column sm="4">
                  Mobile
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="number"
                    placeholder="0123456789"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="email">
                <Form.Label column sm="4">
                  Mail
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="email"
                    placeholder="exemple@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  type="checkbox"
                  id="conditions"
                  className="custom-control-input"
                  value={conditions}
                  onChange={e => setConditions(e.target.checked)}
                  name="conditions"
                  required
                />
                <label className="custom-control-label" htmlFor="conditions">
                  En cochant cette case, j'accepte et je reconnais avoir pris
                  connaissance{" "}
                  <a href="#conditions-generales">des conditions générales</a>{" "}
                  de vente et de
                  <a href="#donnees-personnelles">
                    {" "}
                    la notice de données personnelles.
                  </a>
                </label>
              </div>
              <Button
                variant="success"
                type="submit"
                className="mx-auto w-75 rounded-pill"
              >
                Valider
              </Button>
            </Form>
          </Col>
          <Col md="6" sm="12" className="mt-5 mt-md-0">
            <p className="text-center mb-1">
              <strong>Mode Client Gagnant</strong>
            </p>
            <div className="text-center mt-0" style={{ fontSize: "12px" }}>
              Je ne souhaite créer/me connecter à mon et profiter des avantages
              de ma fidélité, mais je souhaiterai aussi être informé lorsque ma
              commande est prête.
            </div>
            <div className="d-flex flex-column justify-content-around mt-5">
              <SignIn
                classStyle="btn btn-outline-success mb-5 mx-auto w-75 rounded-pill"
                text="Déjà inscrit ? Se connecter"
                directTo="/valider-commande"
              />
              <SignUp
                classStyle="btn btn-success mx-auto w-75 rounded-pill"
                text="Créer mon compte"
                directTo="/valider-commande"
              />
            </div>
          </Col>
          {showSuccess &&
            <Alert variant="success" className="my-4 ml-3">Vous êtes bien enregistré en tant qu'invité !</Alert>
          }
          {showFailed &&
            <Alert variant="danger" className="my-4 ml-3">Un problème est survenu ! Veuillez réessayer</Alert>
          }
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserGuest;
