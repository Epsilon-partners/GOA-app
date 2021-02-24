import React, { useContext, useState, useEffect } from 'react';
import firebase from '../../firebase';

const OrderContext = React.createContext();

export function useOrder() {
    return useContext(OrderContext);
};

export function OrderProvider ({ children }) {
    const [order, setOrder] = useState();
    const [orderId, setOrderId] = useState();

    const addOrder = (order) => {
        setOrder(order)
        const orderRef = firebase.database().ref('orders');
        return orderRef.push(order)
        .then(doc => setOrderId(doc.path.pieces_[1]));
    }

    useEffect(() => {
        const getOrder = () => {
            
            if (order && orderId) {
                const orderEstimationRef = firebase.database().ref(`orders`).child(`${orderId}/timeEstimation`);
                orderEstimationRef.on("value", snapshot => {
                    const newOrder = snapshot.val();
                    if (newOrder !== undefined && newOrder !== null) {
                        alert(`Commande validé ! Elle sera prête dans ${newOrder}`);
                        setOrder(null);
                        setOrderId(null);
                    }
                });
                const orderRef = firebase.database().ref('orders').child(orderId);
                orderRef.on("value", snapshot => {
                    if (snapshot.val() === null || snapshot.val() === undefined) {
                        alert('Commande refusée');
                        setOrder(null);
                        setOrderId(null);
                    }
                })
            } 
        };
        getOrder();
    }, [order, orderId])

    const value = {
        order,
        addOrder
    }

    return (
        <OrderContext.Provider value={value}>
            { children }
        </OrderContext.Provider>
    )
}