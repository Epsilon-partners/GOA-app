import firebase from '../firebase';
//get ALL data
const db = firebase.firestore();

let menuList = []
db.collection("menu").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        menuList.push(doc.data())
    })
})

export { menuList };
