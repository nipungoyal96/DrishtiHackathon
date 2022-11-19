import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyAkmLJ69naCbGpxKtt9iUMC1yWH_ifI_o0",
    authDomain: "drishtifrontend.firebaseapp.com",
    projectId: "drishtifrontend",
    storageBucket: "drishtifrontend.appspot.com",
    messagingSenderId: "110263619883",
    appId: "1:110263619883:web:b60d3bc9ddcc7ecc15f56e",
    measurementId: "G-ZKY24P888F"
  };
  
const app = initializeApp(config);

export default getFirestore(app);
