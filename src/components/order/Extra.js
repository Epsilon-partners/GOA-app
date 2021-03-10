import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const Extra = ({ extra, addExtraItem, subExtrasItems }) => {
  const [quantity, setQuantity] = useState(0);

  const decrement = (extra) => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      const quantityToSend = quantity - 1;
      subExtrasItems(extra, quantityToSend);
    }
    return;
  };

  const increment = (extra) => {
    setQuantity(prevQuantity => prevQuantity + 1);
    const quantityToSend = quantity + 1;
    addExtraItem(extra, quantityToSend);
  };

  return (
    <Card className="card-extras">
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Card.Title className="text-center" style={{fontWeight: 300}}>{extra.name} (+{extra.price}€)</Card.Title>
        <Card.Text as="div" className="d-flex justify-content-center">
          <img
            src={`images/${extra.imageUrl}`}
            alt={extra.name}
            className="h-100 w-25"
          />
          <div className="d-flex flex-row justify-content-center ml-3 align-items-center">
            <Button variant="success" className="btn-extra" onClick={() => decrement(extra)}>
              -
            </Button>
            <span className="mx-3">{quantity}</span>
            <Button variant="success" className="btn-extra" onClick={() => increment(extra)}>
              +
            </Button>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Extra;
