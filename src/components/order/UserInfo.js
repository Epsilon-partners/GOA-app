import React, { useState, useEffect, useRef } from "react";
import { Card, Spinner, Button, FormControl, Alert } from "react-bootstrap";
import firebase from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../auth/contexts/AuthContext";

const UserInfo = ({ userID }) => {
  const [user, setUser] = useState();
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  const { updateEmail } = useAuth();

  const phoneRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const zipCodeRef = useRef();
  const cityRef = useRef();

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
    db.collection("users")
      .doc(userID)
      .update({
        ...updateUser,
      })
      .then(() => {
        setShowFailed(false);
        setShowSuccess(true);
      })
      .catch((err) => {
        setShowSuccess(false);
        setShowFailed(true);
      });
  };

  useEffect(() => {
    const getuser = () => {
      const db = firebase.firestore();
      db.collection("users")
        .doc(userID)
        .get()
        .then((doc) => setUser(doc.data()))
        .catch((err) => console.error(err));
    };

    getuser();
  }, [userID]);

  return (
    <Card className="card-order">
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
                    type="number"
                    placeholder="Code postal"
                    ref={zipCodeRef}
                    className="modif-input mb-3"
                    defaultValue={user.zipCode}
                  />
                  <FormControl
                    type="text"
                    placeholder="Ville"
                    ref={cityRef}
                    className="modif-input"
                    defaultValue={user.city}
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
      </Card.Footer>
    </Card>
  );
};

export default UserInfo;
