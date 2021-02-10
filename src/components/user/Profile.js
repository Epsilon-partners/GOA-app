import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { useAuth } from '../auth/contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const Profile = () => {
    const { currentUser, updatePassword, updateEmail } = useAuth();
    const emailRef = useRef();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordEqual, setPasswordEqual] = useState(false);
    const [error, setError] = useState(false);
    const history = useHistory();


    const handleSubmit = e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordEqual(true);
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        const promises = [];

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }

        if (password) {
            promises.push(updatePassword(password));
        }

        Promise.all(promises)
        .then(() => history.push('/'))
        .catch(() => setError(true))
    };


    return ( 
        <Container className="h-100" fluid>
            <Row className="h-100">
                <Col className="h-100 d-flex align-items-center">
                    <Card className="border-dark mx-auto" style={{borderRadius: '33px'}}>
                        <Card.Body>
                            <Card.Title className="text-center mb-5 font-weight-bold">Mes informations personnelles</Card.Title>
                            <Card.Text as="div">
                                <Form as={Row}>
                                    <Col>
                                        <h6 className="font-weight-bold mb-4 text-center">Votre identité</h6>
                                        <Form.Group as={Row}>
                                            <Form.Label as="legend" column sm={4}>Civilité</Form.Label>
                                            <Col sm={8}>
                                                <Form.Check type="radio" label="M" name="civilité" id="monsieur" inline />
                                                <Form.Check type="radio" label="Mme" name="civilité" id="madame" inline />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="lastName">
                                            <Form.Label column sm={4}>Nom</Form.Label>
                                            <Col sm={8}>
                                                <Form.Control type="text" placeholder="Dupont" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="firstName">
                                            <Form.Label column sm={4}>Prenom</Form.Label>
                                            <Col sm={8}>
                                                <Form.Control type="text" placeholder="Jean" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="birthday" className="mb-0">
                                            <Form.Label column sm={4}>Date de naissance</Form.Label>
                                            <Col sm={8}>
                                                <Form.Control type="date" placeholder="XX/XX/XXXX" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="phone">
                                            <Form.Label column sm={4}>Mobile</Form.Label>
                                            <Col sm={8}>
                                                <Form.Control type="number" placeholder="XX.XX.XX.XX.XX" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="email">
                                            <Form.Label column sm={4}>Adresse mail</Form.Label>
                                            <Col sm={8}>
                                                <Form.Control type="email" placeholder="exemple@gmail.com" 
                                                ref={emailRef} defaultValue={currentUser.email} />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <h6 className="font-weight-bold mb-4 text-center">Votre adresse de livraison</h6>
                                        <Form.Group as={Row} controlId="address">
                                            <Form.Label column sm={4}>Adresse</Form.Label>
                                            <Col sm={8}>
                                                <Form.Control type="text" placeholder="14 rue Brocherie" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="code-postal">
                                            <Form.Label column sm={4}>Code postal</Form.Label>
                                            <Col sm={8}>
                                                <Form.Control type="number" placeholder="38000" max="99999" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="city">
                                            <Form.Label column sm={4}>Ville</Form.Label>
                                            <Col sm={8}>
                                                <Form.Control type="text" placeholder="Grenoble" />
                                            </Col>
                                        </Form.Group>
                                        <h6 className="font-weight-bold mb-4 text-center">Réinitialiser votre mot de passe</h6>
                                        <Form.Group as={Row} controlId="password">
                                            <Form.Label column sm={4}>Nouveau mot de passe</Form.Label>
                                            <Col sm={8}>
                                                <Form.Control type="password" placeholder="xxxxxxxxxx" value={password} 
                                                onChange={e => setPassword(e.target.value)} />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="confirmPassword">
                                            <Form.Label column sm={4}>Confirmer le nouveau mot de passe</Form.Label>
                                            <Col sm={8}>
                                                <Form.Control type="password" placeholder="xxxxxxxxxx" value={confirmPassword} 
                                                onChange={e => setConfirmPassword(e.target.value)} />
                                                {passwordEqual && <div className="text-danger">Les mots de passe ne sonts pas égaux !</div>}
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
     );
}
 
export default Profile;