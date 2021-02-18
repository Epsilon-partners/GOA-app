import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../auth/contexts/AuthContext';
import OrderRecap from './OrderRecap';
import UserInfo from './UserInfo';
import UserGuest from './UserGuest';
import Extra from './Extra';
import { useLocation } from "react-router-dom";

function Order() {
    //get menu item 
    const location = useLocation();
    const item = location.state.shoppingCart;
    console.log('item', item);
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