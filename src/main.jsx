import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// --- TUS ARCHIVOS ---
import PublicWeb from './App.jsx'   // Front
import CRM from './crm.jsx'         // CRM
import Admin from './admin.jsx'     // Inventario
import Login from './login.jsx'     // NUEVO: Portal de Acceso

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* RUTA 1: Web Pública */}
        <Route path="/" element={<PublicWeb />} />

        {/* RUTA 2: Login / Portal */}
        {/* Entra aquí para elegir a dónde ir */}
        <Route path="/login" element={<Login />} />

        {/* RUTA 3: CRM (Protegida) */}
        <Route path="/crm" element={<CRM />} />

        {/* RUTA 4: Inventario (Protegida) */}
        <Route path="/admin" element={<Admin />} />

        {/* Cualquier otra cosa va a la web */}
        <Route path="*" element={<PublicWeb />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)