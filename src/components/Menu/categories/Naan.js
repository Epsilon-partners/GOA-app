import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import {
  ListGroup,
  Card,
  ListGroupItem,
  Button,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import MenuItem from "../MenuItem";

const Naan = ({ menuList }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const getNaans = () => {
      menuList.map((element) => {
        if (element.type === "naan" && element.imageUrl === "wrap.svg") {
          setMenuItems((prevState) => [...prevState, element]);
        } else if (element.type === "naan" && element.imageUrl !== "wrap.svg") {
          setMenuItems((prevState) => [element, ...prevState]);
        }
        return 0;
      });
    };
    getNaans();
  }, [menuList]);

  return (
    <div
      className="naan menu-items border border-dark"
      id="naanSection"
      style={{ paddingBottom: "122px" }}
    >
      <Container>
        <h3 className="menuDescription my-4">
          Vous avez la possibilitée de choisir votre Naan avec ou sans fromage
        </h3>
        <Row className="justify-content-around">
          {menuItems.map((item) => (
            <Col key={uniqid()} md={3} className="mb-2">
              <Card className="text-center h-100">
                <Card.Img variant="top" src={`/images/${item.imageUrl}`} />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title>
                    <h5>
                      {item.name}
                      <OverlayTrigger
                        key={"bottom"}
                        placement={"bottom"}
                        overlay={
                          <Tooltip id={`tooltip-bottom`}>
                            {item.description}
                          </Tooltip>
                        }
                      >
                        <Button variant="secondary" className="infoBtn">
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="infoIcon"
                          />
                        </Button>
                      </OverlayTrigger>
                    </h5>
                  </Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>{item.price.toFixed(2)} €</ListGroupItem>
                  </ListGroup>
                  <MenuItem item={item} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Naan;
