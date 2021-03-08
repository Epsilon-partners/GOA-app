import React, { useState, useEffect, lazy, Suspense } from "react";
import uniqid from "uniqid";
import { Container, Row, Col, Table, Tabs, Tab, Spinner } from "react-bootstrap";
import firebase from "../../firebase";
const OrderList = lazy(() => import("./OrderList"));
const OrdersConfirmed = lazy(() => import("./OrdersConfirmed"));
const OrdersFinished = lazy(() => import("./OrdersFinished"));
const OrdersDelivred = lazy(() => import("./OrdersDelivred"));
const OrdersDeleted = lazy(() => import('./OrdersDeleted'));

const Admin = () => {
  const [ordersListed, setOrdersListed] = useState();
  const [confirmOrder, setConfirmOrder] = useState();
  const [finishOrders, setFinishOrders] = useState();
  const [deliverOrders, setDeliverOrders] = useState();
  const [deleteOrders, setDeleteOrders] = useState();

  useEffect(() => {
    const orderRef = firebase.database().ref("orders");
    orderRef.on("value", (snapshot) => {
      const orders = snapshot.val();
      //display latest item
      if (orders) {
        let { [Object.keys(orders).pop()]: lastItem } = orders;
        console.log("last item", lastItem);
      }

      const ordersList = [];
      const confirmedOrder = [];
      const finishedOrder = [];
      const delivredOrders = [];
      const deletedOrders = [];
      for (let id in orders) {
        if (orders[id].deleted) {
          deletedOrders.push({ id, ...orders[id] });
        } else if (orders[id].delivred) {
          delivredOrders.push({ id, ...orders[id] });
        } else if (orders[id].confirmed && !orders[id].finished) {
          confirmedOrder.push({ id, ...orders[id] });
        } else if (orders[id].finished) {
          finishedOrder.push({ id, ...orders[id] });
        } else {
          ordersList.push({ id, ...orders[id] });
        }
      }
      setOrdersListed(ordersList);
      setConfirmOrder(confirmedOrder);
      setFinishOrders(finishedOrder);
      setDeliverOrders(delivredOrders.reverse());
      setDeleteOrders(deletedOrders.reverse());
      console.log("confirmed order", confirmedOrder);
    });
  }, []);

  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center m-auto">
       Chargement...  <Spinner variant="dark" animation="grow" />
      </div>
     }>
    <Container fluid>
      <Row>
        <Col>
          <h1 className="text-center h1">Goa Food</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <h3 className="modal-title-style">Les commandes</h3>
        </Col>
        <Col className="mt-4">
          {ordersListed || confirmOrder || finishOrders || deliverOrders || deleteOrders ? (
            <>
              <Tabs variant="pills" justify defaultActiveKey="a-valider" id="orders-tab-admin">
                <Tab eventKey="a-valider" title={`À valider (${ordersListed && ordersListed.length})`}>
                  <p className="text-black text-center mt-4">
                    Nouvelles commandes à valider
                  </p>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="text-center">N° de commande</th>
                        <th className="text-center">Informations du client</th>
                        <th className="text-center">Commande</th>
                        <th className="text-center">Prix</th>
                      </tr>
                    </thead>
                    {ordersListed.map((order) => (
                      <OrderList order={order} key={uniqid()} />
                    ))}
                  </Table>
                </Tab>
                <Tab eventKey="en-cours" title={`En cours de préparation (${confirmOrder && confirmOrder.length})`}>
                  <p className="text-black text-center mt-4">
                    Commandes en cours de préparation
                  </p>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="text-center">N° de commande</th>
                        <th className="text-center">Informations du client</th>
                        <th className="text-center">Commande</th>
                        <th className="text-center">Prix</th>
                      </tr>
                    </thead>
                    {confirmOrder &&
                      confirmOrder.map((order) => (
                        <OrdersConfirmed order={order} key={uniqid()} />
                      ))}
                  </Table>
                </Tab>
                <Tab eventKey="terminer" title={`Commandes prêtes (${finishOrders && finishOrders.length})`}>
                  <p className="text-black text-center mt-4">Commandes prêtes</p>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="text-center">N° de commande</th>
                        <th className="text-center">Informations du client</th>
                        <th className="text-center">Commande</th>
                        <th className="text-center">Prix</th>
                      </tr>
                    </thead>
                    {finishOrders &&
                      finishOrders.map((order) => (
                        <OrdersFinished order={order} key={uniqid()} />
                      ))}
                  </Table>
                </Tab>
                <Tab eventKey="livrer" title={`Commandes livrées (${deliverOrders && deliverOrders.length})`}>
                  <p className="text-black text-center mt-4">Commandes récupéres par le client.</p>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="text-center">N° de commande</th>
                        <th className="text-center">Informations du client</th>
                        <th className="text-center">Commande</th>
                        <th className="text-center">Prix</th>
                      </tr>
                    </thead>
                    {deliverOrders &&
                      deliverOrders.map((order) => (
                        <OrdersDelivred order={order} key={uniqid()} />
                      ))}
                  </Table>
                </Tab>
                <Tab eventKey="supprimer" title={`Commandes annulées (${deleteOrders && deleteOrders.length})`}>
                  <p className="text-black text-center mt-4">Commandes annulées.</p>
                  <Table responsive>
                    <thead>
                        <tr>
                          <th className="text-center">N° de commande</th>
                          <th className="text-center">Informations du client</th>
                          <th className="text-center">Commande</th>
                          <th className="text-center">Prix</th>
                        </tr>
                      </thead>
                      {deleteOrders &&
                        deleteOrders.map((order) => (
                          <OrdersDeleted order={order} key={uniqid()} />
                        ))}
                  </Table>
                </Tab>
              </Tabs>
            </>
          ) : (
            <p className="text-dark">
              Il n'y a pas de commandes pour l'instant.
            </p>
          )}
        </Col>
      </Row>
    </Container>
    </Suspense>
  );
};

export default Admin;
