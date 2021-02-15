import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import banana from '../../img/lassiBanana_300x300.jpg';
import mango from '../../img/lassiMango_300x300.jpg';

const Extra = () => {
    const [bananasQuantity, setBananasQuantity] = useState(0);
    const [mangoQuantity, setMangoQuantity] = useState(0);

    const decrementBananas = () => {
        if (bananasQuantity > 0) setBananasQuantity(bananasQuantity - 1)
        return;
    };

    const decrementMango = () => {
        if (mangoQuantity > 0) setMangoQuantity(mangoQuantity - 1)
        return;
    };

    return ( 
        <Card className="card-order">
            <Card.Body>
                <Card.Title className="text-center">Un petit extra ?</Card.Title>
                <Card.Text as={Row}>
                    <Col sm="6" className="px-0">
                        <div className="d-flex justify-content-center mb-3">
                            <img src={banana} alt="Lassi Banane" width="50" height="50" />
                        </div>
                        <p className="text-dark text-center">
                            Quantité
                            <button className="quantity-btn mx-1" onClick={decrementBananas}>-</button>
                            {bananasQuantity}
                            <button className="quantity-btn mx-1" onClick={() => setBananasQuantity(() => 
                                bananasQuantity + 1)}>+</button>
                        </p>
                    </Col>
                    <Col sm="6" className="px-0">
                        <div className="d-flex justify-content-center mb-3">
                            <img src={mango} alt="Lassi Mangue" width="50" height="50" />
                        </div>
                        <p className="text-dark text-center">
                            Quantité
                            <button className="quantity-btn mx-1" onClick={decrementMango}>-</button>
                            {mangoQuantity}
                            <button className="quantity-btn mx-1" onClick={() => setMangoQuantity(mangoQuantity + 1)}>+</button>
                        </p>
                    </Col>
                </Card.Text>
            </Card.Body>
        </Card>
     );
}
 
export default Extra;