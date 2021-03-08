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
  Spinner
} from "react-bootstrap";
import MenuItem from '../MenuItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Assiettes = ({ menuList }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const getItems = () => {
      menuList.map((element) => {
        if (element.type === "assiettes" && element.imageUrl === "plat.png") {
          setMenuItems((prevState) => [...prevState, element]);
        } else if (element.type === "assiettes" && element.imageUrl !== "plat.png") {
          setMenuItems((prevState) => [element, ...prevState]);
        }
        return 0;
      });
    };
    getItems();
  }, [menuList]);

  return (
    <div
      className="assiettes menu-items border border-dark"
      id="assiettesSection"
      style={{ paddingBottom: "122px" }}
    >
      <Container>
        <h3 className="menuDescription my-4">
          Toutes nos assiettes sont accompagnées <br /> d'une galette de Naan ou
          Cheese Naan
        </h3>
        <Row className="justify-content-around">
          {menuItems.length ? (
            menuItems.map((item) => (
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
                    {/* <Link to={`/menu/${slugify(item.name)}`}> */}
                    <MenuItem item={item} />
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="d-flex justify-content-center">
              <Spinner animation="grow" variant="dark" />
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Assiettes;
