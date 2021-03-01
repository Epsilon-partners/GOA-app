import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { ListGroup, Card, ListGroupItem, Button, Container, Row, Col, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
let slugify = require('slugify')

const Assiettes = ({ menuList }) => {
    const [menuItems, setMenuItems] = useState([]);
    

    useEffect(() => {
        const getItems = () => {
            menuList.map(element => {
                if (element.type === 'assiettes') {
                    setMenuItems(prevState => [...prevState, element]);
                }
                return 0;
            });
        };
        getItems();
    }, [])

    return (
        <div className="assiettes menu-items border border-dark" id="assiettesSection" style={{paddingTop: '122px'}}>
            <Container>
                <h3 className="menuDescription my-4">Toutes nos assiettes sont accompagnées <br /> d'une galette de Naan ou Cheese Naan</h3>
                <Row>

                    {menuItems.length ?
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
                                        {/* <Link to={`/menu/${slugify(item.name)}`}> */}
                                        <Link to={{
                                            pathname: `/menu/${slugify(item.name)}`,
                                            state: { item }

                                        }}>
                                            <Button type="submit" className="addToCartBtn mx-auto" >
                                                Ajouter au panier
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    : 
                    <Col className="d-flex justify-content-center">
                        <Spinner animation="grow" variant="dark" />
                    </Col>
                    }

                </Row>
            </Container>

        </div >
    );
}

export default Assiettes;