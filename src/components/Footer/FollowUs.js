import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTripadvisor } from '@fortawesome/free-brands-svg-icons';

const FollowUs = () => {
    return ( 
        <Card className="border-0 col-12">
            <Card.Body>
                <Card.Title className="card-title-footer">Suivez-nous</Card.Title>
                <Card.Text className="card-text-footer">
                    <FontAwesomeIcon icon={faFacebookF} size="1x" className="mx-2" />
                    <FontAwesomeIcon icon={faInstagram} size="1x" className="mr-2"  />
                    <FontAwesomeIcon icon={faTripadvisor} size="1x" />
                </Card.Text>
            </Card.Body>
        </Card>
     );
}

export default FollowUs;