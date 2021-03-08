import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Assiettes from "./categories/Assiettes";
import Naan from "./categories/Naan";
import Wrap from "./categories/Wrap";
import Extra from "./categories/Extra";
import Classique from "./categories/Classique";
import firebase from "../../firebase";
import { Link as ScrollLink } from 'react-scroll';

const MenuList = () => {
  const [assiettes, setAssiettes] = useState(true);
  const [naan, setNaan] = useState(false);
  const [wrap, setWrap] = useState(false);
  const [extra, setExtra] = useState(false);
  const [classique, setClassique] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMenuList = async () => {
      const db = firebase.firestore();
      await db
        .collection("menu")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            setMenuList((prevState) => [...prevState, doc.data()]);
          });
          setIsLoading(false);
        });
    };
    getMenuList();
  }, []);

  return (
    <div className="menu-list" id="menu-list">
      <div className="menu-list-content">
        <div className="menu-list-header">
          <h2 className="menu-list-title">LA CARTE</h2>
        </div>
        <ListGroup horizontal className="d-flex justify-content-center">
          <ListGroup.Item
            className={
              assiettes
                ? "menu-list-item menu-list-item-active menu-list-aligned"
                : "menu-list-item menu-list-aligned"
            }
            id="assiettes"
          >
            <ScrollLink
              className="menu-links"
              onClick={() => {
                setAssiettes(false);
                setNaan(false);
                setClassique(false);
                setExtra(false);
                setWrap(false);
                setAssiettes(true);
              }}
              to='menu-list'
              smooth={true}
              spy={true}
              activeClass="active"
              offset={-122}
            >
              Nos assiettes
            </ScrollLink>
          </ListGroup.Item>
          <ListGroup.Item
            className={
              naan
                ? "menu-list-item menu-list-item-active menu-list-aligned"
                : "menu-list-item menu-list-aligned"
            }
            id="naan"
          >
            <ScrollLink 
            className="menu-links"
            onClick={() => {
                setNaan(false);
                setClassique(false);
                setExtra(false);
                setWrap(false);
                setAssiettes(false);
                setNaan(true);
              }}
              to='menu-list'
              smooth={true}
              spy={true}
              activeClass="active"
              offset={-122}>
                Naan
            </ScrollLink>
          </ListGroup.Item>
          <ListGroup.Item
            className={
              wrap
                ? "menu-list-item menu-list-item-active menu-list-aligned"
                : "menu-list-item menu-list-aligned"
            }
            id="wrap"
          >
            <ScrollLink 
            className="menu-links"
            onClick={() => {
                setWrap(false);
                setNaan(false);
                setClassique(false);
                setExtra(false);
                setAssiettes(false);
                setWrap(true);
              }}
              to='menu-list'
              smooth={true}
              spy={true}
              activeClass="active"
              offset={-122}>
                Wrap
            </ScrollLink>
          </ListGroup.Item>
          <ListGroup.Item
            className={
              classique
                ? "menu-list-item menu-list-item-active menu-list-aligned"
                : "menu-list-item menu-list-aligned"
            }
            id="classique"
          >
            <ScrollLink 
            className="menu-links"
            onClick={() => {
                setClassique(false);
                setNaan(false);
                setExtra(false);
                setWrap(false);
                setAssiettes(false);
                setClassique(true);
              }}
              to='menu-list'
              smooth={true}
              spy={true}
              activeClass="active"
              offset={-122}>
                Classiques
            </ScrollLink>
          </ListGroup.Item>
          <ListGroup.Item
            className={
              extra
                ? "menu-list-item menu-list-item-active menu-list-aligned"
                : "menu-list-item menu-list-aligned"
            }
            id="extra"
          >
            <ScrollLink 
            className="menu-links"
            onClick={() => {
                setExtra(false);
                setNaan(false);
                setClassique(false);
                setWrap(false);
                setAssiettes(false);
                setExtra(true);
              }}
              to='menu-list'
              smooth={true}
              spy={true}
              activeClass="active"
              offset={-122}>
                  Extras
            </ScrollLink>
          </ListGroup.Item>
        </ListGroup>
        {assiettes && !isLoading && <Assiettes menuList={menuList}></Assiettes>}
        {naan && <Naan menuList={menuList}></Naan>}
        {wrap && <Wrap menuList={menuList}></Wrap>}
        {classique && <Classique menuList={menuList}></Classique>}
        {extra && <Extra menuList={menuList}></Extra>}
      </div>
    </div>
  );
};

export default MenuList;
