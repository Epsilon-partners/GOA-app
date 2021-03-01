import React from 'react';
import uniqid from 'uniqid';
import { ListGroup, Card, ListGroupItem, Button, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
let slugify = require('slugify')

const Naan = ({ menuList }) => {
    const menuItems = []
    menuList.map(element => {
        if (element.type === 'naan') {
            menuItems.push(element)
        }
        return 0;
    })


    return (
        <div className="naan menu-items border border-dark" id="naanSection" style={{paddingTop: '122px'}}>
            <Container>
                <h3 className="menuDescription my-4">Vous avez la possibilitée de choisir votre Naan avec ou sans fromage</h3>
                <Row>
                    {
                        menuItems.map((item) => (
                            <Col key={uniqid()}>
                                <Card className="text-center" style={{ width: '13rem' }}>
                                    <Card.Img variant="top" src={`/images/${item.imageUrl}`} />
                                    <Card.Body>
                                        <Card.Title>
                                            <h5>
                                                {item.name}
                                                <OverlayTrigger
                                                    key={'bottom'}
                                                    placement={'bottom'}
                                                    overlay={
                                                        <Tooltip id={`tooltip-bottom`}>
                                                            {item.description}
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Button variant="secondary" className='infoBtn'><FontAwesomeIcon icon={faInfoCircle} className="infoIcon" /></Button>
                                                </OverlayTrigger>
                                            </h5>
                                        </Card.Title>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>{item.price.toFixed(2)} €</ListGroupItem>
                                    </ListGroup>
                                    <Card.Body>
                                        <Link to={{
                                            pathname: `/menu/${slugify(item.name)}`,
                                            state: { item }

                                        }}>
                                            <Button type="submit" className="addToCartBtn mx-auto rounded-pill" >
                                                Ajouter au panier
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }

                </Row>
            </Container>
        </div>
    );
}

export default Naan;