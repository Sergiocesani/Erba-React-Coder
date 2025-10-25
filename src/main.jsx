import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBpgDs-HPcxpNUB1dibprMy6HPosX_1AZQ",
  authDomain: "erba-perfumes.firebaseapp.com",
  projectId: "erba-perfumes",
  storageBucket: "erba-perfumes.firebasestorage.app",
  messagingSenderId: "304028236257",
  appId: "1:304028236257:web:2bb6ed504ec08ba21ebaa0"
};

initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
