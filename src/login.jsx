import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Lock, ChevronRight, ShieldCheck, 
  Briefcase, Users, Car, CheckCircle
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate(); // Esto funciona solo si Login está dentro de BrowserRouter en main.jsx
  const [loading, setLoading] = useState(false);
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
        navigate('/'); 
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px]">
        
        {/* LADO IZQUIERDO */}
        <div className="hidden md:flex md:w-1/2 bg-slate-900 relative flex-col justify-between p-12 text-white">
           <div className="absolute inset-0 z-0 opacity-40">
              <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover grayscale"
                alt="Fondo"
              />
           </div>
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10"></div>
           
           <div className="relative z-20">
              <div className="flex items-center gap-2 mb-2">
                 <div className="bg-orange-500 p-2 rounded-lg"><Car size={20} className="text-white"/></div>
                 <span className="font-black text-xl italic tracking-tighter">FLEXI<span className="text-orange-500">CAR</span></span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Portal Corporativo</p>
           </div>

           <div className="relative z-20 space-y-6">
              <h2 className="text-3xl font-bold leading-tight">Gestión integral.</h2>
              <p className="text-slate-400 text-sm leading-relaxed">Accede a las herramientas de administración y ventas.</p>
           </div>
        </div>

        {/* LADO DERECHO: FORMULARIO */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
           <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Bienvenido</h3>
              <p className="text-slate-500 text-sm">Ingresa tus credenciales.</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-4">
                  <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                      <input type="email" placeholder="Correo" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-10 pr-4 text-sm font-medium outline-none focus:border-orange-500"/>
                  </div>
                  <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                      <input type="password" placeholder="Contraseña" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-10 pr-4 text-sm font-medium outline-none focus:border-orange-500"/>
                  </div>
              </div>

              <div className="pt-2">
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-3">Selecciona Perfil (Demo)</label>
                 <div className="grid grid-cols-1 gap-2">
                    <div onClick={() => setSelectedRole('comercial')} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer ${selectedRole === 'comercial' ? 'border-orange-500 bg-orange-50' : 'border-slate-100'}`}>
                        <Briefcase size={18} className={selectedRole === 'comercial' ? 'text-orange-600' : 'text-slate-400'}/>
                        <span className="text-sm font-bold flex-1">Comercial (CRM)</span>
                        {selectedRole === 'comercial' && <CheckCircle size={16} className="text-orange-500"/>}
                    </div>
                    <div onClick={() => setSelectedRole('admin')} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer ${selectedRole === 'admin' ? 'border-blue-500 bg-blue-50' : 'border-slate-100'}`}>
                        <ShieldCheck size={18} className={selectedRole === 'admin' ? 'text-blue-600' : 'text-slate-400'}/>
                        <span className="text-sm font-bold flex-1">Admin (Inventario)</span>
                        {selectedRole === 'admin' && <CheckCircle size={16} className="text-blue-600"/>}
                    </div>
                 </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm uppercase hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
                {loading ? 'Accediendo...' : <>Ingresar <ChevronRight size={16}/></>}
              </button>
           </form>
        </div>
      </div>
    </div>
  );
}