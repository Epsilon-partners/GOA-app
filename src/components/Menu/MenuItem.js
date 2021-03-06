import { Card, Button, Row, Col, Form, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//get ALL data
const MenuItem = ({ item }) => {
  let shoppingCart = [];
  const history = useHistory();
  const [menuItem] = useState(item);
  const [cdtAssiettes, setCdtAssiettes] = useState(false);
  const [cdtMenu, setCdtMenu] = useState(false);
  const [cdtWrap, setCdtWrap] = useState(false);
  const [menu, setMenu] = useState(false);
  const [supplement, setSupplement] = useState([]);
  const [accompAssiette, setAccompAssiette] = useState("aucun");
  const [accompMenu, setAccompMenu] = useState("");
  const [boisson, setBoisson] = useState("");
  const [sauce, setSauce] = useState("");
  let [prix] = useState(menuItem.price);
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    const fn = () => {
      if (menuItem.type === "assiettes") {
        setCdtAssiettes(true);
        setCdtMenu(false);
      }
      if (
        menuItem.type === "naan" ||
        menuItem.type === "classique" ||
        menuItem.type === "wrap"
      ) {
        setCdtMenu(true);
        setCdtAssiettes(false);
      }
      if (menuItem.type === "wrap") {
        setCdtMenu(true);
        setCdtAssiettes(false);
        setCdtWrap(true);
      }
      if (menuItem.type === "extra") {
        setCdtMenu(false);
        setCdtAssiettes(false);
        setCdtWrap(false);
      }
    };
    fn();
  }, [menuItem]);

  //add items to cart
  const addToCart = (e) => {
    e.preventDefault();
    if (
      menuItem.type === "naan" ||
      menuItem.type === "classique" ||
      menuItem.type === "wrap"
    ) {
      if (menu === false) {
        prix = menuItem.priceNoMenu;
      }
    }
    shoppingCart.push({
      name: menuItem.name,
      accompMenu: accompMenu,
      prix: (prix + (supplement.length * 0.50)),
      prixOriginal: prix,
      prixNoMenuOriginal: menuItem.priceNoMenu,
      prixNoMenu: (menuItem.priceNoMenu + (supplement.length * 0.50)),
      type: menuItem.type,
      image: menuItem.imageUrl,
      description: menuItem.description,
      menu: menu,
      supplement: supplement,
      boisson: boisson,
      sauce: sauce,
      accompAssiette: accompAssiette,
    });
    const recapArray =
      localStorage.getItem("recapArray") !== null
        ? JSON.parse(localStorage.getItem("recapArray"))
        : [];
    recapArray.push(shoppingCart);
    localStorage.setItem("recapArray", JSON.stringify(recapArray));
    // redirect user to validate order
    history.push({
      pathname: `/valider-commande`,
      state: { shoppingCart },
    });
  };

  return (
    <>
    <Button type="button" className="addToCartBtn mx-auto" onClick={() => setShowModal(true)}>
      Ajouter au panier
    </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Row>
          <Col className="border-right d-flex flex-column justify-content-center">
            <h2 className="text-center">{menuItem.name}</h2>
            <Card className="text-center">
              <Card.Img variant="top" src={`/images/${menuItem.imageUrl}`} className="mx-auto"
              style={{height: 'auto', maxWidth: '100%'}} />
              <Card.Body>
                {menuItem.type === "extra" ? (
                  <Card.Title>
                    {menuItem.price.toFixed(2)}€
                  </Card.Title>
                ) : (
                  <>
                  <Card.Title>
                    Avec menu: {menuItem.price.toFixed(2)} €
                  </Card.Title>
                  {menuItem.priceNoMenu && (
                  <Card.Title>
                    Sans menu: {typeof menuItem.priceNoMenu === 'number' ? menuItem.priceNoMenu.toFixed(2) : menuItem.priceNoMenu} €
                  </Card.Title>
                )}
                  </>
                )}
                <Card.Text className="text-dark">
                  {menuItem.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* form */}
          <Col className="left-section">
            <Form onSubmit={addToCart}>
              {cdtMenu && (
                <>
                  <h3 className="modal-title-style">Menu</h3>
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
                </>
              )}

              {/* accompagnement assiettes */}
              {cdtAssiettes && (
                <>
                  <h3 className="modal-title-style">Accompagnement assiettes</h3>
                  <Form.Group as={Row}>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="galette de Naan"
                        id="geletteNaan"
                        name="assiettesAccomp"
                        onChange={(e) => setAccompAssiette("Galette de Naan")}
                      />
                      <Form.Check
                        type="radio"
                        label="Cheese Naan"
                        id="cheeseNaan"
                        name="assiettesAccomp"
                        onChange={(e) => setAccompAssiette("Cheese Naan")}
                      />
                    </Col>
                  </Form.Group>
                  <h3 className="modal-title-style">Boisson</h3>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Selectionnez votre boisson</Form.Label>
                    <Form.Control
                      as="select"
                      value={boisson}
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
                  <h3 className="modal-title-style">Accompagnement Menu</h3>
                  <Form.Group as={Row}>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="Frites"
                        id="frites"
                        name="menuAccomp"
                        onChange={(e) => setAccompMenu("Frites")}
                      />
                      <Form.Check
                        type="radio"
                        label="Riz"
                        id="riz"
                        name="menuAccomp"
                        onChange={(e) => setAccompMenu("Riz")}
                      />
                    </Col>
                  </Form.Group>
                  {/* sace menu */}
                  <h3 className="modal-title-style">Sauce</h3>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Selectionnez votre sauce</Form.Label>
                    <Form.Control
                      as="select"
                      value={sauce}
                      custom
                      onChange={(e) => setSauce(e.target.value)}
                    >
                      <option value="Aucune">Aucune</option>
                      <option value="mayo">Mayo</option>
                      <option value="harissa">Harissa</option>
                      <option value="ketchup">Ketchup</option>
                      <option value="curry">Curry</option>
                      <option value="algerienne">Algerienne</option>
                    </Form.Control>
                  </Form.Group>
                  {/* boisson menu */}
                  <h3 className="modal-title-style">Boisson</h3>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Selectionnez votre boisson</Form.Label>
                    <Form.Control
                      as="select"
                      value={boisson}
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
                  <h3 className="modal-title-style">Suppléments (+0.50€)</h3>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Mozzarella"
                      value="Mozzarella"
                      onChange={(e) => addSupplements(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Cheddar"
                      value="Cheddar"
                      onChange={(e) => addSupplements(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Chèvre"
                      value="Chèvre"
                      onChange={(e) => addSupplements(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Aucun"
                      value="Aucun"
                      onChange={(e) => {
                        if (e.target.checked) setSupplement([]);
                      }}
                    />
                  </Form.Group>
                </>
              )}

              <div className="addToCart mt-5 d-flex justify-content-center">
                <Button
                  variant="success"
                  type="submit"
                  className="rounded-pill btn-custom-white"
                >
                  Ajouter au panier
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal>
      </>
  );
};

export default MenuItem;
