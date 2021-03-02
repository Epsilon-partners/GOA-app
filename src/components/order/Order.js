import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import OrderRecap from "./OrderRecap";
import UserInfo from "./UserInfo";
import UserGuest from "./UserGuest";

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
    <Container fluid>
      <Row>
        <Col sm={12} className="p-0">
          <h4 className="panier-order mt-4 mb-0">Votre panier</h4>
          <OrderRecap sendValidateOrder={validateOrder} />
        </Col>
        {orderEnd &&
        <Col sm={12} className="px-0 mt-4">
          {currentUser ? (
            <UserInfo userID={currentUser.uid} order={order} />
          ) : (
            <UserGuest order={order} />
          )} 
        </Col>
        }
      </Row>
    </Container>
  );
}

export default Order;
