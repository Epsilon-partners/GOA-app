import React, { useContext, useState, useEffect } from "react";
import firebase from "../../firebase";
import { Toast } from "react-bootstrap";
import ding from '../../audio/ding.mp3';

const OrderContext = React.createContext();

export function useOrder() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [order, setOrder] = useState();
  const [orderId, setOrderId] = useState();
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [timeOrder, setTimeOrder] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isOrderRefused, setIsOrderRefused] = useState(false);
  const [showToastRefused, setShowToastRefused] = useState(false);

  const addOrder = (order) => {
    setOrder(order);
    const orderRef = firebase.database().ref("orders");
    return orderRef.push(order).then((doc) => setOrderId(doc.path.pieces_[1]));
  };

  useEffect(() => {
    const getOrder = () => {
      if (order && orderId) {
        const orderEstimationRef = firebase
          .database()
          .ref(`orders`)
          .child(`${orderId}/timeEstimation`);
        orderEstimationRef.on("value", (snapshot) => {
          const newOrder = snapshot.val();
          if (newOrder !== undefined && newOrder !== null) {
            setOrder(null);
            setOrderId(null);
            setTimeOrder(newOrder);
            setIsOrderConfirmed(true);
            setShowToast(true);
            const audio = new Audio(ding);
            audio.play();
          }
        });
        const orderRef = firebase.database().ref("orders").child(orderId);
        orderRef.on("value", (snapshot) => {
          if (snapshot.val() === null || snapshot.val() === undefined) {
            setOrder(null);
            setOrderId(null);
            setIsOrderRefused(true);
            setShowToastRefused(true);
            const audio = new Audio(ding);
            audio.play();
          }
        });
      }
    };
    getOrder();
  }, [order, orderId]);

  const value = {
    order,
    addOrder,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
      {isOrderConfirmed && (
        <Toast
          style={{ position: "fixed", bottom: 0, left: 0, margin: "1em" }}
          show={showToast}
          onClose={() => setShowToast(false)}
        >
          <Toast.Header>
            <strong className="mr-auto">Goa Food</strong>
            <small>
              Aujourd'hui à {new Date(Date.now()).getHours()}:
              {new Date(Date.now()).getMinutes() < 10 ? "0" : ""}
              {new Date(Date.now()).getMinutes()}
            </small>
          </Toast.Header>
          <Toast.Body className="bg-white">
            Commande validé ! Elle sera prête dans {timeOrder}
          </Toast.Body>
        </Toast>
      )}
      {isOrderRefused &&
        <Toast style={{ position: "fixed", bottom: 0, left: 0, margin: "1em" }}
        show={showToastRefused} onClose={() => setShowToastRefused(false)}>
            <Toast.Header>
                <strong className="mr-auto">Goa Food</strong>
                <small>
                    Aujourd'hui à {new Date(Date.now()).getHours()}:
                    {new Date(Date.now()).getMinutes() < 10 ? "0" : ""}
                    {new Date(Date.now()).getMinutes()}
                </small>
            </Toast.Header>
            <Toast.Body className="bg-white">
                Commande refusée par le restaurant.
            </Toast.Body>
        </Toast>
      }
    </OrderContext.Provider>
  );
}
