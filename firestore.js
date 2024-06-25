// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
// TODO: Add SDKs for Firebase products that you want to use
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot,updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
// TODO: Documentación
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUqpBSqMP2Qrp8WLNaYRw0QNgtLYVtd_0",
  authDomain: "jugadores-c708a.firebaseapp.com",
  projectId: "jugadores-c708a",
  storageBucket: "jugadores-c708a.appspot.com",
  messagingSenderId: "232660482556",
  appId: "1:232660482556:web:caaa1fe710f08788f3da79",
  measurementId: "G-ZZ115CJ1JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//getFirestore es la función que permite trae la base de datos para su utilización
const db = getFirestore(app);
//save es una función creada que invoca la función de firestore para gaurdar
export const save = (emp) => {
    //addDoc es la función de firestore que guardar un documento en una colección
    //collection es una función de firestore que permite acceder a una colección de la base de datos 
    addDoc(collection(db, 'jugadores'), emp)
}
//función para cargar todos los documentos de la colección
export const getAll = (data) => {
    //onSnapshot es una función de firestore que permite cargar los documentos en tiempo real
    onSnapshot(collection(db, 'jugadores'), data)
}

//función remove permite eliminar un documento según su id
export const remove = (id) => {
    //doc es la función de firestore que busca un documento según su id
    //deleteDoc es la función de firestore que permite eliminar el documento
    deleteDoc(doc(db, 'jugadores', id))
}

//selectOne es una función que permite seleccionar un documento
//getDoc es la función de firestore que permite retornar un documento seleccionado
export const selectOne = (id) => getDoc(doc(db, 'jugadores', id))
export const update = (id,emp) =>{
    //updateDoc es una función de firestore que permite editar un documento en una colección
    updateDoc(doc(db,'jugadores',id),emp)
}