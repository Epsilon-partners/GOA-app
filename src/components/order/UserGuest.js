import React, { useState } from "react";
import { Card, Col, Row, Form, Button, Alert, Modal } from "react-bootstrap";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";
import firebase from '../../firebase';
import { useOrder } from '../contexts/OrderContext';
import { useHistory } from 'react-router-dom';

const UserGuest = ({ order }) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [conditions, setConditions] = useState(false);
  
  const history = useHistory();

  const [showFailed, setShowFailed] = useState(false);
  const [validateOrder, setValidateOrder] = useState(false);
  const [errorOrder, setErrorOrder] = useState(false);
  const [orderNumber, setOrderNumber] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    history.push('/')
  };

  const handleShow = () => setShow(true);

  const {addOrder} = useOrder();


  const handleSubmit = e => {
    e.preventDefault();

    const userGuest = {
      firstName,
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
      const dbRef = firebase.database().ref('orders');
      dbRef.once('value', snapshot => {
        setOrderNumber(snapshot.numChildren());
        const finalOrder = {
          order,
          user: userGuest,
          confirmed: false,
          orderNumber: `E-Goa-${snapshot.numChildren()}`,
          finished: false,
          delivred: false,
          deleted: false
        };
        addOrder(finalOrder)
        .then(() => {
          localStorage.setItem('recapArray', JSON.stringify([]));
          setErrorOrder(false);
          setValidateOrder(true);
          handleShow()
        })
        .catch();
      });
    })
    .catch(err => {
      console.error(err);
      setShowFailed(true);
    });

  }

  const allowOnlyLetters = e => {
    let value = e.target.value;
    return value.replace(/[^A-Za-z\s]/gi, "");
  };

  const allowOnlyNumbers = e => {
    let value = e.target.value;
    return value.replace(/[^0-9]*$/gi, "");
  }

  return (
    <Card className="card-order border border-dark w-100">
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
                  Prénom
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    placeholder="Jean"
                    value={firstName}
                    onChange={e => setFirstName(allowOnlyLetters(e))}
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
                    type="tel"
                    placeholder="0123456789"
                    pattern="[0-9]{10}"
                    minLength="10"
                    maxLength="10"
                    value={phone}
                    onChange={e => setPhone(allowOnlyNumbers(e))}
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
                className="mx-auto w-75 rounded-pill btn-custom-white"
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
          {validateOrder &&
          <>
            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Body>
                Votre commande a été prise en charge.<br />
                Votre numéro de commande est E-Goa-{orderNumber}.<br />
                Une notification vous sera envoyé lorsque la commande sera validé avec le temps d'estimation.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="success" onClick={handleClose} className="btn-custom-white">
                  Retour à l'accueil
                </Button>
              </Modal.Footer>
            </Modal>
          </>
          }
          {showFailed &&
            <Alert variant="danger" className="my-4 ml-3">Un problème est survenu ! Veuillez réessayer</Alert>
          }
          {errorOrder &&
            <Alert variant="danger" className="my-4 ml-3">Un problème est survenu avec votre commande</Alert>
          }
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserGuest;
