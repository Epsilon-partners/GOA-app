import React from 'react';
import { ListGroup } from 'react-bootstrap';
import uniqid from 'uniqid';

const OrdersDelivred = ({ order }) => {
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
                <ListGroup.Item className="list-group-admin">
                  <strong>Suppléments:</strong>{" "}
                  {item.supplement ? item.supplement.join(", ") : "Aucun"}
                </ListGroup.Item>
                <ListGroup.Item className="list-group-admin">
                  <strong>Boissons:</strong> {capitalize(item.boisson)}
                </ListGroup.Item>
                <ListGroup.Item className="list-group-admin">
                  <strong>Prix:</strong> {item.prix}€
                </ListGroup.Item>
              </ListGroup>
            ))
          )}
        </td>
        <td>Prix total: {totalPrice(order.order)}</td>
        </tr>
        </tbody>
     );
}
 
export default OrdersDelivred;