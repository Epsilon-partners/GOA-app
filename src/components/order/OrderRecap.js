import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import {
  Card,
  ListGroup,
  Row,
  Col,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Link as ScrollLink } from "react-scroll";

const OrderRecap = ({ sendValidateOrder }) => {
  const [recapArray, setRecapArray] = useState(
    JSON.parse(localStorage.getItem("recapArray"))
  );
  const [showModal, setShowModal] = useState(false);
  const [cdtAssiettes, setCdtAssiettes] = useState(false);
  const [cdtMenu, setCdtMenu] = useState(false);
  const [cdtWrap, setCdtWrap] = useState(false);
  const [menu, setMenu] = useState(false);
  const [supplement, setSupplement] = useState([]);
  const [accompAssiette, setAccompAssiette] = useState("aucun");
  const [accompMenu, setAccompMenu] = useState("");
  const [boisson, setBoisson] = useState("");
  const [sauce, setSauce] = useState("");
  const [itemToModify, setItemToModify] = useState();
  const [indexOfItem, setIndexOfItem] = useState();

  const totalPrice = (array) => {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      if ((array[i][0].type === "naan" || array[i][0].type === "classique" || array[i][0].type === "wrap") && array[i][0].menu === false) {
        total += array[i][0].prixNoMenu;
        
      } else {
        total += array[i][0].prix;
      }
    }
    return total.toFixed(2);
  };

  const addSupplements = e => {
    let supplementsList = supplement;
    let check = e.target.checked;
    let checkedSupplement = e.target.value;

    if (check) {
        setSupplement(prevState => [...prevState, checkedSupplement]);
    } else {
        let index = supplementsList.indexOf(checkedSupplement);
        if (index > -1) {
            supplementsList.splice(index, 1);
            setSupplement(supplementsList);
        }
    }
}; 

  const deleteItem = (array, value) => {
    let index = array.indexOf(value);
    setRecapArray((currentArray) =>
      currentArray.filter((elt, i) => i !== index)
    );
  };

  const modifyItem = (item, recapItem, array) => {
    if (item.type === 'assiettes') {
      setCdtAssiettes(true)
      setCdtMenu(false)
    }
    if (item.type === 'naan' || item.type === 'classique' || item.type === 'wrap') {
        setCdtMenu(true)
        setCdtAssiettes(false)
    }
    if (item.type === 'wrap') {
        setCdtMenu(true)
        setCdtAssiettes(false)
        setCdtWrap(true)
    }
    if (item.type === 'extra') {
        setCdtMenu(false)
        setCdtAssiettes(false)
        setCdtWrap(false)
    }
    setItemToModify(item);
    setSupplement(item.supplement);
    setBoisson(item.boisson);
    setSauce(item.sauce);
    setMenu(item.menu);
    setShowModal(true);
    let index = array.indexOf(recapItem);
    setIndexOfItem(index);
  };

  const modifyCart = (e) => {
    e.preventDefault();
    
    const newItem = [{
      ...itemToModify,
      prix: (itemToModify.prixOriginal + (supplement.length * 0.50)),
      prixNoMenu: (itemToModify.prixNoMenuOriginal + (supplement.length * 0.50)),
      menu,
      supplement,
      boisson,
      sauce,
      accompAssiette,
      accompMenu
    }];

    let newArray = recapArray;
    newArray[indexOfItem] = newItem;
    setRecapArray(newArray);
    localStorage.setItem('recapArray', JSON.stringify(recapArray));

    setIndexOfItem();
    setItemToModify();
    setShowModal(false);
  };

  const capitalize = (s) => {
    if (typeof s !== "string" || s.length === 0) return "Aucun";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const createOrder = (orderArray) => {
    if (orderArray === null || orderArray === undefined) return;
    sendValidateOrder(orderArray);
  };

  useEffect(() => {
    localStorage.setItem("recapArray", JSON.stringify(recapArray));
  });

  return (
    <Card className="card-order mb-4">
      {recapArray && recapArray.length ? (
        <>
          <Card.Header className="bg-white d-flex justify-content-end">
            <div className="d-flex flex-row command-btn-order mr-4">
              <ScrollLink
                className="btn btn-success rounded-0"
                onClick={() => createOrder(recapArray)}
                activeClass="active"
                spy={true}
                smooth={true}
                to="beforeSendOrder"
                style={{ cursor: "pointer" }}
                offset={-122}
              >
                Commander
              </ScrollLink>
              <div>{totalPrice(recapArray)}€</div>
            </div>
          </Card.Header>
          <ListGroup>
            {recapArray.map((recapItem) =>
              recapItem.map((item) => (
                <ListGroup.Item
                  key={uniqid()}
                  as={Row}
                  className="d-flex flex-row border border-success"
                >
                  <Col md={3} className="d-flex justify-content-center">
                    <img
                      src={`/images/${item.image}`}
                      alt={item.name}
                      className="img-recap-order"
                    />
                  </Col>
                  <Col md={6}>
                    <div className="d-flex justify-content-start mb-3">
                      <h5 className="mr-5" style={{ fontFamily: "El Messiri" }}>
                        {item.menu ? "Menu " : ""}
                        {item.name}
                      </h5>
                      {item.type === "extra" ? null : (
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className="mr-3 icon-recap"
                          onClick={(e) => modifyItem(item, recapItem, recapArray)}
                        />
                      )}
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="icon-recap"
                        onClick={() => {
                          deleteItem(recapArray, recapItem);
                        }}
                      />
                    </div>
                    <Row>
                      <Col md={6} className="d-flex justify-content-start">
                        <p className="recap-elements">
                          Boisson: <span>{capitalize(item.boisson)}</span>
                        </p>
                      </Col>
                      <Col md={6} className="d-flex justify-content-start">
                        <p className="recap-elements">
                          Accompagnement:{" "}
                          <span>{item.type === "assiettes" ? capitalize(item.accompAssiette) : capitalize(item.accompMenu)}</span>
                        </p>
                      </Col>
                      <Col md={6} className="d-flex justify-content-start">
                        <p className="recap-elements">
                          Sauce: <span>{capitalize(item.sauce)}</span>
                        </p>
                      </Col>
                      <Col md={6} className="d-flex justify-content-start">
                        <p className="recap-elements">
                          Supplément: <span>{item.supplement.length ? item.supplement.join(', ') : "Aucun"}</span>
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={3} className="d-flex justify-content-end">
                    <div className="align-self-end mr-5 price-element">
                      {(item.type === "naan" || item.type === "classique" || item.type === "wrap") && item.menu === false  ? item.prixNoMenu : item.prix}€
                    </div>
                  </Col>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </>
      ) : (
        <ListGroup className="mt-5">
          <ListGroup.Item
            as={Row}
            className="d-flex justify-content-center border border-success"
          >
            <Col>
              <p className="text-center text-dark">Votre panier est vide.</p>
            </Col>
          </ListGroup.Item>
        </ListGroup>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} id="modal-recap-order">
        <Card as={Row} className="d-flex flex-row justify-content-center">
          {itemToModify &&
          <>
          <Col md={6} sm={12} className="border-right d-flex flex-column justify-content-center">
            <h2 className="text-center">{itemToModify.name}</h2>
            <Card className="text-center align-self-start">
              <Card.Img
                variant="top"
                src={`/images/${itemToModify.image}`}
                className="mx-auto"
              />
              <Card.Body>
                {itemToModify.type === "extra" ? null : (
                  <>
                    <Card.Title>
                      Avec menu: {itemToModify.prix.toFixed(2)} €
                    </Card.Title>
                    {itemToModify.prixNoMenu && (
                      <Card.Title>
                        Sans menu: {itemToModify.prixNoMenu.toFixed(2)} €
                      </Card.Title>
                    )}
                  </>
                )}
                <Card.Text className="text-dark">
                  {itemToModify.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* form */}
          <Col md={6} sm={12}>
            <Form onSubmit={modifyCart}>
              {cdtMenu && (
                <>
                  <h3>Menu</h3>
                  <Form.Group as={Row}>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="Oui"
                        id="ouiMenu"
                        name="menu"
                        defaultChecked={itemToModify.menu === true ? true : false}
                        onChange={(e) => setMenu(true)}
                      />
                      <Form.Check
                        type="radio"
                        label="Non"
                        id="nonMenu"
                        name="menu"
                        defaultChecked={itemToModify.menu === false ? true : false}
                        onChange={(e) => setMenu(false)}
                      />
                    </Col>
                  </Form.Group>
                </>
              )}

              {/* accompagnement assiettes */}
              {cdtAssiettes && (
                <>
                  <h3>Accompagnement assiettes</h3>
                  <Form.Group as={Row}>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="galette de Naan"
                        id="geletteNaan"
                        name="assiettesAccomp"
                        defaultChecked={itemToModify.accompAssiette === "Galette de Naan" ? true : false}
                        onChange={(e) => setAccompAssiette("Galette de Naan")}
                      />
                      <Form.Check
                        type="radio"
                        label="Cheese Naan"
                        id="cheeseNaan"
                        name="assiettesAccomp"
                        defaultChecked={itemToModify.accompAssiette === "Cheese Naan" ? true : false}
                        onChange={(e) => setAccompAssiette("Cheese Naan")}
                      />
                    </Col>
                  </Form.Group>
                  <h3>Boisson</h3>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Selectionnez votre boisson</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={itemToModify.boisson}
                      custom
                      onChange={(e) => setBoisson(e.target.value)}
                    >
                      <option value="Aucune">Aucune</option>
                      <option value="coca">Coca</option>
                      <option value="sprite">Sprite</option>
                      <option value="jus">Jus</option>
                      <option value="eau">Eau</option>
                    </Form.Control>
                  </Form.Group>
                </>
              )}

              {cdtMenu && (
                <>
                  {/* accompagnement menu */}
                  <h3>Accompagnement Menu</h3>
                  <Form.Group as={Row}>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="Frites"
                        id="frites"
                        name="menuAccomp"
                        defaultChecked={itemToModify.accompMenu === "Frites" ? true : false}
                        onChange={(e) => setAccompMenu("Frites")}
                      />
                      <Form.Check
                        type="radio"
                        label="Riz"
                        id="riz"
                        name="menuAccomp"
                        defaultChecked={itemToModify.accompMenu === "Riz" ? true : false}
                        onChange={(e) => setAccompMenu("Riz")}
                      />
                    </Col>
                  </Form.Group>
                  {/* sace menu */}
                  <h3>Sauce</h3>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Selectionnez votre sauce</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={itemToModify.sauce}
                      custom
                      onChange={(e) => setSauce(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="mayo">Mayo</option>
                      <option value="harissa">Harissa</option>
                      <option value="ketchup">Ketchup</option>
                      <option value="curry">Curry</option>
                      <option value="algerienne">Algerienne</option>
                    </Form.Control>
                  </Form.Group>
                  {/* boisson menu */}
                  <h3>Boisson</h3>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Selectionnez votre boisson</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={itemToModify.boisson}
                      custom
                      onChange={(e) => setBoisson(e.target.value)}
                    >
                      <option value="Aucune">Aucune</option>
                      <option value="coca">Coca</option>
                      <option value="sprite">Sprite</option>
                      <option value="jus">Jus</option>
                      <option value="eau">Eau</option>
                    </Form.Control>
                  </Form.Group>
                </>
              )}

              {cdtWrap && (
                <>
                  <h3>Suppléments (0.50 )</h3>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Mozzarella"
                      value="Mozzarella"
                      defaultChecked={itemToModify.supplement.includes("Mozzarella")}
                      onChange={(e) => addSupplements(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Cheddar"
                      value="Cheddar"
                      defaultChecked={itemToModify.supplement.includes("Cheddar")}
                      onChange={(e) => addSupplements(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Chèvre"
                      value="Chèvre"
                      defaultChecked={itemToModify.supplement.includes("Chèvre")}
                      onChange={(e) => addSupplements(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Aucun"
                      value="Aucun"
                      defaultChecked={itemToModify.supplement.includes("Aucun")}
                      onChange={(e) => addSupplements(e)}
                    />
                  </Form.Group>
                </>
              )}

              <div className="addToCart mt-5">
                <Button
                  variant="success"
                  type="submit"
                  className="rounded-pill"
                >
                  Ajouter au panier
                </Button>
              </div>
            </Form>
          </Col>
          </>
          }
        </Card>
      </Modal>
    </Card>
  );
};

export default OrderRecap;
