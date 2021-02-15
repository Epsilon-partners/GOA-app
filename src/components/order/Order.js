import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../auth/contexts/AuthContext';
import OrderRecap from './OrderRecap';
import UserInfo from './UserInfo';
import UserGuest from './UserGuest';
import Extra from './Extra';

function Order () {
    const { currentUser } = useAuth();

    return ( 
        <Container>
            <Row>
                <Col md={4} sm={12}>
                    <OrderRecap />
                    <Extra />
                </Col>
                <Col md={8} sm={12}>
                     {currentUser ? <UserInfo userID={currentUser.uid} /> : <UserGuest />}
                </Col>
            </Row>
        </Container>
     );
}
 
export default Order;