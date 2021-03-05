import React, { useState } from "react";
import { ListGroup, Button, Alert } from "react-bootstrap";
import uniqid from "uniqid";
import firebase from "../../firebase";
import DeleteOrder from './DeleteOrder';

const OrdersConfirmed = ({ order }) => {
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const capitalize = (s) => {
    if (typeof s !== "string" || s.length === 0) return "Aucun";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const totalPrice = (array) => {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += array[i][0].prix;
    }
    return total.toFixed(2);
  };

  const handleOrderFinished = (order) => {
    const orderRef = firebase.database().ref("orders").child(order.id);
    orderRef
      .update({
        finished: true,
      })
      .then(() => {
        setFailed(false);
        setSuccess(true);
      })
      .catch((err) => {
        console.error("Error updating order to finished");
        setSuccess(false);
        setFailed(true);
      });
  };

  return (
    <tbody>
      <tr>
        <td>{order.orderNumber}</td>
        <td>
          Nom: {order.user.firstName}
          <br />
          Email: {order.user.email}
          <br />
          Numéro de télépone: {order.user.phone}
          <br />
          {order.user.address ? "Utilisateur enregistré" : "Utilisateur invité"}
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
                <ListGroup.Item className="list-group-admin" style={{width: 'min-content'}}>
                  <strong>Accompagnement:</strong> {item.type === "assiettes" ? capitalize(item.accompAssiette) : capitalize(item.accompMenu)}
                </ListGroup.Item>
                <ListGroup.Item className="list-group-admin">
                  <strong>Sauce:</strong> {capitalize(item.sauce)}
                </ListGroup.Item>
                <ListGroup.Item className="list-group-admin">
                  <strong>Suppléments:</strong>{" "}
                  {item.supplement ? item.supplement.join(", ") : "Aucun"}
                </ListGroup.Item>
                <ListGroup.Item className="list-group-admin">
                  <strong>Boissons:</strong> {capitalize(item.boisson)}
                </ListGroup.Item>
                <ListGroup.Item className="list-group-admin">
                  <strong>Prix:</strong> {item.prix.toFixed(2)}€
                </ListGroup.Item>
              </ListGroup>
            ))
          )}
        </td>
        <td>Prix total: {totalPrice(order.order)}€</td>
        <td>
          <Button
            variant="success"
            className="w-100 mb-3"
            type="button"
            onClick={() => handleOrderFinished(order)}
          >
            Commande prête
          </Button>
          <DeleteOrder order={order} />
          {success && (
            <Alert variant="success" className="mt-3">
              Commande bien mise à jour
            </Alert>
          )}
          {failed && <Alert variant="danger" className="mt-3">Un problème est survenu</Alert>}
        </td>
      </tr>
    </tbody>
  );
};

export default OrdersConfirmed;
