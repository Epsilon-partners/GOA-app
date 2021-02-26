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
    <Container>
      <Row>
        <Col md={12} sm={12}>
          <OrderRecap sendValidateOrder={validateOrder} />
        </Col>
        {orderEnd &&
        <Col md={12} sm={12}>
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
