import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap'
import { useLocation } from "react-router-dom"
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'



//get ALL data
const MenuItem = () => {
    const history = useHistory()
    //get menu item 
    const location = useLocation();
    let menuItem = location.state.item

    //set quantity
    const [quantity, setQuantity] = useState(1);
    const [menu, setMenu] = useState(false);
    const [supplement, setSupplement] = useState([]);
    var shoppingCart = [];
    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            return;
        }
    }


    //add items to cart

    const addToCart = e => {
        e.preventDefault();
        shoppingCart.push(
            {
                name: menuItem.name,
                price: menuItem.price,
                quantity: quantity,
                menu: menu,
                supplement: supplement
            }
        )
        
        const recapArray = localStorage.getItem('recapArray') ? JSON.parse(localStorage.getItem('recapArray')) : [];

        recapArray.push(shoppingCart);
        localStorage.setItem('recapArray', JSON.stringify(recapArray));

        // redirect user to validate order
        history.push({
            pathname: `/valider-commande`,
            state: { shoppingCart }
        })
    }

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

                    {/* form */}
                    <Col className="left-section">
                        <Form onSubmit={addToCart}>
                            <h3>Menu</h3>
                            <Form.Group as={Row}>
                                <Col sm={10}>
                                    <Form.Check
                                        type="radio"
                                        label="Oui"
                                        id="ouiMenu"
                                        name="menu"
                                        onChange={(e) => setMenu(true)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Non"
                                        id="nonMenu"
                                        name="menu"
                                        onChange={(e) => setMenu(false)}
                                    />
                                </Col>
                            </Form.Group>

                            <h3>Suppléments (0.50 )</h3>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Mozzarella" value="Mozzarella" onChange={(e) => setSupplement([...supplement, e.target.value])} />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Cheddar" value="Cheddar" onChange={(e) => setSupplement([...supplement, e.target.value])} />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Chèvre" value="Chèvre" onChange={(e) => setSupplement([...supplement, e.target.value])} />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Aucun" value="Aucun" onChange={(e) => setSupplement([...supplement, e.target.value])} />
                            </Form.Group>
                            <div className="addToCart mt-5">
                                Quantité
                            <button className="quantity-btn mx-3" type="button" onClick={decrement}>-</button>
                                {quantity}
                                <button className="quantity-btn mx-3" type="button" onClick={() => setQuantity(() => quantity + 1)}>+</button>
                                {/* <Link to={{
                                    pathname: `/valider-commande`,
                                    state: { shoppingCart }

                                }}> */}
                                {/* <Button variant="success" type="button" className="rounded-pill" onClick={addToCart} > */}
                                <Button variant="success" type="submit" className="rounded-pill" >
                                    Ajouter au panier
                                </Button>
                                {/* </Link> */}
                            </div>
                        </Form>
                    </Col>
                </Row >
            </Container>

        </div>
    );
}

export default MenuItem;