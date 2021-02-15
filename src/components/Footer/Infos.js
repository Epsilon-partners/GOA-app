import React from "react";
import { Col, Row } from "react-bootstrap";
import Contact from "./Contact";
import Equipements from "./Equipements";
import FollowUs from "./FollowUs";

const Infos = () => {
  return (
    <Col className="d-flex justify-content-between" as={Row} sm='12' md='6'>
      <Contact /> 
      <Equipements />
      <FollowUs />
    </Col>
  );
};

export default Infos;
