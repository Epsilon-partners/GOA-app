import React, { useState, useEffect } from "react";
import uniqid from 'uniqid';
import { Card, Button, ListGroup, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const OrderRecap = ({ sendValidateOrder }) => {
  const [recapArray, setRecapArray] = useState(JSON.parse(localStorage.getItem('recapArray')));

  const totalPrice = (array) => {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += array[i][0].prix;
    }
    return total.toFixed(2);
  };

  const deleteItem = (array, value) => {
    let index = array.indexOf(value);
    setRecapArray(currentArray => currentArray.filter((elt, i) => i !== index));
  };

  const capitalize = (s) => {
    if (typeof s !== "string" || s.length === 0) return "Aucun";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const createOrder = orderArray => {
    if (orderArray === null || orderArray === undefined) return;
    sendValidateOrder(orderArray);
  }



  useEffect(() => {
    localStorage.setItem('recapArray', JSON.stringify(recapArray));
  })

  return (
    <Card className="card-order mb-4">
          {recapArray && recapArray.length ? (
            <>
            <Card.Header className="bg-white d-flex justify-content-end">
              <div className="d-flex flex-row command-btn-order mr-4">
                <Button variant="success" className="rounded-0" onClick={() => createOrder(recapArray)}>Commander</Button>
                <div>{totalPrice(recapArray)}</div>
              </div>
            </Card.Header>
              <ListGroup>
                {recapArray.map((recapItem) =>
                  recapItem.map((item) => (
                    <ListGroup.Item key={uniqid()} as={Row} className="d-flex flex-row border border-success">
                      <Col md={3} className="d-flex justify-content-center">
                        <img src={`/images/${item.image}`} alt={item.name} className="img-recap-order" />
                      </Col>
                      <Col md={6}>
                        <div className="d-flex justify-content-start mb-3">
                          <h5 className="mr-5" style={{fontFamily: 'El Messiri'}}>{item.menu ? "Menu " : ""}{item.name}</h5>
                          <FontAwesomeIcon icon={faPencilAlt} className="mr-3 icon-recap" />
                          <FontAwesomeIcon icon={faTrash} className="icon-recap"
                          onClick={() => {
                            deleteItem(recapArray, recapItem);
                          }} />
                        </div>
                        <Row>
                          <Col md={6} className="d-flex justify-content-start">
                            <p className="recap-elements">Boisson: <span>{capitalize(item.boisson)}</span></p>
                          </Col>
                          <Col md={6} className="d-flex justify-content-start">
                            <p className="recap-elements">Accompagnement: <span>{capitalize(item.accompAssiette)}</span></p>
                          </Col>
                          <Col md={6} className="d-flex justify-content-start">
                            <p className="recap-elements">Sauce: <span>{capitalize(item.sauce)}</span></p>
                          </Col>
                          <Col md={6} className="d-flex justify-content-start">
                            <p className="recap-elements">Supplément: <span>{capitalize(item.supplement)}</span></p>
                          </Col>
                        </Row>
                      </Col>
                      <Col md={3} className="d-flex justify-content-end">
                          <div className="align-self-end mr-5 price-element">{item.prix}€</div>
                      </Col>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </>
          ) : (
            <ListGroup className="mt-5">
              <ListGroup.Item as={Row} className="d-flex justify-content-center border border-success">
                <Col>
                  <p className="text-center text-dark">Votre panier est vide.</p>
                </Col>
              </ListGroup.Item>
            </ListGroup>
          )}
    </Card >
  );
};

export default OrderRecap;
