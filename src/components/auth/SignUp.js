import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row, Alert } from 'react-bootstrap';
import { useAuth } from './contexts/AuthContext';
import { useHistory }from 'react-router-dom';

const SignUp = () => {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [passwordEqual, setPasswordEqual] = useState(false);
    const { signup } = useAuth();
    const history = useHistory();
    const [error, setError] = useState(false);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [stayConnected, setStayConnected] = useState(false);
    const [conditions, setConditions] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else if (password !== confirmPassword) {
            setPasswordEqual(true);
            e.preventDefault();
            e.stopPropagation();
        } else {
            setValidated(true);
            setPasswordEqual(false);
        
            const user = {
                name,
                birthday,
                phone,
                stayConnected,
                conditions,
            };

            try {
                await signup(email, password, user);
                history.push('/dashboard');
            } catch {
                setError(true);
            }
        }
    }

    return ( 
        <>
            <a href='#' onClick={handleShow}>
                Créer un compte
            </a>

            <Modal show={show} onHide={handleClose} className="border border-dark rounded modal-custom">
                <Modal.Header closeButton className="h2 border-0">Créer mon compte</Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="email">
                            <Form.Label column sm="4">
                                Adresse mail
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="email" placeholder="xxxx.@gmail.com" value={email}
                                 onChange={e => setEmail(e.target.value)} name="email" required />
                                 <Form.Control.Feedback>Valide</Form.Control.Feedback>
                                 <Form.Control.Feedback type='invalid'>Non valide</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="name">
                            <Form.Label column sm="4">
                                Nom
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="Nom" value={name} 
                                onChange={e => setName(e.target.value)} name="name" required />
                                <Form.Control.Feedback>Valide</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>Non valide</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="birthday">
                            <Form.Label column sm="4">
                                Date de naissance (facultatif)
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="date" placeholder="XX/XX/XXXX" value={birthday} 
                                onChange={e => setBirthday(e.target.value)} name="birthday" />
                                <Form.Control.Feedback>Valide</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>Non valide</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="phone">
                            <Form.Label column sm="4">
                                Téléphone
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" placeholder="xx.xx.xx.xx.xx" value={phone} 
                                onChange={e => setPhone(e.target.value)} name="phone" required />
                                <Form.Control.Feedback>Valide</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>Non valide</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="password">
                            <Form.Label column sm="4">
                                Créer un mot de passe
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="password" placeholder="xxxxxxxxxx" value={password} 
                                onChange={e => setPassword(e.target.value)} name="password" required />
                                <Form.Control.Feedback>Valide</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>Non valide</Form.Control.Feedback>
                                <div className="text-right text-small">6 caractères minimum</div>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="confirmPassword">
                            <Form.Label column sm="4">
                                Confirmez le mot de passe
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="password" placeholder="xxxxxxxxxx" value={confirmPassword} 
                                onChange={e => setConfirmPassword(e.target.value)} name="confirmPassword" required />
                                <Form.Control.Feedback>Valide</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>Non valide</Form.Control.Feedback>
                                {passwordEqual && <div className="text-danger">Les mots de passe ne sonts pas égaux !</div>}
                            </Col>
                        </Form.Group>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id="stayConnected" className="custom-control-input" value={stayConnected} 
                            onChange={e => setStayConnected(e.target.checked)} name="stayConnected" />
                            <label className="custom-control-label" htmlFor="stayConnected">Rester connecté</label>
                            <Form.Control.Feedback>Valide</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Non valide</Form.Control.Feedback>
                        </div>
                        <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" id="conditions" className="custom-control-input" value={conditions} 
                            onChange={e => setConditions(e.target.checked)} name="conditions" required />
                            <label className="custom-control-label" htmlFor="conditions">
                                En cochant cette case, j'accepte et je reconnais avoir
                                pris connaissance <a href="#">des conditions générales</a> de vente et de 
                                 <a href="#"> la notice de données personnelles.</a>
                            </label>
                            <Form.Control.Feedback>Valide</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Non valide</Form.Control.Feedback>
                        </div>
                        <Button variant="outline-success" type="submit" className="mx-auto w-75 rounded-pill">
                            Continuer
                        </Button>
                    </Form>
                    {error && <Alert variant="danger" className="my-4">Un problème est survenu avec votre inscription, veuillez réessayer.</Alert>}
                </Modal.Body>
            </Modal>
        </>
     );
}
 
export default SignUp;