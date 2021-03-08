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
import MenuItem from '../MenuItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Classique = ({ menuList }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const getClassiques = () => {
        menuList.map((element) => {
            if (element.type === "classique") {
                setMenuItems(prevState => [...prevState, element]);
            }
            return 0;
        });
    };
    getClassiques();
  }, [menuList]);

  return (
    <div
      className="classique menu-items border border-dark"
      id="classiqueSection"
      style={{ paddingBottom: "122px" }}
    >
      <Container>
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

export default Classique;
