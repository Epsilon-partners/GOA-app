import React, { useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';


const OrderRecap = () => {
    const [quantity, setQuantity] = useState(1);

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            return;
        }
    }

    return ( 
        <Card className="card-order">
            <Card.Body>
                <Card.Title className="text-center">Récapitulatif de ma commande</Card.Title>
                <Card.Subtitle className="text-center pb-4 mb-3 border-styled">
                    1 menu
                    Quantité 
                    <button className="quantity-btn mx-3" onClick={decrement}>-</button>
                    {quantity}
                    <button className="quantity-btn mx-3" onClick={() => setQuantity(() => quantity + 1)}>+</button>
                </Card.Subtitle>
                <Card.Text as="div">
                    <ListGroup className="border-0 d-flex flex-column justify-content-center">
                        <ListGroup.Item className="text-dark mx-auto" style={{fontSize: '16px'}}>1 cheese naan</ListGroup.Item>
                        <ListGroup.Item className="text-dark mx-auto" style={{fontSize: '16px'}}>1 coca light</ListGroup.Item>
                        <ListGroup.Item className="text-dark mx-auto" style={{fontSize: '16px'}}>1 grande frite</ListGroup.Item>
                    </ListGroup>
                    <p><strong className="text-weight-bold" style={{fontSize: '24px'}}>TOTAL : 20€</strong></p>
                </Card.Text>
                <Card.Footer className="d-flex justify-content-center bg-white border-0">
                    <Button variant="success" className="rounded-pill w-75 mx-auto">Valider</Button>
                </Card.Footer>
            </Card.Body>
        </Card>
     );
}
 
export default OrderRecap;