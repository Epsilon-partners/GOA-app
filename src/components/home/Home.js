import React from "react";
import logo from "../../img/GOA.png";
import goaImage from "../../img/goaImage.png";
import delivery from "../../img/delivery-man.png";
import takeAway from "../../img/take-away.png";
import { Link } from "react-scroll";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <Container
      fluid
      className="home d-flex justify-content-center align-items-center"
    >
      <Row className="h-100 w-auto mx-auto d-flex flex-column flex-md-row justify-content-between align-items-center">
        <Col
          sm={12}
          md={6}
          className="d-flex flex-column justify-content-center align-items-center pr-0"
        >
          <img src={goaImage} alt="Elephnat" className="home-logo-img" />
          <img src={logo} alt="Logo" className="home-logo-img" />
          <h2 className="text-black">Indian Fast-Food</h2>
        </Col>
        <Col
          sm={12}
          md={6}
          className="pt-5 d-flex flex-column justify-content-center pr-0"
        >
          <h2 className="text-black text-center text-md-start my-5">Commandez en ligne</h2>
          <Row className="d-flex flex-row justify-content-center mx-auto" style={{width: 'max-content'}}>
            <Col sm={6}>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                to="delivery"
                style={{ cursor: "pointer" }}
                offset={-122}
              >
                <div className="d-flex flex-column justify-content-center align-items-center w-auto">
                  <div>
                    <img src={delivery} alt="food delivery" />
                  </div>
                  <p className="text-black small-text-black">Livraison</p>
                </div>
              </Link>
            </Col>
            <Col sm={6}>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                to="menu-list"
                style={{ cursor: "pointer" }}
                offset={-122}
              >
                <div className="d-flex flex-column justify-content-center align-items-center w-auto">
                  <div>
                    <img src={takeAway} alt="food delivery" />
                  </div>
                  <p className="text-black small-text-black">A emporter</p>
                </div>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
