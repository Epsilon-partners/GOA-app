import React, { useContext, useState, useEffect } from "react";
import firebase from "../../firebase";
import { Toast } from "react-bootstrap";
import ding from "../../audio/ding.mp3";

const OrderContext = React.createContext();

export function useOrder() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [order, setOrder] = useState();
  const [orderId, setOrderId] = useState();
  const [timeOrder, setTimeOrder] = useState("");
  const [orderNumber, setOrderNumber] = useState();

  const [showToast, setShowToast] = useState(false);
  const [showToastRefused, setShowToastRefused] = useState(false);
  const [showToastFinished, setShowToastFinished] = useState(false);
  const [showToastDelivred, setShowToastDelivred] = useState(false);

  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [isOrderRefused, setIsOrderRefused] = useState(false);
  const [isOrderFinished, setIsOrderFinished] = useState(false);
  const [isOrderDelivred, setIsOrderDelivred] = useState(false);

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
            const orderNumberRef = firebase
              .database()
              .ref("orders")
              .child(`${orderId}/orderNumber`);
            orderNumberRef.on("value", (snapshotOrder) => {
              setOrderNumber(snapshotOrder.val());
              setTimeOrder(newOrder);
              setIsOrderConfirmed(true);
              setShowToast(true);
              const audio = new Audio(ding);
              audio
                .play()
                .catch((err) =>
                  console.error(
                    "Votre n'avigateur n'autorise pas les lectures audios automatiques",
                    err
                  )
                );
            });
          }
        });
        const orderFinishedRef = firebase
          .database()
          .ref("orders")
          .child(`${orderId}/finished`);
        orderFinishedRef.on("value", (snapshot) => {
          if (snapshot.val() === true) {
            console.log(snapshot.val());
            setIsOrderFinished(true);
            setShowToastFinished(true);
            const audio = new Audio(ding);
            audio
              .play()
              .catch((err) =>
                console.error(
                  "Votre n'avigateur n'autorise pas les lectures audios automatiques",
                  err
                )
              );
          }
        });
        const orderDelivredRef = firebase
          .database()
          .ref("orders")
          .child(`${orderId}/delivred`);
        orderDelivredRef.on("value", (snapshot) => {
          if (snapshot.val() === true) {
            console.log(snapshot.val());
            setIsOrderDelivred(true);
            setShowToastDelivred(true);
            setOrder(null);
            setOrderId(null);
            const audio = new Audio(ding);
            audio
              .play()
              .catch((err) =>
                console.error(
                  "Votre n'avigateur n'autorise pas les lectures audios automatiques",
                  err
                )
              );
          }
        });
        const orderRef = firebase
          .database()
          .ref("orders")
          .child(`${orderId}/deleted`);
        const orderNumberRefDelete = firebase
          .database()
          .ref(`orders/${orderId}/orderNumber`);
        orderNumberRefDelete.once("value", (snapshotRef) => {
          setOrderNumber(snapshotRef.val());
        });
        orderRef.on("value", (snapshot) => {
          if (snapshot.val() === true) {
            setOrder(null);
            setOrderId(null);
            setIsOrderRefused(true);
            setShowToastRefused(true);
            const audio = new Audio(ding);
            audio
              .play()
              .catch((err) =>
                console.error(
                  "Votre n'avigateur n'autorise pas les lectures audios",
                  err
                )
              );
          }
        });
      }
    };
    getOrder();
  }, [order, orderId, orderNumber]);

  const value = {
    order,
    addOrder,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "auto",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            margin: "1rem",
          }}
        >
          {isOrderConfirmed && (
            <Toast
              style={{ width: "max-content" }}
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
                Votre commande {orderNumber} a été validé ! Elle sera prête dans{" "}
                {timeOrder}
              </Toast.Body>
            </Toast>
          )}
          {isOrderRefused && (
            <Toast
              style={{ width: "max-content" }}
              show={showToastRefused}
              onClose={() => setShowToastRefused(false)}
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
                La commande {orderNumber} a été refusée par le restaurant.
              </Toast.Body>
            </Toast>
          )}
          {isOrderFinished && (
            <Toast
              style={{ width: "max-content" }}
              show={showToastFinished}
              onClose={() => setShowToastFinished(false)}
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
                Votre commande {orderNumber} est prête !
              </Toast.Body>
            </Toast>
          )}
          {isOrderDelivred && (
            <Toast
              style={{ width: "max-content" }}
              show={showToastDelivred}
              onClose={() => setShowToastDelivred(false)}
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
                Votre commande {orderNumber} a bien été livré !
              </Toast.Body>
            </Toast>
          )}
        </div>
      </div>
    </OrderContext.Provider>
  );
}
