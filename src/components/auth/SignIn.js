import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

const SignIn = () => {
    const [show, setShow] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [stayConnected, setStayConnected] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSumbit = e => {
        e.preventDefault();

        const user = {
            email,
            password
        };

        console.log(user);
    }

    return ( 
        <>
            <Button variant="primary" onClick={handleShow}>
                Se connecter
            </Button>

            <Modal show={show} onHide={handleClose} className="border border-dark rounded modal-custom">
                <Modal.Header closeButton className="h2 border-0">Se connecter</Modal.Header>
                <Modal.Body>
                    <Form className="d-flex flex-column justify-content-center" onSubmit={handleSumbit}>
                        <Form.Group as={Row} controlId="email">
                            <Form.Label column sm="4">
                                Adresse mail
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="email" placeholder="xxxx.@gmail.com" value={email}
                                onChange={e => setEmail(e.target.value)} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="password">
                            <Form.Label column sm="4">
                                Mot de passe
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="password" placeholder="xxxxxxxxxx" value={password}
                                onChange={e => setPassword(e.target.value)} required />
                            </Col>
                        </Form.Group>
                        <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" id="stayConnected" className="custom-control-input" value={stayConnected} 
                            onChange={e => setStayConnected(e.target.checked)} name="stayConnected" />
                            <label className="custom-control-label" htmlFor="stayConnected">Rester connecté</label>
                        </div>
                        <Button variant="outline-success" type="submit" className="mx-auto w-75 rounded-pill">
                            Se connecter
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
     );
}
 
export default SignIn;