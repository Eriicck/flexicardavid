import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Lock, ChevronRight, ShieldCheck, 
  Briefcase, Users, LayoutDashboard, Car
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Estado para simular el rol seleccionado
  // 'comercial' | 'admin' | 'cliente'
  const [selectedRole, setSelectedRole] = useState('comercial'); 

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulamos una pequeña carga de red para que se sienta real
    setTimeout(() => {
      if (selectedRole === 'admin') {
        navigate('/admin');
      } else if (selectedRole === 'comercial') {
        navigate('/crm');
      } else {
        navigate('/'); // Cliente va a la web pública
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px]">
        
        {/* LADO IZQUIERDO: IMAGEN Y BRANDING */}
        <div className="hidden md:flex md:w-1/2 bg-slate-900 relative flex-col justify-between p-12 text-white">
           <div className="absolute inset-0 z-0 opacity-40">
              <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover grayscale"
                alt="Fondo Login"
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
              <h2 className="text-3xl font-bold leading-tight">Gestión integral de vehículos y clientes.</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Accede a las herramientas de administración, seguimiento comercial y gestión de inventario en tiempo real.
              </p>
              <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                 <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                 <div className="w-2 h-2 rounded-full bg-slate-600"></div>
              </div>
           </div>
        </div>

        {/* LADO DERECHO: FORMULARIO */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
           <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Bienvenido de nuevo</h3>
              <p className="text-slate-500 text-sm">Ingresa tus credenciales para acceder al sistema.</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-5">
              
              {/* INPUTS SIMULADOS (Visuales) */}
              <div className="space-y-4">
                  <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18}/>
                      <input 
                        type="email" 
                        placeholder="Correo Corporativo" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-10 pr-4 text-sm font-medium outline-none focus:border-orange-500 focus:bg-white transition-all"
                        defaultValue="david@flexicar.es" // Valor por defecto visual
                      />
                  </div>
                  <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18}/>
                      <input 
                        type="password" 
                        placeholder="Contraseña" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-10 pr-4 text-sm font-medium outline-none focus:border-orange-500 focus:bg-white transition-all"
                        defaultValue="********"
                      />
                  </div>
              </div>

              {/* SELECCION DE ROL (La magia del Demo) */}
              <div className="pt-2">
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Selecciona tu Perfil (Demo)</label>
                 <div className="grid grid-cols-1 gap-3">
                    
                    {/* Opción 1: Comercial (CRM) */}
                    <div 
                        onClick={() => setSelectedRole('comercial')}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedRole === 'comercial' ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500' : 'border-slate-100 hover:border-slate-300'}`}
                    >
                        <div className={`p-2 rounded-lg ${selectedRole === 'comercial' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                           <Briefcase size={18}/>
                        </div>
                        <div className="flex-1">
                           <p className={`text-sm font-bold ${selectedRole === 'comercial' ? 'text-orange-900' : 'text-slate-700'}`}>Equipo Comercial</p>
                           <p className="text-[10px] text-slate-500">Acceso a CRM y Leads</p>
                        </div>
                        {selectedRole === 'comercial' && <CheckCircle size={16} className="text-orange-500"/>}
                    </div>

                    {/* Opción 2: Desarrollador/Admin (Inventario) */}
                    <div 
                        onClick={() => setSelectedRole('admin')}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedRole === 'admin' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-100 hover:border-slate-300'}`}
                    >
                        <div className={`p-2 rounded-lg ${selectedRole === 'admin' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                           <ShieldCheck size={18}/>
                        </div>
                        <div className="flex-1">
                           <p className={`text-sm font-bold ${selectedRole === 'admin' ? 'text-blue-900' : 'text-slate-700'}`}>Administrador / Dev</p>
                           <p className="text-[10px] text-slate-500">Gestión de Inventario</p>
                        </div>
                        {selectedRole === 'admin' && <CheckCircle size={16} className="text-blue-600"/>}
                    </div>

                    {/* Opción 3: Usuario (Web) */}
                    <div 
                        onClick={() => setSelectedRole('cliente')}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedRole === 'cliente' ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-slate-100 hover:border-slate-300'}`}
                    >
                         <div className={`p-2 rounded-lg ${selectedRole === 'cliente' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                           <Users size={18}/>
                        </div>
                        <div className="flex-1">
                           <p className={`text-sm font-bold ${selectedRole === 'cliente' ? 'text-green-900' : 'text-slate-700'}`}>Cliente / Usuario</p>
                           <p className="text-[10px] text-slate-500">Web Pública</p>
                        </div>
                        {selectedRole === 'cliente' && <CheckCircle size={16} className="text-green-600"/>}
                    </div>

                 </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Accediendo...' : (
                    <>
                       Ingresar al Sistema <ChevronRight size={16}/>
                    </>
                )}
              </button>

           </form>
           
           <div className="mt-8 text-center">
              <p className="text-xs text-slate-400">© 2025 Flexicar System v1.0.2</p>
           </div>
        </div>
      </div>
    </div>
  );
}