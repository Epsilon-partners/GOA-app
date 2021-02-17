import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import firebase from '../../firebase'
import { useLocation } from "react-router-dom";


//get ALL data
const db = firebase.firestore();
const MenuItem = () => {

    const location = useLocation();
    console.log(location.state.item.imageUrl);
    let menuItem = location.state.item
    return (
        <div className="menu-item">
            <Container>
                <Row>
                    <Col className="right-section justify-content-center">
                        <h2>{menuItem.name}</h2>
                        <Card style={{ width: '20rem' }} className="text-center">
                            <Card.Img variant="top" src={`/images/${menuItem.imageUrl}`} />
                            <Card.Body>
                                <Card.Title>{menuItem.name}</Card.Title>
                                <Card.Text className="text-dark">
                                    {menuItem.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="left-section">

                        <div className="asMenu">
                            <h3>Menu</h3>
                            <div>
                                <label class="containerRadio">Oui
                                    <input type="radio" checked="checked" name="radio1" value="oui" id="oui" />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="containerRadio">Non
                                    <input type="radio" name="radio1" value="non" id="non" />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <div className="supplements">
                            <h3>Suppléments (0.50)</h3>
                            <div>
                                <label class="containerRadio">Mozzarella
                                    <input type="radio" checked="checked" name="radio2" value="mozzarella" id="mozzarella" />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="containerRadio">Cheddar
                                    <input type="radio" name="radio2" value="cheddar" id="cheddar" />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="containerRadio">Chèvre
                                    <input type="radio" name="radio2" value="chevre" id="chevre" />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>



                    </Col>
                </Row >
            </Container>

        </div>
    );
}

export default MenuItem;