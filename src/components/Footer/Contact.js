import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faClock } from '@fortawesome/free-regular-svg-icons'

const Contact = () => {
    return ( 
        <Card className="border-0 col-6">
            <Card.Body>
                <Card.Title>Contact</Card.Title>
                <Card.Text>
                    <FontAwesomeIcon icon={faLocationArrow} className="mr-2" /> 14 rue Brocherie, 38000 Grenoble <br />
                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" /> <a href="tel:+33980842949">09 80 84 29 49</a> <br />
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> <a href="mailto:contact@goa-indian-fastfood.com">contact@goa-indian-fastfood.com</a> <br />
                    <FontAwesomeIcon icon={faClock} className="mr-2" /> 11H30 - 15H00 <br />
                    18H00-1H00
                </Card.Text>
            </Card.Body>
        </Card>
     );
}
 
export default Contact;