import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Infos from "./Infos";
import Map from "./Map";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <Container fluid className="p-4 mt-5" as="footer" id="footer">
      <Row className="py-4">
        <Col>
          <h2 className="text-center footer-h2">CONTACTEZ-NOUS</h2>
        </Col>
      </Row>
      <Row>
        <Infos />
        <Map />
      </Row>
      <Row className="mt-4">
        <Copyright />
      </Row>
    </Container>
  );
};

export default Footer;
