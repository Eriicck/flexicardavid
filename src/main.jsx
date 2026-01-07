import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// --- TUS ARCHIVOS (Nombres corregidos según lo que subiste) ---
import PublicWeb from './App.jsx'   // Tu Front
import CRM from './crm.jsx'         // Tu CRM
import Admin from './admin.jsx'     // Tu Inventario (se llama admin.jsx, no InventoryManager)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Web Pública */}
        <Route path="/" element={<PublicWeb />} />

        {/* CRM */}
        <Route path="/crm" element={<CRM />} />

        {/* Inventario / Admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Redirección por defecto */}
        <Route path="*" element={<PublicWeb />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)