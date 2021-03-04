import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import {
  Container,
  Row,
  Col,
  Table
} from "react-bootstrap";
import firebase from "../../firebase";
import OrderList from './OrderList';



const Admin = () => {
  const [ordersListed, setOrdersListed] = useState();

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
                <OrderList order={order} key={uniqid()} />
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
