import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap'
import { useLocation } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'



//get ALL data
const MenuItem = () => {
    let shoppingCart = [];
    const history = useHistory()
    const location = useLocation();
    let menuItem = location.state.item
    const [cdtAssiettes, setCdtAssiettes] = useState(false)
    const [cdtMenu, setCdtMenu] = useState(false)
    const [cdtWrap, setCdtWrap] = useState(false)
    const [menu, setMenu] = useState(false);
    const [supplement, setSupplement] = useState('aucun');
    const [accompAssiette, setAccompAssiette] = useState('aucun');
    const [accompMenu, setAccompMenu] = useState('');
    const [boisson, setBoisson] = useState('');
    const [sauce, setSauce] = useState('');
    let [prix, setPrix] = useState(menuItem.price)


    useEffect(() => {
        const fn = () => {
            if (menuItem.type === 'assiettes') {
                setCdtAssiettes(true)
                setCdtMenu(false)
            }
            if (menuItem.type === 'naan' || menuItem.type === 'classique' || menuItem.type === 'wrap') {
                setCdtMenu(true)
                setCdtAssiettes(false)
            }
            if (menuItem.type === 'wrap') {
                setCdtMenu(true)
                setCdtAssiettes(false)
                setCdtWrap(true)
            }
            if (menuItem.type === 'extra') {
                setCdtMenu(false)
                setCdtAssiettes(false)
                setCdtWrap(false)
            }
        }
        fn()
    }, [menuItem])



    //add items to cart
    const addToCart = e => {
        e.preventDefault();
        if (menuItem.type === 'naan' || menuItem.type === 'classique' || menuItem.type === 'wrap') {
            if (menu === false) {
                prix = menuItem.priceNoMenu
            }
        }
        shoppingCart.push(
            {
                name: menuItem.name,
                prix: prix,
                image: menuItem.imageUrl,
                menu: menu,
                supplement: supplement,
                boisson: boisson,
                sauce: sauce,
                accompAssiette: accompAssiette

            }
        )
        const recapArray = localStorage.getItem('recapArray') !== null ? JSON.parse(localStorage.getItem('recapArray')) : [];
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
            <Container className="mt-5">
                <Row>
                    <Col className="right-section justify-content-center">
                        <h2>{menuItem.name}</h2>
                        <Card style={{ width: '20rem' }} className="text-center">
                            <Card.Img variant="top" src={`/images/${menuItem.imageUrl}`} />
                            <Card.Body>
                                <Card.Title>Avec menu: {menuItem.price.toFixed(2)} €</Card.Title>
                                {menuItem.priceNoMenu && <Card.Title>Sans menu: {menuItem.priceNoMenu.toFixed(2)} €</Card.Title>}
                                <Card.Text className="text-dark">
                                    {menuItem.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* form */}
                    <Col className="left-section">
                        <Form onSubmit={addToCart}>
                            {cdtMenu &&
                                <>
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
                                </>}


                            {/* accompagnement assiettes */}
                            {cdtAssiettes &&
                                <>
                                    <h3>Accompagnement assiettes</h3>
                                    <Form.Group as={Row}>
                                        <Col sm={10}>
                                            <Form.Check
                                                type="radio"
                                                label="galette de Naan"
                                                id="geletteNaan"
                                                name="assiettesAccomp"
                                                onChange={(e) => setAccompAssiette('Galette de Naan')}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Cheese Naan"
                                                id="cheeseNaan"
                                                name="assiettesAccomp"
                                                onChange={(e) => setAccompAssiette('Cheese Naan')}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <h3>Boisson</h3>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>Selectionnez votre boisson</Form.Label>
                                        <Form.Control as="select" value={boisson} custom onChange={(e) => setBoisson(e.target.value)}>
                                            <option value=""></option>
                                            <option value="coca">Coca</option>
                                            <option value="sprite">Sprite</option>
                                            <option value="jus">Jus</option>
                                            <option value="eau">Eau</option>

                                        </Form.Control>
                                    </Form.Group>

                                </>
                            }



                            {cdtMenu &&
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
                                                onChange={(e) => setAccompMenu('Frites')}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Riz"
                                                id="riz"
                                                name="menuAccomp"
                                                onChange={(e) => setAccompMenu('Riz')}
                                            />
                                        </Col>
                                    </Form.Group>
                                    {/* sace menu */}
                                    <h3>Sauce</h3>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>Selectionnez votre sauce</Form.Label>
                                        <Form.Control as="select" value={sauce} custom onChange={(e) => setSauce(e.target.value)}>
                                            <option value=""></option>
                                            <option value='mayo'>Mayo</option>
                                            <option value='harissa'>Harissa</option>
                                            <option value='ketchup'>Ketchup</option>
                                            <option value='curry'>Curry</option>
                                            <option value='algerienne'>Algerienne</option>
                                        </Form.Control>
                                    </Form.Group>
                                    {/* boisson menu */}
                                    <h3>Boisson</h3>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>Selectionnez votre boisson</Form.Label>
                                        <Form.Control as="select" value={boisson} custom onChange={(e) => setBoisson(e.target.value)}>
                                            <option value=""></option>
                                            <option value="coca">Coca</option>
                                            <option value="sprite">Sprite</option>
                                            <option value="jus">Jus</option>
                                            <option value="eau">Eau</option>

                                        </Form.Control>
                                    </Form.Group>

                                </>}

                            {cdtWrap &&
                                <>
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

                                </>
                            }



                            <div className="addToCart mt-5">
                                <Button variant="success" type="submit" className="rounded-pill" >
                                    Ajouter au panier
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row >
            </Container >

        </div >
    );
}

export default MenuItem;