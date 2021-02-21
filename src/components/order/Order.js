import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../auth/contexts/AuthContext";
import OrderRecap from "./OrderRecap";
import UserInfo from "./UserInfo";
import UserGuest from "./UserGuest";

function Order() {
  //get menu item
  const { currentUser } = useAuth();
  const [isUser, setIsUser] = useState(localStorage.getItem('isUser') || false);
  const [user, setUser] = useState(localStorage.getItem('User') || {});

  const validateUser = user => {
    setIsUser(true);
    setUser(user);
    localStorage.setItem('isUser', JSON.stringify(isUser));
    localStorage.setItem('User', JSON.stringify(user));
  };

  return (
    <Container>
      <Row>
        <Col md={12} sm={12}>
          {currentUser ? (
            <UserInfo userID={currentUser.uid} validateUser={validateUser} />
          ) : (
            <UserGuest validateUser={validateUser} />
          )}
        </Col>
        {isUser && (
          <Col md={12} sm={12}>
            <OrderRecap user={user} />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Order;
