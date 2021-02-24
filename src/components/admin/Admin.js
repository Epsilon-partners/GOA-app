import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  ListGroup,
  Alert
} from "react-bootstrap";
import firebase from "../../firebase";



const Admin = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [validateSuccess, setValidateSuccess] = useState(false);
  const [validateError, setValidateError] = useState(false);

  const [ordersListed, setOrdersListed] = useState();
  const [timeCustom, setTimeCustom] = useState("");
  const [timeSelected, setTimeSelected] = useState("20 minutes");


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

  const confirmOrder = order => e => {
    e.preventDefault();
    let time = "";

    if (timeCustom.length > 0) {
      time = timeCustom;
    } else {
      time = timeSelected;
    }

    const orderRef = firebase.database().ref('orders').child(order.id);
    orderRef.update({
      confirmed: true,
      timeEstimation: time
    })
      .then(() => {
        setValidateError(false);
        setValidateSuccess(true);
      })
      .catch(err => {
        console.error('Error updating order', err);
        setValidateSuccess(false);
        setValidateError(true);
      });
  };

  const refuseOrder = order => {
    const orderRef = firebase.database().ref('orders').child(order.id);
    orderRef.remove();
  };

  useEffect(() => {
    const orderRef = firebase.database().ref("orders");
    orderRef.on("value", (snapshot) => {
      const orders = snapshot.val();
      //display latest item
      if (orders) {
        let { [Object.keys(orders).pop()]: lastItem } = orders;
        console.log('last item', lastItem);
      }

      const ordersList = [];
      const confirmedOrder = []
      for (let id in orders) {
        if (orders[id].confirmed) {
          confirmedOrder.push({ id, ...orders[id] });
        } else {
          ordersList.push({ id, ...orders[id] });
        }
      }
      setOrdersListed(ordersList);
      console.log('confirmed order', confirmedOrder);

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
                            <ListGroup.Item className="list-group-admin">
                              <strong>{item.name}</strong>
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-admin">
                              <strong>Menu:</strong> {item.menu ? "Oui" : "Non"}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-admin">
                              <strong>Suppléments:</strong>{" "}
                              {item.supplements ? item.supplements : "Aucun"}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-admin">
                              <strong>Boissons:</strong>{" "}
                              {capitalize(item.boisson)}
                            </ListGroup.Item>
                            <ListGroup.Item className="list-group-admin">
                              <strong>Prix:</strong> {item.prix}€
                            </ListGroup.Item>
                          </ListGroup>
                        ))
                      )}
                    </td>
                    <td>Prix total: {totalPrice(order.order)}</td>
                    <td>
                      {isValidated ? (
                        <>
                          <Form onSubmit={confirmOrder(order)}>
                            <Form.Group controlId="timeEstimation">
                              <Form.Label>Temps estimé de préparation</Form.Label>
                              <Form.Control
                                as="select"
                                value={timeSelected}
                                onChange={(e) => {
                                  setTimeSelected(e.target.value);
                                  console.log(e.target.value)
                                }}
                              >
                                <option value="10 minutes">10 minutes</option>
                                <option value="20 minutes">20 minutes</option>
                                <option value="30 minutes">30 minutes</option>
                                <option value="40 minutes">40 minutes</option>
                                <option value="50 minutes">50 minutes</option>
                              </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="customizedTime">
                              <Form.Label>Un autre temps d'estimation</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="1 heure"
                                value={timeCustom}
                                onChange={(e) => setTimeCustom(e.target.value)}
                              />
                            </Form.Group>
                            <Button
                              variant="success"
                              className="mr-3 my-2"
                              type="submit"
                            >
                              Valider la commande
                          </Button>
                            <Button
                              variant="secondary"
                              type="reset"
                              className="my-2"
                              onClick={() => setIsValidated(false)}
                            >
                              Annuler
                          </Button>
                          </Form>
                          {validateSuccess && <Alert variant="success" className="my-3">Commande validée</Alert>}
                          {validateError && <Alert variant="danger" className="my-3">Un problème est survenu</Alert>}
                        </>
                      ) : (
                          <>
                            <Button
                              variant="success"
                              className="mr-3"
                              onClick={() => setIsValidated(true)}
                            >
                              Valider
                          </Button>
                            <Button variant="danger" type="button" onClick={() => refuseOrder(order)}>Refuser</Button>
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
