import React, { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap'
import firebase from '../../firebase';

const DeleteOrder = ({ order }) => {
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

    const deleteOrder = order => {
        const orderRef = firebase.database().ref("orders").child(order.id);
        orderRef.update({
            deleted: true
        })
        .then(() => {
            setFailed(false);
            setSuccess(true);
            setTimeout(() => setShowModal(false), 1000);
        })
        .catch(err => {
            console.error('Error updating order to delete', err);
            setSuccess(false);
            setFailed(true);
        });
    };

    return ( 
        <>
            <Button variant="danger" className="w-100" type="button" onClick={() => setShowModal(true)}>
                Annuler la commande
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} id="refuse-order-modal">
                <Modal.Body>
                    <p className="text-black text-center">Êtes-vous sûr de vouloir annuler la commande ?</p>
                    <div className="d-flex justify-content-around">
                        <Button variant="danger" onClick={() => deleteOrder(order)}>Annuler la commande</Button>
                        <Button variant="outline-success" onClick={() => setShowModal(false)}>Revenir en arrière</Button>
                    </div>
                    {success &&
                        <Alert variant="success">La commande a bien été supprimé</Alert>
                    }
                    {failed &&
                        <Alert variant="danger">Un problème est survenu ! Veuillez réessayer.</Alert>
                    }
                </Modal.Body>
            </Modal>            

        </>
     );
}
 
export default DeleteOrder;