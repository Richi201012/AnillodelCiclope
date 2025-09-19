// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzCpoEGLgGUksJkwG2SvQs8RL1NRFzv9A",
  authDomain: "anillo-del-ciclope.firebaseapp.com",
  projectId: "anillo-del-ciclope",
  storageBucket: "anillo-del-ciclope.appspot.com",
  messagingSenderId: "101135610836",
  appId: "1:101135610836:web:b45eb1f8b5c1716209ecb",
};

// Solo mostrar logs importantes en desarrollo
if (import.meta.env.DEV) {
  console.log("🔥 Firebase conectado al proyecto:", firebaseConfig.projectId);
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Configuración para reducir logs innecesarios
if (import.meta.env.DEV) {
  // Desactivar algunos warnings de Firestore en desarrollo
  console.log("🔧 Modo desarrollo - Firestore configurado");
}