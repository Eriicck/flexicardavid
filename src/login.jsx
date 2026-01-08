import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Lock, ChevronRight, ShieldCheck, 
  Briefcase, Car, CheckCircle
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate(); // Esto funciona solo si Login está dentro de BrowserRouter en main.jsx
  const [loading, setLoading] = useState(false);
  
  // Estado para simular el rol seleccionado
  // 'comercial' | 'admin'
  const [selectedRole, setSelectedRole] = useState('comercial'); 

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (selectedRole === 'admin') {
        navigate('/admin');
      } else if (selectedRole === 'comercial') {
        navigate('/crm');
      } else {
        // Por seguridad, si no hay rol válido, recarga o manda al login
        navigate('/login'); 
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 font-sans text-slate-800">
      
      {/* FONDO DE PANTALLA (Visible en Móvil y Escritorio) */}
      <div className="absolute inset-0 z-0">
         <img 
           src="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=1920" 
           className="w-full h-full object-cover"
           alt="Fondo Automotriz"
         />
         {/* Capa de desenfoque y oscurecimiento elegante */}
         <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
      </div>

      {/* TARJETA PRINCIPAL (Con efecto cristal/semitransparente) */}
      <div className="relative z-10 w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row shadow-black/50 border border-white/20">
        
        {/* LADO IZQUIERDO (Imagen y Branding - Oculto en móvil muy pequeño, visible en tablet/pc) */}
        <div className="hidden md:flex md:w-5/12 bg-slate-900/95 relative flex-col justify-between p-8 text-white">
           <div className="absolute inset-0 z-0 opacity-50">
              <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover grayscale"
                alt="Fondo Panel"
              />
           </div>
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
           
           <div className="relative z-20">
              <div className="flex items-center gap-2 mb-2">
                 <div className="bg-orange-500 p-1.5 rounded-lg"><Car size={18} className="text-white"/></div>
                 <span className="font-black text-lg italic tracking-tighter">FLEXI<span className="text-orange-500">CAR</span></span>
              </div>
              <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">Portal Corporativo</p>
           </div>

           <div className="relative z-20 space-y-4">
              <h2 className="text-2xl font-bold leading-tight">Gestión Integral</h2>
              <p className="text-slate-300 text-xs leading-relaxed opacity-90">Acceso unificado a herramientas de administración y ventas.</p>
           </div>
        </div>

        {/* LADO DERECHO (Formulario) */}
        <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center bg-transparent">
           <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Bienvenido</h3>
              <p className="text-slate-500 text-sm">Ingresa tus credenciales para continuar.</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-3">
                  <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={16}/>
                      <input 
                        type="email" 
                        placeholder="Correo Corporativo" 
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-sm font-medium outline-none focus:border-orange-500 focus:bg-white transition-all"
                        defaultValue="david@flexicar.es"
                      />
                  </div>
                  <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={16}/>
                      <input 
                        type="password" 
                        placeholder="Contraseña" 
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-sm font-medium outline-none focus:border-orange-500 focus:bg-white transition-all"
                        defaultValue="********"
                      />
                  </div>
              </div>

              <div className="pt-2">
                 <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Selecciona Perfil (Demo)</label>
                 <div className="grid grid-cols-1 gap-2">
                    
                    <div onClick={() => setSelectedRole('comercial')} className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${selectedRole === 'comercial' ? 'border-orange-500 bg-orange-50/80 ring-1 ring-orange-500' : 'border-slate-200/60 bg-white/40 hover:border-slate-300'}`}>
                        <div className={`p-1.5 rounded-md ${selectedRole === 'comercial' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-500'}`}><Briefcase size={16}/></div>
                        <div className="flex-1"><p className={`text-xs font-bold ${selectedRole === 'comercial' ? 'text-orange-900' : 'text-slate-700'}`}>Comercial</p></div>
                        {selectedRole === 'comercial' && <CheckCircle size={14} className="text-orange-500"/>}
                    </div>

                    <div onClick={() => setSelectedRole('admin')} className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${selectedRole === 'admin' ? 'border-blue-500 bg-blue-50/80 ring-1 ring-blue-500' : 'border-slate-200/60 bg-white/40 hover:border-slate-300'}`}>
                        <div className={`p-1.5 rounded-md ${selectedRole === 'admin' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}><ShieldCheck size={16}/></div>
                        <div className="flex-1"><p className={`text-xs font-bold ${selectedRole === 'admin' ? 'text-blue-900' : 'text-slate-700'}`}>Administrador</p></div>
                        {selectedRole === 'admin' && <CheckCircle size={14} className="text-blue-600"/>}
                    </div>

                 </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2">
                {loading ? 'Accediendo...' : <>Ingresar <ChevronRight size={14}/></>}
              </button>
           </form>
           
           <div className="mt-6 text-center"><p className="text-[10px] text-slate-400">© 2025 Flexicar System v1.0.3</p></div>
        </div>
      </div>
    </div>
  );
}