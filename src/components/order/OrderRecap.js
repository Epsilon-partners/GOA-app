import React, { useState, useEffect } from "react";
import uniqid from 'uniqid';
import { Card, Button, Table, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import firebase from '../../firebase';

const OrderRecap = ({ user }) => {
  const [recapArray, setRecapArray] = useState(JSON.parse(localStorage.getItem('recapArray')));
  const [validateOrder, setValidateOrder] = useState(false);
  const [errorOrder, setErrorOrder] = useState(false);

  const totalPrice = (array) => {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += array[i][0].prix;
    }
    return total.toFixed(2);
  };

  const deleteItem = (array, value) => {
    let index = array.indexOf(value);
    setRecapArray(currentArray => currentArray.filter((elt, i) => i !== index));
  };

  const capitalize = (s) => {
    if (typeof s !== "string" || s.length === 0) return "Aucun";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const createOrder = orderArray => {
    if (orderArray === null || orderArray === undefined) return;
    const orderRef = firebase.database().ref('orders');
    const order = {
      order: orderArray,
      user: typeof Object ? user : JSON.parse(user),
      confirmed: false,
      orderNumber: Date.now()
    };
    orderRef.push(order)
    .then(() => {
      localStorage.setItem('recapArray', JSON.stringify([]));
      setErrorOrder(false);
      setValidateOrder(true);
    })
    .catch(err => {
      setValidateOrder(false);
      setErrorOrder(true);
      console.error(err);
    });
  }

  useEffect(() => {
    localStorage.setItem('recapArray', JSON.stringify(recapArray));
  })

  return (
    <Card className="card-order mb-4">
      <Card.Body>
        <Card.Title className="text-center">
          Récapitulatif de ma commande
        </Card.Title>
        <Card.Subtitle className="text-center pb-4 mb-3 border-styled"></Card.Subtitle>
        <Card.Text as="div">
          {recapArray && (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Plat</th>
                    <th>Menu</th>
                    <th>Suppléments</th>
                    <th>Sauce</th>
                    <th>Boisson</th>
                    <th>Accompagnement assiette</th>
                    <th>Prix</th>
                  </tr>
                </thead>
                {recapArray.map((recapItem) =>
                  recapItem.map((item) => (
                    <tbody key={uniqid()}>
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.menu ? "Oui" : "Non"}</td>
                        <td>{capitalize(item.supplement)}</td>
                        <td>{capitalize(item.sauce)}</td>
                        <td>{capitalize(item.boisson)}</td>
                        <td>{capitalize(item.accompAssiette)}</td>
                        <td>{item.prix} €</td>
                        <td>
                          <FontAwesomeIcon icon={faTrash} 
                          onClick={() => {
                            deleteItem(recapArray, recapItem);
                          }}
                          style={{ cursor: "pointer" }} />
                        </td>
                      </tr>
                    </tbody>
                  ))
                )}
              </Table>
              <p>
                <strong
                  className="text-weight-bold"
                  style={{ fontSize: "24px" }}
                >
                  TOTAL : {totalPrice(recapArray)} €
                </strong>
              </p>
            </>
          )}
        </Card.Text>
        <Card.Footer className="d-flex justify-content-center bg-white border-0">
          <Button variant="success" className="rounded-pill w-75 mx-auto" onClick={() => createOrder(recapArray)}>
            Valider
          </Button>
        </Card.Footer>
        {validateOrder && <Alert variant="success" className="my-4">Votre commande a été prise en compte</Alert>}
        {errorOrder && <Alert variant="danger" className="my-4">Un problème est survenu</Alert>}
      </Card.Body>
    </Card>
  );
};

export default OrderRecap;
