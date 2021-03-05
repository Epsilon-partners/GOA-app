import React, { useState, useEffect, useRef } from "react";
import { Card, Spinner, Button, FormControl, Alert, Modal } from "react-bootstrap";
import firebase from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';

const UserInfo = ({ userID, order }) => {
  const [user, setUser] = useState();
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [validateOrder, setValidateOrder] = useState(false);
  const [errorOrder, setErrorOrder] = useState(false);

  const [orderNumber, setOrderNumber] = useState();

  const history = useHistory();
  const { addOrder } = useOrder();

  const { updateEmail } = useAuth();

  const phoneRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const zipCodeRef = useRef();
  const cityRef = useRef();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    history.push('/')
  };

  const handleShow = () => setShow(true);

  const createOrder = user => {
    const dbRef = firebase.database().ref('orders');
    dbRef.once('value')
    .then(snapshot => {
      setOrderNumber(snapshot.numChildren());
      const finalOrder = {
        order,
        user,
        confirmed: false,
        orderNumber: `E-Goa-${snapshot.numChildren()}`,
        finished: false,
        delivred: false
      };
      addOrder(finalOrder)
      .then(() => {
        localStorage.setItem('recapArray', JSON.stringify([]));
        setErrorOrder(false);
        setValidateOrder(true);
        handleShow()
      })
      .catch(err => {
        console.error(err);
        setShowFailed(true);
      });
    });
  } 
 
  const handleModifSubmit = async (e) => {
    if (
      !phoneRef.current &&
      !emailRef.current &&
      !addressRef.current &&
      !zipCodeRef.current &&
      !cityRef.current
    )
      return;

    if (emailRef && emailRef.current !== undefined) {
      try {
        await updateEmail(emailRef.current.value);
      } catch (err) {
        console.error(err);
      }
    }

    const updateUser = {
      email:
        emailRef.current !== undefined ? emailRef.current.value : user.email,
      phone:
        phoneRef.current !== undefined ? phoneRef.current.value : user.phone,
      address:
        addressRef.current !== undefined
          ? addressRef.current.value
          : user.address,
      zipCode:
        zipCodeRef.current !== undefined
          ? zipCodeRef.current.value
          : user.zipCode,
      city: cityRef.current !== undefined ? cityRef.current.value : user.city,
    };
    const db = firebase.firestore();
    await db.collection("users")
      .doc(userID)
      .update({
        ...updateUser,
      })
      .then(() => {
        setShowFailed(false);
        setShowSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        setShowSuccess(false);
        setShowFailed(true);
      });
  };

  useEffect(() => {
    const getuser = async () => {
      const db = firebase.firestore();
      await db.collection("users")
        .doc(userID)
        .get()
        .then((doc) => setUser(doc.data()))
        .catch((err) => console.error(err));
    };

    getuser();
  }, [userID]);

  const allowOnlyLetters = ref => e => {
    let value = e.target.value;
    ref.current.value = value.replace(/[^A-Za-z\s]/gi, "");
  };

  const allowOnlyNumbers = ref => e => {
    let value = e.target.value;
    ref.current.value = value.replace(/[^0-9]*$/gi, "");
  };

  return (
    <Card className="card-order border border-dark w-100">
      <Card.Body>
        <Card.Title className="text-center mb-5">Vos coordonnées</Card.Title>
        {user ? (
          <Card.Text as="div">
            <p className="mb-3 text-left">
              <strong>Bonjour {user.firstName}</strong>
            </p>
            <p className="text-dark text-left">
              Numéro de contact: {user.phone}{" "}
              <FontAwesomeIcon
                icon={faPencilAlt}
                size="xs"
                className="ml-1 modif-icons"
                onClick={() => setShowPhone(!showPhone)}
              />
              {showPhone && (
                <>
                  <FormControl
                    type="number"
                    placeholder="Votre nouveau numéro"
                    ref={phoneRef}
                    className="modif-input"
                    defaultValue={user.phone}
                    onChange={allowOnlyNumbers(phoneRef)}
                  />
                </>
              )}
            </p>
            <p className="text-dark text-left">
              Mail de contact: {user.email}{" "}
              <FontAwesomeIcon
                icon={faPencilAlt}
                size="xs"
                className="ml-1 modif-icons"
                onClick={() => setShowEmail(!showEmail)}
              />
              {showEmail && (
                <>
                  <FormControl
                    type="email"
                    placeholder="Votre nouvelle adresse mail"
                    ref={emailRef}
                    className="modif-input"
                    defaultValue={user.email}
                  />
                </>
              )}
            </p>
            <p className="text-dark text-left">
              Adresse de livraison:{" "}
              {`${user.address}, ${user.zipCode} ${user.city}`}{" "}
              <FontAwesomeIcon
                icon={faPencilAlt}
                size="xs"
                className="ml-1 modif-icons"
                onClick={() => setShowAddress(!showAddress)}
              />
              {showAddress && (
                <>
                  <FormControl
                    type="text"
                    placeholder="Numéro et nom de votre rue"
                    ref={addressRef}
                    className="modif-input mb-3"
                    defaultValue={user.address}
                  />
                  <FormControl
                    type="tel"
                    placeholder="Code postal"
                    ref={zipCodeRef}
                    className="modif-input mb-3"
                    defaultValue={user.zipCode}
                    onChange={allowOnlyNumbers(zipCodeRef)}
                  />
                  <FormControl
                    type="text"
                    placeholder="Ville"
                    ref={cityRef}
                    className="modif-input"
                    defaultValue={user.city}
                    onChange={allowOnlyLetters(cityRef)}
                  />
                </>
              )}
            </p>
            {showSuccess && (
              <Alert variant="success" className="my-4">
                Vos modififactions ont bien été prises en compte !
              </Alert>
            )}
            {showFailed && (
              <Alert variant="danger" className="my-4">
                Un problème est survenu ! Veuillez réessayer.
              </Alert>
            )}
          </Card.Text>
        ) : (
          <Spinner animation="grow" className="my-auto" />
        )}
      </Card.Body>
      <Card.Footer
        className="border-0 bg-white d-flex flex-md-row flex-column justify-content-md-around"
        style={{ borderRadius: "33px" }}
      >
        <Button
          variant="success"
          className="rounded-pill user-info-btn mx-auto mb-4"
          type="button"
          onClick={() => createOrder(user)}
        >
          Valider
        </Button>
        <Button
          variant="success"
          className="rounded-pill user-info-btn mx-auto mb-4"
          type="button"
          onClick={handleModifSubmit}
        >
          Enregistrer mes modifications
        </Button>
        {validateOrder &&
          <>
            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Body>
                Votre commande a été prise en charge.<br />
                Votre numéro de commande est E-Goa-{orderNumber}.<br />
                Une notification vous sera envoyé lorsque la commande sera validé avec le temps d'estimation.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="success" onClick={handleClose}>
                  Retour à l'accueil
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        }
        {errorOrder &&
          <Alert variant="danger" className="my-4 ml-3">Un problème est survenu avec votre commande</Alert>
        }
      </Card.Footer>
    </Card>
  );
};

export default UserInfo;
