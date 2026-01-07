import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// 1. Importamos tus 3 grandes componentes con la extensión .jsx para asegurar la ruta
import PublicWeb from './App.jsx'            // La web pública (Front)
import CRM from './crm.jsx'                  // El CRM de Leads
import Inventory from './InventoryManager.jsx' // El Gestor de Autos (Admin)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* RUTA 1: Lo que ve el cliente (Tu web pública) */}
        {/* Se accede entrando a: https://comercialdavid.netlify.app/ */}
        <Route path="/" element={<PublicWeb />} />

        {/* RUTA 2: El CRM (Privado para David) */}
        {/* Se accede entrando a: https://comercialdavid.netlify.app/crm */}
        <Route path="/crm" element={<CRM />} />

        {/* RUTA 3: El Gestor de Inventario (Privado para ti/David) */}
        {/* Se accede entrando a: https://comercialdavid.netlify.app/admin */}
        <Route path="/admin" element={<Inventory />} />

        {/* RUTA COMODÍN: Si escriben cualquier otra cosa, los mandamos a la home */}
        <Route path="*" element={<PublicWeb />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)