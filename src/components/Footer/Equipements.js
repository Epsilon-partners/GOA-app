import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi, faTv, faWind } from "@fortawesome/free-solid-svg-icons";

const Equipements = () => {
  return ( 
    <Card className="border-0 col-md-6 col-12">
      <Card.Body>
        <Card.Title className="card-title-footer">Equipements</Card.Title>
        <Card.Text className="card-text-footer">
          <FontAwesomeIcon icon={faWifi} color="black" className="mr-2" /> Wifi{" "}
          <br />
          <FontAwesomeIcon icon={faTv} color="black" className="mr-2" />{" "}
          Télévision <br />
          <FontAwesomeIcon icon={faWind} color="black" className="mr-2" /> Air
          conditionné
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Equipements;
