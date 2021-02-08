import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';

const Copyright = () => {
    return ( 
        <Col>
            <ListGroup horizontal className="border-0 d-flex justify-content-around px-3">
                <ListGroup.Item className="border-0">&copy; Copyright 2021 GOA Indian Fast-Food. All Rights Reserved.</ListGroup.Item>
                <ListGroup.Item className="border-0">Mentions légales</ListGroup.Item>
                <ListGroup.Item className="border-0">Données personnelles</ListGroup.Item>
                <ListGroup.Item className="border-0">Conditions générales de vente</ListGroup.Item>
            </ListGroup>
        </Col>
     );
}
 
export default Copyright;