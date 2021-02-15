import React, { useState, useEffect } from "react";
import { Card, Spinner, Button } from "react-bootstrap";
import firebase from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const UserInfo = ({ userID }) => {
  const [user, setUser] = useState();

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
                color="black"
                size="xs"
                className="ml-1"
              />
            </p>
            <p className="text-dark text-left">
              Mail de contact: {user.email}{" "}
              <FontAwesomeIcon
                icon={faPencilAlt}
                color="black"
                size="xs"
                className="ml-1"
              />
            </p>
            <p className="text-dark text-left">
              Adresse de livraison:{" "}
              {`${user.address}, ${user.zipCode} ${user.city}`}{" "}
              <FontAwesomeIcon
                icon={faPencilAlt}
                color="black"
                size="xs"
                className="ml-1"
              />
            </p>
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
        >
          Valider
        </Button>
        <Button
          variant="success"
          className="rounded-pill user-info-btn mx-auto mb-4"
        >
          Enregistrer mes modifications
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default UserInfo;
