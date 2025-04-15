// Importa lo necesario desde Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (copiada de tu consola)
const firebaseConfig = {
  apiKey: "AIzaSyCZg13C6qqHq1W_0At57oAbyLzFCBbSFaY",
  authDomain: "ecomercediplomado.firebaseapp.com",
  projectId: "ecomercediplomado",
  storageBucket: "ecomercediplomado.firebasestorage.app",
  messagingSenderId: "627712934728",
  appId: "1:627712934728:web:0c8cad48c16075bb47697d",
  measurementId: "G-CYW7929W4E"
};

// Inicializa la app
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa Authentication y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);


