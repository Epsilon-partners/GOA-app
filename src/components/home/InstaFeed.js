import React from 'react';
import instaIcon from '../../img/insta-icon.png'
import { Container, Row, Col } from 'react-bootstrap';
import insta1 from '../../img/insta1.jpeg';
import insta2 from '../../img/insta2.jpeg';
import insta3 from '../../img/insta3.jpeg';
import insta4 from '../../img/insta4.jpeg';
import insta5 from '../../img/insta5.jpeg';
import insta6 from '../../img/insta6.jpeg';
import insta7 from '../../img/insta7.jpeg';


const InstaFeed = () => {
    return (
        <Container fluid className="insta-feed py-5 d-flex flex-column justify-content-center">
            <Row className="h-auto">
                <Col md={4} className="d-flex flex-column justify-content-center align-items-center">
                    <h3>Découvrez plus de photos de nos plats sur notre page Instagram</h3>
                    <a href="https://www.instagram.com/goaindianfastfood/?hl=fr" target="_blank" rel="noreferrer">
                        <img src={instaIcon} alt="Instagram logo" className="insta-feed-left-img" />
                    </a>
                </Col>
                <Col md={8} as={Row}>
                    <Col as={Row} md={4} sm={12} className="mr-md-2 mr-0 mb-md-0 mb-3">
                        <Col md={6} sm={12} className="px-0 mb-md-0 mb-2">
                            <div className="w-100 h-100 mr-1">
                                <img src={insta1} alt="Plat Indien" className="img-insta-feed" />
                            </div>
                        </Col>
                        <Col md={6} sm={12} className="pr-0 pl-1 mb-md-0 mb-2">
                            <div className="w-100 h-100">
                                <img src={insta4} alt="Poulet Tikka Massala" className="img-insta-feed" />
                            </div>
                        </Col>
                        <Col md={12} sm={12} className="mt-2 px-0">
                            <img src={insta3} alt="Poulet Tikka Massala" className="img-insta-feed" />
                        </Col>
                    </Col>
                    <Col className="mr-md-2 mr-0 mb-md-0 mb-3 px-0" as={Row} md={4} sm={12}>
                        <img src={insta2} alt="Goa Food" className="img-insta-feed" />
                    </Col>
                    <Col as={Row} md={4} sm={12}>
                        <Col md={12} sm={12} className="mb-2 px-0">
                            <img src={insta5} alt="Crevettes Massala" className="img-insta-feed" />
                        </Col>
                        <Col md={6} sm={12} className="px-0 mb-md-0 mb-2">
                            <div className="w-100 h-100 mr-1">
                                <img src={insta6} alt="Assiette Poulet Curry" className="img-insta-feed" />
                            </div>
                        </Col>
                        <Col md={6} sm={12} className="pl-md-1 pl-0 pr-0">
                            <div className="w-100 h-100">
                                <img src={insta7} alt="Burger Cheese Naan" className="img-insta-feed" />
                            </div>
                        </Col>
                    </Col>
                </Col>
            </Row>

        </Container>
    );
}

export default InstaFeed;