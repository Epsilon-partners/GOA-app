import React, { useState } from 'react';
import { Card, Button, Table } from 'react-bootstrap';


const OrderRecap = () => {
    const [quantity, setQuantity] = useState(1);
    const recapArray = JSON.parse(localStorage.getItem('recapArray'));

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            return;
        }
    };

    const totalPrice = array => {
        let total = 0;
        for (let i = 0; i < array.length; i++) {
            total += array[i][0].price;
        }
        return total.toFixed(2);
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
                    {recapArray && (
                        <Table>
                            {recapArray.map(recapItem => (
                                <tbody>
                                    <tr>
                                        <td>{recapItem[1].quantity}</td>
                                        <td>{recapItem[0].name}</td>
                                        <td>{recapItem[0].price} €</td>
                                        <td><Button variant="danger" type="button">Supprimer</Button></td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                    )}
                    <p><strong className="text-weight-bold" style={{fontSize: '24px'}}>TOTAL : {totalPrice(recapArray)} €</strong></p>
                </Card.Text>
                <Card.Footer className="d-flex justify-content-center bg-white border-0">
                    <Button variant="success" className="rounded-pill w-75 mx-auto">Valider</Button>
                </Card.Footer>
            </Card.Body>
        </Card>
     );
}
 
export default OrderRecap;