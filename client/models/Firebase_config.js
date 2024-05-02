"use client"
import { initializeApp } from "firebase/app";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"



const firebaseConfig = {
    apiKey: "AIzaSyARaTreB2qBxdxEm58dr-sTQeE16H6laVI",
    authDomain: "blog-app-6dc84.firebaseapp.com",
    projectId: "blog-app-6dc84",
    storageBucket: "blog-app-6dc84.appspot.com",
    messagingSenderId: "403592557913",
    appId: "1:403592557913:web:30ab8120e645959c2e8848",
    measurementId: "G-FYPKWPVJ0W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FirebaseContext = createContext();
const Auth = getAuth(app);
const Provider = new GoogleAuthProvider()
const db = getFirestore(app)
const storage = getStorage(app)

export const useFirebase = () => {
    return useContext(FirebaseContext);
};

export const FirebaseProvider = (props) =>{
    return <FirebaseContext.Provider>{props.children}</FirebaseContext.Provider>
  }



export {Auth, Provider, db, storage};
