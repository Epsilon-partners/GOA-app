import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faTv, faWind } from '@fortawesome/free-solid-svg-icons';

const Equipements = () => {
    return ( 
        <Card className="border-0 col-6">
            <Card.Body>
                <Card.Title>Equipements</Card.Title>
                <Card.Text>
                    <FontAwesomeIcon icon={faWifi} className="mr-2" /> Wifi <br />
                    <FontAwesomeIcon icon={faTv} className="mr-2" /> Télévision <br />
                    <FontAwesomeIcon icon={faWind} className="mr-2" /> Air conditionné
                </Card.Text>
            </Card.Body>
        </Card>
     );
}
 
export default Equipements;