import React from "react";
import { Col } from "react-bootstrap";
import Contact from "./Contact";
import Equipements from "./Equipements";
import FollowUs from "./FollowUs";

const Infos = () => {
  return (
    <Col className="d-flex justify-content-between row">
      <Contact />
      <Equipements />
      <FollowUs />
    </Col>
  );
};

export default Infos;
