import React, { useState, useEffect } from "react";
import uniqid from 'uniqid';
import { Container, Row, Col, Table, Button, Form, ListGroup } from "react-bootstrap";
import firebase from "../../firebase";

const Admin = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [ordersListed, setOrdersListed] = useState();

  const totalPrice = (array) => {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += array[i][0].prix;
    }
    return total.toFixed(2);
  };

  const capitalize = (s) => {
    if (typeof s !== "string" || s.length === 0) return "Aucun";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  useEffect(() => {
    const orderRef = firebase.database().ref("orders");
    orderRef.on("value", (snapshot) => {
    const orders = snapshot.val();
    const ordersList = [];
    for (let id in orders) {
        ordersList.push({ id, ...orders[id] });
    }
    setOrdersListed(ordersList);
    });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className="text-center h1">Goa Food</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <h3>Les commandes</h3>
        </Col>
        <Col>
          {ordersListed ? (
            <Table>
              <thead>
                <tr>
                  <th className="text-center">Numéro de commande</th>
                  <th className="text-center">Informations du client</th>
                  <th className="text-center">Commande</th>
                  <th className="text-center">Prix</th>
                </tr>
              </thead>
              {ordersListed.map((order) => (
                <tbody key={uniqid()}>
                  <tr>
                    <td>{order.orderNumber}</td>
                    <td>
                      Nom: {order.user.name}
                      <br />
                      Email: {order.user.email}
                      <br />
                      Numéro de télépone: {order.user.phone}
                      <br />
                      {order.user.address
                        ? "Utilisateur enregistré"
                        : "Utilisateur invité"}
                    </td>
                    <td>
                    {order.order.map((recapItem) =>
                      recapItem.map((item) => (
                        <ListGroup horizontal="md" key={uniqid()}>
                          <ListGroup.Item className="list-group-admin"><strong>{item.name}</strong></ListGroup.Item>
                          <ListGroup.Item className="list-group-admin"><strong>Menu:</strong> {item.menu ? "Oui" : "Non"}</ListGroup.Item>
                          <ListGroup.Item className="list-group-admin"><strong>Suppléments:</strong> {item.supplements ? item.supplements : "Aucun"}</ListGroup.Item>
                          <ListGroup.Item className="list-group-admin"><strong>Boissons:</strong> {capitalize(item.boisson)}</ListGroup.Item>
                          <ListGroup.Item className="list-group-admin"><strong>Prix:</strong> {item.prix}€</ListGroup.Item>
                        </ListGroup>
                      ))
                    )}
                    </td>
                    <td>Prix total: {totalPrice(order.order)}</td>
                    <td>
                      {isValidated ? (
                        <Form>
                          <Form.Group controlId="timeEstimation">
                            <Form.Label>Temps estimé de préparation</Form.Label>
                            <Form.Control as="select" defaultValue="20 minutes">
                              <option>10 minutes</option>
                              <option>20 minutes</option>
                              <option>30 minutes</option>
                              <option>40 minutes</option>
                              <option>50 minutes</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="customizedTime">
                            <Form.Label>Un autre temps d'estimation</Form.Label>
                            <Form.Control type="text" placeholder="1 heure" />
                          </Form.Group>
                          <Button variant="success" className="mr-3">
                            Valider la commande
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => setIsValidated(false)}
                          >
                            Annuler
                          </Button>
                        </Form>
                      ) : (
                        <>
                          <Button
                            variant="success"
                            className="mr-3"
                            onClick={() => setIsValidated(true)}
                          >
                            Valider
                          </Button>
                          <Button variant="danger">Refuser</Button>
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          ) : (
            <p className="text-dark">
              Il n'y a pas de commandes pour l'instant.
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
