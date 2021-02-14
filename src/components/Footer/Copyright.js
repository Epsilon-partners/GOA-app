import React from "react";
import { Col, ListGroup } from "react-bootstrap";

const Copyright = () => {
  return (
    <Col>
      <ListGroup
        horizontal
        className="border-0 d-flex justify-content-around px-3"
      >
        <ListGroup.Item className="border-0 copyright-item">
          &copy; Copyright 2021 GOA Indian Fast-Food. All Rights Reserved.
        </ListGroup.Item>
        <ListGroup.Item className="border-0 copyright-item">
          <a href="#">Mentions légales</a>
        </ListGroup.Item>
        <ListGroup.Item className="border-0 copyright-item">
          <a href="#">Données personnelles</a>
        </ListGroup.Item>
        <ListGroup.Item className="border-0 copyright-item">
          <a href="#">Conditions générales de vente</a>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default Copyright;
