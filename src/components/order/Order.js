import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../auth/contexts/AuthContext';
import OrderRecap from './OrderRecap';
import UserInfo from './UserInfo';
import UserGuest from './UserGuest';

function Order() {
    //get menu item 
    const { currentUser } = useAuth();

    return (
        <Container>
            <Row>
                <Col md={12} sm={12}>
                    <OrderRecap />
<<<<<<< HEAD
                    {/* <Extra /> */}
=======
>>>>>>> order
                </Col>
                <Col md={12} sm={12}>
                    {currentUser ? <UserInfo userID={currentUser.uid} /> : <UserGuest />}
                </Col>
            </Row>
        </Container>
    );
}

export default Order;