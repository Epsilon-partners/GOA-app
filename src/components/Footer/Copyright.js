import React from "react";
import { Col, ListGroup } from "react-bootstrap";

const Copyright = () => {
  return (
    <Col>
      <ListGroup
        horizontal
        className="border-0 d-md-flex flex-md-row flex-column justify-content-md-around px-md-3"
      >
        <ListGroup.Item className="border-0 copyright-item">
          &copy; Copyright 2021 GOA Indian Fast-Food. All Rights Reserved.
        </ListGroup.Item>
        <ListGroup.Item className="border-0 copyright-item">
          <a href="#mentions-légales">Mentions légales</a>
        </ListGroup.Item>
        <ListGroup.Item className="border-0 copyright-item">
          <a href="#donnees-personnelles">Données personnelles</a>
        </ListGroup.Item>
        <ListGroup.Item className="border-0 copyright-item">
          <a href="#conditions-generales">Conditions générales de vente</a>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default Copyright;
