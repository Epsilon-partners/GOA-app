import React from 'react';
import instaIcon from '../../img/insta-icon.png'
import { Container, Row, Col } from 'react-bootstrap';


const InstaFeed = () => {
    return (
        <Container fluid className="insta-feed py-5 d-flex flex-column justify-content-center">
            <Row className="h-100">
                <Col md={4} className="d-flex flex-column justify-content-center align-items-center">
                    <h3>Découvrez plus de photos de nos plats sur notre page Instagram</h3>
                    <a href="https://www.instagram.com/goaindianfastfood/?hl=fr" target="_blank" rel="noreferrer">
                        <img src={instaIcon} alt="Instagram logo" className="insta-feed-left-img" />
                    </a>
                </Col>
                <Col md={8} as={Row}>
                    <Col as={Row} className="mr-2">
                        <Col md={6} className="px-0">
                            <div className="w-100 h-100 border border-danger mr-1"></div>
                        </Col>
                        <Col md={6} className="pr-0 pl-1">
                            <div className="w-100 h-100 border border-primary"></div>
                        </Col>
                        <Col md={12} className="border border-warning mt-2"></Col>
                    </Col>
                    <Col className="border border-info mr-2" as={Row}>

                    </Col>
                    <Col as={Row}>
                        <Col md={12} className="border border-primary mb-2"></Col>
                        <Col md={6} className="px-0">
                            <div className="w-100 h-100 border border-danger mr-1"></div>
                        </Col>
                        <Col md={6} className="pl-1 pr-0">
                            <div className="w-100 h-100 border border-warning"></div>
                        </Col>
                    </Col>
                </Col>
            </Row>

        </Container>
    );
}

export default InstaFeed;