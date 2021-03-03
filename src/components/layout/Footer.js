import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faPhoneAlt,
  faWifi,
  faTv,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faClock } from "@fortawesome/free-regular-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import Maps from "./Maps";
import tripadvisor from "../../img/tripadvisor.svg";
import instagram from "../../img/instagram.svg";
import background from "../../img/mandala.png";

const Footer = () => {
  return (
    <Container fluid as="footer" id="footer" className="py-5 mt-5">
      <Row>
        <Col md={2} className="d-none d-md-block">
          <img src={background} alt="Mandala" className="mandala-footer" />
        </Col>
        <Col md={6}>
          <h5 className="goa-footer-title mb-3">Goa restaurant</h5>
          <Row>
            <Col md={7} className="mb-4">
              <FontAwesomeIcon
                icon={faPhoneAlt}
                color="black"
                className="mr-3 info-footer-icons"
                size="lg"
              />{" "}
              <a href="tel:+33980842949">09 80 84 29 49</a> <br />
              <FontAwesomeIcon
                icon={faEnvelope}
                color="black"
                className="mr-3 info-footer-icons"
                size="lg"
              />{" "}
              <a href="mailto:contact@goa-indian-fastfood.com">
                contact@goa-indian-fastfood.com
              </a>{" "}
              <br />
              <FontAwesomeIcon
                icon={faLocationArrow}
                color="black"
                className="mr-3 info-footer-icons"
                size="lg"
              />{" "}
              14 rue Brocherie, 38000 Grenoble
            </Col>
            <Col md={5} className="d-flex">
              <div>
                <FontAwesomeIcon
                  icon={faClock}
                  className="mr-3 info-footer-icons"
                  size="lg"
                />
              </div>
              <div>
                Tous les jours de: <br />
                11h30 - 15H00
                <br />
                18h00 - 01h00
              </div>
            </Col>
            <Col md={7}>
              <Maps />
            </Col>
            <Col md={5}>
              <h5 className="goa-footer-title mb-3">Equipements</h5>
              <div>
                <div className="d-flex justify-content-start">
                  <div className="footer-wrapper-icon">
                    <FontAwesomeIcon
                      icon={faWifi}
                      color="black"
                      className="mr-3 info-footer-icons"
                      size="lg"
                    />
                  </div>
                  <div className="ml-2">Wifi</div>
                </div>
                <div className="d-flex justify-content-start">
                  <div className="footer-wrapper-icon">
                    <FontAwesomeIcon
                      icon={faTv}
                      color="black"
                      className="mr-3 info-footer-icons"
                      size="lg"
                    />
                  </div>
                  <div className="ml-2">Télévision</div>
                </div>
                <div className="d-flex justify-content-start">
                  <div className="footer-wrapper-icon">
                    <FontAwesomeIcon
                      icon={faWind}
                      color="black"
                      className="mr-3 info-footer-icons"
                      size="lg"
                    />
                  </div>
                  <div className="ml-2">Air conditionné</div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={4} className="d-flex flex-column border-left border-dark pl-4 mt-4 mt-md-0">
          <h5 className="goa-footer-title mb-4">Suivez-nous</h5>
          <div className="d-flex flex-row justify-content-start">
            <div className="footer-border-icons brand-fb mr-3">
              <FontAwesomeIcon
                icon={faFacebookF}
                style={{ height: "48px", width: "48px" }}
                className="mx-1"
              />
            </div>
            <div className="footer-border-icons brand-ig mr-3">
              <img
                src={instagram}
                alt="Instagram Logo"
                height="48px"
                width="48px"
                className="mx-1"
              />
            </div>
            <div className="footer-border-icons brand-ta">
              <img
                src={tripadvisor}
                alt="TripAdvisor Logo"
                height="48px"
                width="48px"
                className="mx-1"
              />
            </div>
          </div>
          <ListGroup className="border-0 my-5">
            <ListGroup.Item className="footer-list-copyright p-0">
              <a href="#mentions-légales">Mentions légales</a>
            </ListGroup.Item>
            <ListGroup.Item className="footer-list-copyright p-0">
              <a href="#donnees-personnelles">Données personnelles</a>
            </ListGroup.Item>
            <ListGroup.Item className="footer-list-copyright p-0">
              <a href="#conditions-generales">Conditions générales de vente</a>
            </ListGroup.Item>
          </ListGroup>
          <p className="text-dark mt-1">
            &copy; Copyright 2021 GOA Indian Fast-Food. All Rights Reserved.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
