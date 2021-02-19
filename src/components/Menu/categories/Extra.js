import { ListGroup, Card, ListGroupItem, Button, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
let slugify = require('slugify')

const Extra = ({ menuList }) => {
    let menuItems = []
    menuList.map(element => {
        if (element.type === 'extra') {
            menuItems.push(element)
        }
        return 0;
    })
    let lassi = menuItems.filter(item => item.sousType === 'Lassi')
    let petitesFaims = menuItems.filter(item => item.sousType === 'Petites Faims')
    let petitPlus = menuItems.filter(item => item.sousType === 'Petit plus')
    let dessert = menuItems.filter(item => item.sousType === 'Desserts')
    let brochettes = menuItems.filter(item => item.sousType === 'Brochettes')
    return (
        <div className="extra hidden">
            <Container>
                <h2>Petites faims</h2>
                <Row>
                    {
                        petitesFaims.map((item) => (
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

                <h2>Petit plus</h2>
                <Row>
                    {
                        petitPlus.map((item) => (
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
                                        <Button type="submit" className="addToCartBtn mx-auto rounded-pill">
                                            Ajouter au panier
                                    </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>

                <h2>Brochettes</h2>
                <Row>
                    {
                        brochettes.map((item) => (
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
                                        <Button type="submit" className="addToCartBtn mx-auto rounded-pill">
                                            Ajouter au panier
                                    </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                <h2>Lassi</h2>
                <Row>
                    {
                        lassi.map((item) => (
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
                                        <Button type="submit" className="addToCartBtn mx-auto rounded-pill">
                                            Ajouter au panier
                                    </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                <h2>Desserts</h2>
                <Row>
                    {
                        dessert.map((item) => (
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
                                        <Button type="submit" className="addToCartBtn mx-auto rounded-pill">
                                            Ajouter au panier
                                    </Button>
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

export default Extra;