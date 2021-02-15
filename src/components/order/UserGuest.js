import React, { useRef } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import SignUp from '../auth/SignUp';
import SignIn from '../auth/SignIn';

const UserGuest = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const conditionsRef = useRef();

  return (
    <Card className="card-order">
      <Card.Body>
        <Card.Title className="text-center mb-5">Vos coordonnées</Card.Title>
        <Card.Text as={Row}>
          <Col md='6' sm='12'>
            <p className="text-center mb-1">
              <strong>Mode invité</strong>
            </p>
            <div className="text-center mt-0 mb-4" style={{fontSize: '12px'}}>
              Je ne souhaite pas créer un compte mais je souhaiterai être
              informé lorsque ma commande est prête
            </div>
            <Form className="d-flex flex-column justify-content-center">
                <Form.Group as={Row} controlId="name">
                    <Form.Label column sm="4">Nom</Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" placeholder="Jean" ref={nameRef} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="phone">
                    <Form.Label column sm="4">Mobile</Form.Label>
                    <Col sm="8">
                        <Form.Control type="number" placeholder="0123456789" ref={phoneRef} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="email">
                    <Form.Label column sm="4">Mail</Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" placeholder="exemple@email.com" ref={emailRef} required />
                    </Col>
                </Form.Group>
                <div className="custom-control custom-checkbox mb-3">
                    <input
                        type="checkbox"
                        id="conditions"
                        className="custom-control-input"
                        ref={conditionsRef}
                        name="conditions"
                        required
                    />
                    <label className="custom-control-label" htmlFor="conditions">
                        En cochant cette case, j'accepte et je reconnais avoir pris
                        connaissance <a href="#conditions-generales">des conditions générales</a> de vente
                        et de
                        <a href="#donnees-personnelles"> la notice de données personnelles.</a>
                    </label>
                </div>
                <Button variant="success" type="submit" className="mx-auto w-75 rounded-pill">Valider</Button>
            </Form>
          </Col>
          <Col md='6' sm='12' className="mt-5 mt-md-0">
            <p className="text-center mb-1">
              <strong>Mode Client Gagnant</strong>
            </p>
            <div className="text-center mt-0" style={{fontSize: '12px'}}>
              Je ne souhaite créer/me connecter à mon et profiter des avantages de ma fidélité, mais je souhaiterai aussi
              être informé lorsque ma commande est prête.
            </div>
            <div className="d-flex flex-column justify-content-around mt-5">
                <SignIn classStyle="btn btn-outline-success mb-5 mx-auto w-75 rounded-pill" text="Déjà inscrit ? Se connecter"/>
                <SignUp classStyle="btn btn-success mx-auto w-75 rounded-pill" text="Créer mon compte"/>
            </div>
          </Col>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserGuest;
