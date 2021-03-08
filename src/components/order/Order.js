import React, { useState, lazy, Suspense } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
const OrderRecap = lazy(() => import("./OrderRecap"));
const UserInfo = lazy(() => import("./UserInfo"));
const UserGuest = lazy(() => import("./UserGuest"));

function Order() {
  //get menu item
  const { currentUser } = useAuth();
  const [orderEnd, setOrderEnd] = useState(false);
  const [order, setOrder] = useState();

  const validateOrder = order => {
    setOrderEnd(true);
    setOrder(order);
  }

  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center m-auto">
       Chargement...  <Spinner variant="dark" animation="grow" />
      </div>
     }>
    <Container fluid>
      <Row>
        <Col sm={12} className="p-0">
          <h4 className="panier-order mt-4 mb-0">Votre panier</h4>
          <OrderRecap sendValidateOrder={validateOrder} />
        </Col>
        <Col sm={12} className="px-0 mt-4" id="beforeSendOrder">
          {orderEnd &&
            <>
              {currentUser ? (
                <UserInfo userID={currentUser.uid} order={order} />
              ) : (
                <UserGuest order={order} />
              )} 
            </>
          }
        </Col>
      </Row>
    </Container>
    </Suspense>
  );
}

export default Order;
