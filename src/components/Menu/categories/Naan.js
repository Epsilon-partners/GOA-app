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
        <div className="naan hidden">
            <Container>
                <Row>
                    {
                        menuItems.map((item) => (
                            <Col key={item.id}>
                                <Card className="text-center" style={{ width: '12rem' }}>
                                    <Card.Img variant="top" src={`/images/${item.imageUrl}`} />
                                    <Card.Body>
                                        <Card.Title>{item.name}
                                            {/* tooltip */}
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