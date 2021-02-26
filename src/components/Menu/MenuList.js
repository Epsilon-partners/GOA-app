import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import Assiettes from './categories/Assiettes'
import Naan from './categories/Naan';
import Wrap from './categories/Wrap'
import Extra from './categories/Extra'
import Classique from './categories/Classique'
import firebase from '../../firebase';



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
            await db.collection("menu").get()
            .then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    setMenuList(prevState => [...prevState, doc.data()]);
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
                    <h2 className="menu-list-title">La carte</h2>
                </div>
                <ListGroup horizontal >
                    <ListGroup.Item className={assiettes ? "menu-list-item menu-list-item-active" : "menu-list-item"} id="assiettes" onClick={() => {
                        setNaan(false);
                        setClassique(false);
                        setExtra(false);
                        setWrap(false)
                        setAssiettes(true);
                    }} >Nos assiettes</ListGroup.Item>
                    <ListGroup.Item className={naan ? "menu-list-item menu-list-item-active" : "menu-list-item"} id="naan" onClick={
                        () => {
                            setNaan(true);
                            setClassique(false);
                            setExtra(false);
                            setWrap(false)
                            setAssiettes(false);
                        }
                    } >Naan</ListGroup.Item>
                    <ListGroup.Item className={wrap ? "menu-list-item menu-list-item-active" : "menu-list-item"} id="wrap" onClick={
                        () => {
                            setNaan(false);
                            setClassique(false);
                            setExtra(false);
                            setWrap(true)
                            setAssiettes(false);
                        }
                    }>Wrap</ListGroup.Item>
                    <ListGroup.Item className={classique ? "menu-list-item menu-list-item-active" : "menu-list-item"} id="classique" onClick={
                        () => {
                            setNaan(false);
                            setClassique(true);
                            setExtra(false);
                            setWrap(false)
                            setAssiettes(false);
                        }
                    }>Classiques</ListGroup.Item>
                    <ListGroup.Item className={extra ? "menu-list-item menu-list-item-active" : "menu-list-item"} id="extra" onClick={
                        () => {
                            setNaan(false);
                            setClassique(false);
                            setExtra(true);
                            setWrap(false)
                            setAssiettes(false);
                        }
                    }>Extras</ListGroup.Item>
                </ListGroup>
                {assiettes && !isLoading && < Assiettes menuList={menuList}></Assiettes>}
                {naan && <Naan menuList={menuList}></Naan>}
                {wrap && <Wrap menuList={menuList} ></Wrap>}
                {classique && <Classique menuList={menuList} ></Classique>}
                {extra && <Extra menuList={menuList}></Extra>}



            </div>
        </div>
    );
}

export default MenuList;