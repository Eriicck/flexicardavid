import React, { useState, useMemo, useEffect } from 'react';
import { 
  Menu, X, Users, Car, CheckCircle, Clock, 
  Trash2, TrendingUp, ChevronLeft, ChevronRight, 
  Mail, Phone, Calendar as CalendarIcon, Printer, Search, 
  Plus, Filter, LayoutDashboard, 
  RotateCcw, Ban, BarChart3, PieChart, 
  Euro, Calculator, Percent, AlertCircle, Award, 
  ChevronDown, ChevronUp, CalendarDays, Target, ShieldCheck, Briefcase, Save, Lock, Edit3
} from 'lucide-react';

// --- CONFIGURACIÓN DE ESTILOS ---

const STATUS_STYLES = {
  'Nuevo Lead':      'bg-blue-50 text-blue-700 border-blue-100',
  'Contactado':      'bg-orange-50 text-orange-700 border-orange-100',
  'Cita Agendada':   'bg-purple-50 text-purple-700 border-purple-100',
  'Vendido':         'bg-green-50 text-green-700 border-green-100',
  'Financiación':    'bg-slate-100 text-slate-700 border-slate-200',
  'Descartado':      'bg-gray-100 text-gray-500 border-gray-200',
};

const STATUS_OPTIONS = Object.keys(STATUS_STYLES);

// --- CONFIGURACIÓN DE PRECIOS Y GARANTÍAS (FIXED) ---
const WARRANTY_PRICES = {
  'Legal (1 Año)': 0,
  'Premium 1 Año': 850,
  'Premium 2 Años': 1250,
  'Premium 3 Años': 1600
};

const SALE_TYPES = ['Financiado', 'Contado', 'Flexible'];

// Generamos fechas dinámicas para el demo
const today = new Date();
const currentMonthStr = today.toISOString().slice(0, 7); // "YYYY-MM"

// Datos iniciales (AMPLIADOS PARA DEMO)
const initialLeads = [
  { id: 1, name: "Ana Torres", vehicle: "BMW Serie 4", price: 32900, warranty: "Premium 3 Años", saleType: "Financiado", status: "Vendido", phone: "+34 600 123 456", email: "ana@email.com", date: `${currentMonthStr}-10`, notes: "Venta cerrada con garantía máxima.", appointment: null, isDeleted: false },
  { id: 2, name: "Carlos Ruiz", vehicle: "Mercedes Clase A", price: 26500, warranty: "Legal (1 Año)", saleType: "Contado", status: "Vendido", phone: "+34 600 999 888", email: "carlos@email.com", date: `${currentMonthStr}-12`, notes: "No quiso garantía extra.", appointment: null, isDeleted: false },
  { id: 3, name: "Lucía Méndez", vehicle: "Toyota RAV4", price: 29900, warranty: "Premium 2 Años", saleType: "Financiado", status: "Vendido", phone: "+34 600 555 444", email: "lucia@email.com", date: `${currentMonthStr}-05`, notes: "Garantía media.", appointment: null, isDeleted: false },
  { id: 4, name: "Jorge Soler", vehicle: "Audi Q5", price: 34900, warranty: "Premium 1 Año", saleType: "Flexible", status: "Vendido", phone: "+34 600 111 222", email: "jorge@email.com", date: `${currentMonthStr}-15`, notes: "Garantía básica de pago.", appointment: null, isDeleted: false },
  { id: 5, name: "Marta Lopez", vehicle: "Mini Cooper", price: 18000, warranty: "Legal (1 Año)", saleType: "Contado", status: "Nuevo Lead", phone: "+34 600 333 222", email: "marta@email.com", date: `${currentMonthStr}-18`, notes: "Primer contacto.", appointment: null, isDeleted: false },
  { id: 6, name: "Pedro Pascal", vehicle: "Ford Mustang", price: 45000, warranty: "Premium 3 Años", saleType: "Contado", status: "Vendido", phone: "+34 666 777 888", email: "pedro@email.com", date: `${currentMonthStr}-20`, notes: "Cliente VIP.", appointment: null, isDeleted: false },
  // NUEVOS CLIENTES PARA DEMO
  { id: 7, name: "Sofia Martínez", vehicle: "Volkswagen Golf", price: 22000, warranty: "Legal (1 Año)", saleType: "Financiado", status: "Contactado", phone: "+34 611 222 333", email: "sofia@email.com", date: `${currentMonthStr}-22`, notes: "Le interesa financiar al 100%. Pendiente nóminas.", appointment: null, isDeleted: false },
  { id: 8, name: "Miguel Ángel", vehicle: "Audi A3 S-Line", price: 28500, warranty: "Premium 2 Años", saleType: "Contado", status: "Cita Agendada", phone: "+34 699 888 777", email: "miguel@email.com", date: `${currentMonthStr}-24`, notes: "Viene a verlo con su esposa.", appointment: `${currentMonthStr}-28 17:00`, isDeleted: false },
  { id: 9, name: "Laura Gómez", vehicle: "Peugeot 3008", price: 19500, warranty: "Legal (1 Año)", saleType: "Financiado", status: "Nuevo Lead", phone: "+34 655 444 333", email: "laura@email.com", date: `${currentMonthStr}-25`, notes: "Entró por web. Llamar por la tarde.", appointment: null, isDeleted: false },
];

// --- COMPONENTES AUXILIARES ---

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${STATUS_STYLES[status] || 'bg-gray-100 text-gray-500'}`}>
    {status}
  </span>
);

// --- COMPONENTE PRINCIPAL ---

export default function AdminDashboard() {
  const [leads, setLeads] = useState(initialLeads);
  const [currentView, setCurrentView] = useState('dashboard'); 
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: null, data: null });

  // --- LÓGICA DE FILTRADO ---
  const activeLeads = useMemo(() => {
    const showDeleted = currentView === 'trash';
    return leads.filter(l => l.isDeleted === showDeleted);
  }, [leads, currentView]);

  const filteredLeads = useMemo(() => {
    let data = activeLeads;
    if (currentView === 'agenda') {
        data = data.filter(l => l.status === 'Cita Agendada');
    } else {
        if (filterStatus !== 'Todos') {
            data = data.filter(l => l.status === filterStatus);
        }
    }
    if (searchTerm) {
        data = data.filter(lead => 
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            lead.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    return data;
  }, [activeLeads, filterStatus, searchTerm, currentView]);

  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLeads.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLeads, currentPage]);

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  // --- ACCIONES ---

  const handleUpdateLead = (updatedLead) => {
    setLeads(leads.map(l => l.id === updatedLead.id ? updatedLead : l));
    closeModal(); 
  };

  const moveToTrash = (id) => {
    if (window.confirm('¿Mover a papelera?')) {
      setLeads(leads.map(l => l.id === id ? { ...l, isDeleted: true } : l));
      closeModal();
    }
  };

  const restoreFromTrash = (id) => {
    setLeads(leads.map(l => l.id === id ? { ...l, isDeleted: false } : l));
  };

  const permanentDelete = (id) => {
    if (window.confirm('¡Cuidado! Esto borrará los datos para siempre. ¿Confirmar?')) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  const handleAddNew = (newLeadData) => {
    const newId = Math.max(...leads.map(l => l.id), 0) + 1;
    setLeads([{ 
        id: newId, 
        ...newLeadData, 
        date: new Date().toISOString().split('T')[0], 
        notes: newLeadData.notes || '', 
        isDeleted: false,
        // Si viene con cita, lo marcamos como 'Cita Agendada' automáticamente
        status: newLeadData.appointment ? 'Cita Agendada' : 'Nuevo Lead',
    }, ...leads]);
    closeModal();
  };

  const openModal = (type, data = null) => setModal({ isOpen: true, type, data });
  const closeModal = () => setModal({ isOpen: false, type: null, data: null });
  
  const handlePrint = () => {
    setTimeout(() => window.print(), 200);
  };

  // --- RENDERIZADO DE VISTAS ---

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView leads={leads} onViewChange={setCurrentView} setFilter={setFilterStatus} />;
      case 'reports':
        return <ReportsView leads={leads} onOpenDetail={(lead) => openModal('detail', lead)}/>;
      case 'trash':
        return <TrashView leads={activeLeads} onRestore={restoreFromTrash} onDelete={permanentDelete} />;
      default: // leads, agenda
        return (
          <div className="space-y-4">
             {/* Toolbar */}
             <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 print:hidden">
                <div className="relative w-full sm:w-80">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                   <input 
                     type="text" placeholder="Buscar por nombre o vehículo..." 
                     className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-orange-500 transition-all shadow-sm"
                     value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
                
                {currentView !== 'agenda' && (
                    <div className="flex gap-3 w-full sm:w-auto">
                        <select 
                            value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                            className="bg-white border border-slate-200 text-sm font-medium rounded-lg px-4 py-2.5 outline-none cursor-pointer hover:border-slate-300 transition-colors shadow-sm"
                        >
                            <option value="Todos">Todos los estados</option>
                            {STATUS_OPTIONS.map(st => <option key={st} value={st}>{st}</option>)}
                        </select>
                    </div>
                )}
             </div>

             {/* Tabla Clean */}
             <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden print:border-black print:shadow-none">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-slate-50 border-b border-slate-100 text-[11px] uppercase text-slate-500 font-bold tracking-wider">
                      <tr>
                         <th className="px-6 py-4">Cliente</th>
                         <th className="px-6 py-4">Vehículo</th>
                         <th className="px-6 py-4">Económico</th>
                         <th className="px-6 py-4">Estado</th>
                         <th className="px-6 py-4 hidden sm:table-cell">Fecha</th>
                         <th className="px-6 py-4 text-right print:hidden"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50 print:divide-black">
                      {paginatedLeads.map(lead => {
                         const warrantyCost = WARRANTY_PRICES[lead.warranty] || 0;
                         
                         return (
                            <tr 
                                key={lead.id} 
                                onClick={() => openModal('detail', lead)} 
                                className="hover:bg-slate-50 transition-colors group print:break-inside-avoid cursor-pointer"
                            >
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-900 text-sm group-hover:text-orange-600">{lead.name}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{lead.phone}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-700 text-sm">{lead.vehicle}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-900">{parseInt(lead.price).toLocaleString()}€</span>
                                        {warrantyCost > 0 ? (
                                            <span className="text-[10px] text-green-600 font-medium">+ Garantía {warrantyCost}€</span>
                                        ) : (
                                            <span className="text-[10px] text-slate-400">Sin garantía</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                  <StatusBadge status={lead.status} />
                                  {lead.appointment && <div className="mt-1.5 text-[10px] text-purple-600 font-medium flex gap-1 items-center"><Clock size={10}/> {lead.appointment.split(' ')[0]}</div>}
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-400 hidden sm:table-cell font-medium">{lead.date}</td>
                                <td className="px-6 py-4 text-right print:hidden">
                                    <ChevronRight size={16} className="text-slate-300 group-hover:text-orange-500 transition-colors"/>
                                </td>
                            </tr>
                         );
                      })}
                   </tbody>
                </table>
                {paginatedLeads.length === 0 && (
                    <div className="p-16 text-center text-slate-400 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                            <Search size={20} className="opacity-40"/>
                        </div>
                        <p className="text-sm">No se encontraron resultados</p>
                    </div>
                )}
             </div>

             {/* Paginación */}
             {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4 print:hidden">
                   <button 
                     disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
                     className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-all"
                   >
                     <ChevronLeft size={14}/> Anterior
                   </button>
                   <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Página {currentPage} / {totalPages}</span>
                   <button 
                     disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}
                     className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-all"
                   >
                     Siguiente <ChevronRight size={14}/>
                   </button>
                </div>
             )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex font-sans text-slate-800">
      {/* SIDEBAR: SLATE-900 (Azul Noche) */}
      {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden print:hidden" onClick={() => setSidebarOpen(false)}></div>}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 bg-slate-900 text-white flex flex-col transition-all duration-300 ease-in-out print:hidden overflow-x-hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}`}>
        <div className="h-20 flex items-center justify-between px-6 shrink-0">
          {!isSidebarCollapsed ? <div className="font-bold text-lg tracking-tight text-white whitespace-nowrap">FLEXI<span className="text-orange-500">CRM</span></div> : <div className="w-full text-center font-bold text-orange-500 text-xl">FC</div>}
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white"><X size={20}/></button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar overflow-x-hidden py-4">
          <SidebarItem icon={<LayoutDashboard size={18}/>} text="Dashboard" active={currentView === 'dashboard'} collapsed={isSidebarCollapsed} onClick={() => { setCurrentView('dashboard'); setSidebarOpen(false); }} />
          <SidebarItem icon={<Users size={18}/>} text="Clientes" active={currentView === 'leads'} collapsed={isSidebarCollapsed} onClick={() => { setCurrentView('leads'); setFilterStatus('Todos'); setCurrentPage(1); setSidebarOpen(false); }} />
          <SidebarItem icon={<CalendarIcon size={18}/>} text="Agenda" active={currentView === 'agenda'} collapsed={isSidebarCollapsed} onClick={() => { setCurrentView('agenda'); setCurrentPage(1); setSidebarOpen(false); }} />
          <SidebarItem icon={<BarChart3 size={18}/>} text="Reportes" active={currentView === 'reports'} collapsed={isSidebarCollapsed} onClick={() => { setCurrentView('reports'); setSidebarOpen(false); }} />
          <div className="my-4 border-t border-slate-800 mx-2"></div>
          <SidebarItem icon={<Trash2 size={18}/>} text="Papelera" active={currentView === 'trash'} collapsed={isSidebarCollapsed} onClick={() => { setCurrentView('trash'); setSidebarOpen(false); }} />
        </nav>

        <div className="p-6 shrink-0 border-t border-slate-800">
           <button onClick={() => setSidebarCollapsed(!isSidebarCollapsed)} className="hidden lg:flex w-full justify-center text-slate-500 hover:text-white mb-6 transition-colors">
              {isSidebarCollapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
           </button>
           <div className={`flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-xs text-white shadow shrink-0">DC</div>
              {!isSidebarCollapsed && <div className="animate-fade-in overflow-hidden whitespace-nowrap"><p className="text-sm font-medium">David C.</p><p className="text-[10px] text-slate-500 uppercase tracking-widest">Admin</p></div>}
           </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
        <header className="h-20 flex items-center justify-between px-8 shrink-0 print:hidden z-20 bg-white border-b border-slate-100">
           <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-500 p-2 hover:bg-slate-100 rounded-lg"><Menu/></button>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                 {currentView === 'dashboard' ? 'Panel Principal' : currentView === 'trash' ? 'Papelera' : currentView === 'reports' ? 'Análisis de Ventas' : 'Listado de Clientes'}
              </h1>
           </div>
           <div className="flex gap-3">
              <button onClick={handlePrint} className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors" title="Imprimir"><Printer size={20}/></button>
              {currentView !== 'trash' && currentView !== 'reports' && (
                <button onClick={() => openModal('new')} className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-orange-600 flex items-center gap-2 shadow-lg shadow-slate-200 hover:shadow-orange-200 transition-all">
                   <Plus size={16}/> <span className="hidden sm:inline">Nuevo Cliente</span>
                </button>
              )}
           </div>
        </header>

        <main className="flex-1 overflow-auto p-8 pt-6 print:p-0">
           {/* Header Impresión */}
           <div className="hidden print:block mb-8 border-b-2 border-black pb-4">
              <h1 className="text-2xl font-black uppercase">Reporte Mensual</h1>
              <p>Agente: David Castillo | Fecha: {new Date().toLocaleDateString()}</p>
           </div>
           {renderContent()}
        </main>
      </div>

      {/* --- MODALES --- */}

      {modal.isOpen && modal.type === 'new' && (
        <ModalWrapper onClose={closeModal} title="Nuevo Prospecto">
           <NewLeadForm onSubmit={handleAddNew} onCancel={closeModal} />
        </ModalWrapper>
      )}

      {modal.isOpen && modal.type === 'detail' && modal.data && (
        // Modal wrapper para la ficha
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm print:hidden animate-fade-in">
            <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col border border-white/50">
                <LeadDetailView 
                    initialLead={modal.data} 
                    onSave={handleUpdateLead} 
                    onDelete={moveToTrash} 
                    onSchedule={() => openModal('appointment', modal.data)}
                    onClose={closeModal}
                />
            </div>
        </div>
      )}

      {modal.isOpen && modal.type === 'appointment' && modal.data && (
        <ModalWrapper onClose={closeModal} title="Agendar Experiencia">
           <InfiniteCalendarAppointment 
             lead={modal.data}
             onSave={(datetime, notes) => {
                handleUpdateLead({ 
                  ...modal.data, 
                  status: 'Cita Agendada', 
                  appointment: datetime, 
                  notes: modal.data.notes + `\n[CITA]: ${datetime}. ${notes}`
                });
             }}
             onCancel={() => openModal('detail', modal.data)}
           />
        </ModalWrapper>
      )}

      <style>{`
        @media print {
          aside, header, button, .print\\:hidden { display: none !important; }
          main { overflow: visible !important; height: auto !important; margin: 0 !important; padding: 0 !important; }
          * { -webkit-print-color-adjust: exact !important; box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}

// --- SUB-COMPONENTES ACTUALIZADOS ---

const ReportsView = ({ leads, onOpenDetail }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); 

    const monthlyLeads = useMemo(() => {
        return leads.filter(l => !l.isDeleted && l.status === 'Vendido' && l.date.startsWith(selectedMonth));
    }, [leads, selectedMonth]);

    const totalSales = monthlyLeads.length;
    
    const warrantyLeads = monthlyLeads.filter(l => l.warranty && l.warranty !== 'Legal (1 Año)');
    const totalWarranties = warrantyLeads.length;
    const totalWarrantyRevenue = warrantyLeads.reduce((sum, l) => sum + (WARRANTY_PRICES[l.warranty] || 0), 0);

    const ratio = totalSales > 0 ? Math.round((totalWarranties / totalSales) * 100) : 0;

    let commissionRate = 0;
    let commissionStatus = 'Sin Comisión';
    
    if (ratio >= 80) {
        commissionRate = 0.10; 
        commissionStatus = 'Obj. Oro (10%)';
    } else if (ratio >= 60) {
        commissionRate = 0.06;
        commissionStatus = 'Obj. Plata (6%)';
    } else {
        commissionRate = 0;
        commissionStatus = 'Fuera de obj.';
    }

    const estimatedCommission = totalWarrantyRevenue * commissionRate;

    return (
        <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
            {/* Header con Selector */}
            <div className="flex justify-between items-end print:hidden">
                <div>
                   <h3 className="text-xl font-bold text-slate-900 tracking-tight">Rendimiento</h3>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
                    <CalendarDays className="text-slate-400" size={14}/>
                    <input 
                       type="month" 
                       value={selectedMonth}
                       onChange={(e) => setSelectedMonth(e.target.value)}
                       className="text-sm font-bold text-slate-700 outline-none bg-transparent"
                    />
                </div>
            </div>

            {/* LA LÍNEA DE TIEMPO / OBJETIVO VISUAL */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-end mb-4">
                     <h3 className="font-bold text-xs uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <Target size={14}/> Convertibilidad Garantías
                    </h3>
                    <div className="text-right">
                        <span className={`text-2xl font-black ${ratio >= 80 ? 'text-slate-900' : ratio >= 60 ? 'text-slate-600' : 'text-slate-400'}`}>
                            {ratio}%
                        </span>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative h-2 mt-2 mb-6 bg-slate-100 rounded-full overflow-hidden flex">
                     <div className="w-[60%] h-full bg-red-100 border-r border-white"></div>
                     <div className="w-[20%] h-full bg-yellow-100 border-r border-white"></div>
                     <div className="w-[20%] h-full bg-green-100"></div>
                </div>
                
                {/* Etiquetas */}
                <div className="absolute top-[3.5rem] left-[6%] text-[9px] font-bold text-slate-300">0%</div>
                <div className="absolute top-[3.5rem] left-[60%] -translate-x-1/2 text-[9px] font-bold text-slate-400">60%</div>
                <div className="absolute top-[3.5rem] left-[80%] -translate-x-1/2 text-[9px] font-bold text-slate-400">80%</div>
                <div className="absolute top-[3.5rem] right-[6%] text-[9px] font-bold text-slate-300">100%</div>
                
                {/* Indicador */}
                <div 
                    className="absolute top-[3rem] w-1 h-3 bg-slate-900 rounded-full transition-all duration-1000 z-10"
                    style={{ left: `${Math.min(Math.max(ratio, 0), 100)}%` }}
                ></div>
            </div>

            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:grid-cols-3">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ventas</p>
                    <p className="text-3xl font-black text-slate-900">{totalSales}</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Garantías</p>
                    <p className="text-3xl font-black text-blue-600">{totalWarranties}</p>
                </div>
                
                {/* CARD DE COMISIÓN */}
                <div className="bg-slate-900 p-5 rounded-xl shadow-lg relative overflow-hidden group">
                     <div className="flex justify-between items-start">
                        <div>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Comisión ({commissionRate * 100}%)</p>
                             <p className="text-3xl font-black text-white tracking-tight">{estimatedCommission.toLocaleString()}€</p>
                        </div>
                        <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${ratio >= 80 ? 'bg-green-500 text-slate-900' : ratio >= 60 ? 'bg-yellow-500 text-slate-900' : 'bg-red-500 text-white'}`}>
                             {commissionStatus}
                         </div>
                     </div>
                </div>
            </div>

            {/* TABLA DETALLE */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden print:border-black">
                <table className="w-full text-left">
                    <thead className="bg-white text-[10px] uppercase text-slate-400 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-3 font-bold tracking-wider">Cliente</th>
                            <th className="px-6 py-3 font-bold tracking-wider">Garantía</th>
                            <th className="px-6 py-3 font-bold tracking-wider text-right">Importe</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {monthlyLeads.map(lead => {
                            const cost = WARRANTY_PRICES[lead.warranty] || 0;
                            const isPaid = cost > 0;
                            return (
                                <tr 
                                    key={lead.id} 
                                    onClick={() => onOpenDetail(lead)} 
                                    className={`cursor-pointer hover:bg-slate-50 transition-colors ${!isPaid ? 'opacity-40' : ''}`}
                                >
                                    <td className="px-6 py-3 font-bold text-slate-900 text-sm">{lead.name}</td>
                                    <td className="px-6 py-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${isPaid ? 'bg-white text-slate-900 border-slate-200' : 'bg-slate-50 text-slate-400 border-transparent'}`}>{lead.warranty}</span></td>
                                    <td className="px-6 py-3 text-right font-mono font-medium text-slate-600">{cost}€</td>
                                </tr>
                            );
                        })}
                        {monthlyLeads.length === 0 && <tr><td colSpan="3" className="p-8 text-center text-slate-400 text-sm">Sin datos.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const NewLeadForm = ({ onSubmit, onCancel }) => {
  const [showEconomics, setShowEconomics] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false); // NUEVO ESTADO PARA CITA
  const [price, setPrice] = useState(0);
  const [warranty, setWarranty] = useState('Legal (1 Año)');

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const apptDate = fd.get('appt_date');
    const apptTime = fd.get('appt_time');
    
    // Si hay fecha y hora, construimos el string de la cita
    const appointmentStr = (apptDate && apptTime) ? `${apptDate} ${apptTime}` : null;

    onSubmit({ 
        name: fd.get('name'), 
        phone: fd.get('phone'), 
        email: fd.get('email'), 
        vehicle: fd.get('vehicle'), 
        price: fd.get('price'),
        saleType: fd.get('saleType'),
        warranty: fd.get('warranty'),
        notes: fd.get('notes'),
        appointment: appointmentStr 
    });
  };

  const currentWarrantyPrice = WARRANTY_PRICES[warranty] || 0;
  const total = parseInt(price || 0) + currentWarrantyPrice;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      <div className="grid grid-cols-2 gap-4">
         <div><label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Nombre</label><input name="name" required className="w-full bg-slate-50 border-none rounded p-2 text-sm font-medium focus:ring-1 focus:ring-orange-500 outline-none" placeholder="Nombre completo"/></div>
         <div><label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Teléfono</label><input name="phone" required className="w-full bg-slate-50 border-none rounded p-2 text-sm font-medium focus:ring-1 focus:ring-orange-500 outline-none" placeholder="+34..."/></div>
      </div>
      <div><label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Vehículo</label><input name="vehicle" required className="w-full bg-slate-50 border-none rounded p-2 text-sm font-medium focus:ring-1 focus:ring-orange-500 outline-none" placeholder="Modelo interés"/></div>
      
      {/* ACORDEÓN ECONÓMICO */}
      <div className="border border-slate-100 rounded-lg overflow-hidden">
        <button type="button" onClick={() => setShowEconomics(!showEconomics)} className="w-full flex justify-between items-center p-3 bg-white hover:bg-slate-50 transition-colors">
            <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><Euro size={12}/> Económico (Opcional)</span>
            {showEconomics ? <ChevronUp size={14} className="text-slate-400"/> : <ChevronDown size={14} className="text-slate-400"/>}
        </button>
        {showEconomics && (
            <div className="p-3 bg-slate-50 animate-fade-in">
                 <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Precio</label>
                        <input name="price" type="number" placeholder="0" className="w-full bg-white border-none rounded p-2 text-sm font-medium" onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Garantía</label>
                        <select name="warranty" className="w-full bg-white border-none rounded p-2 text-sm font-medium outline-none" onChange={(e) => setWarranty(e.target.value)}>
                            {Object.keys(WARRANTY_PRICES).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Total</span>
                    <span className="font-bold text-slate-900">{total.toLocaleString()}€</span>
                 </div>
            </div>
        )}
      </div>

      {/* ACORDEÓN AGENDAR CITA (NUEVO) */}
      <div className="border border-slate-100 rounded-lg overflow-hidden">
        <button type="button" onClick={() => setShowAppointment(!showAppointment)} className="w-full flex justify-between items-center p-3 bg-white hover:bg-slate-50 transition-colors">
            <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><CalendarIcon size={12}/> Agendar Cita (Opcional)</span>
            {showAppointment ? <ChevronUp size={14} className="text-slate-400"/> : <ChevronDown size={14} className="text-slate-400"/>}
        </button>
        {showAppointment && (
            <div className="p-3 bg-slate-50 animate-fade-in grid grid-cols-2 gap-3">
                 <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Fecha</label>
                    <input name="appt_date" type="date" className="w-full bg-white border-none rounded p-2 text-xs font-medium text-slate-600 outline-none"/>
                 </div>
                 <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Hora</label>
                    <input name="appt_time" type="time" className="w-full bg-white border-none rounded p-2 text-xs font-medium text-slate-600 outline-none"/>
                 </div>
            </div>
        )}
      </div>

      <div className="flex gap-2 pt-2">
         <button type="button" onClick={onCancel} className="flex-1 py-2.5 bg-slate-100 rounded-lg text-slate-500 font-bold text-xs hover:bg-slate-200">Cancelar</button>
         <button type="submit" className="flex-1 py-2.5 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-orange-600 transition-colors">Guardar</button>
      </div>
    </form>
  );
};

// --- FICHA MODERNA Y COMPACTA ---

const LeadDetailView = ({ initialLead, onSave, onDelete, onSchedule, onClose }) => {
  const [formData, setFormData] = useState({...initialLead});
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const warrantyCost = WARRANTY_PRICES[formData.warranty] || 0;
  const totalPrice = parseInt(formData.price || 0) + warrantyCost;
  const isSold = formData.status === 'Vendido';

  return (
    <div className="flex flex-col h-full bg-white font-sans text-slate-800">
        {/* Header Compacto */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                   {formData.name.charAt(0)}
                </div>
                <div>
                   <input 
                       className="font-bold text-slate-900 bg-transparent border-none outline-none w-full p-0 text-base focus:ring-0"
                       value={formData.name}
                       onChange={(e) => handleChange('name', e.target.value)}
                   />
                   <div className="flex items-center gap-2 mt-0.5">
                       <select 
                           className={`appearance-none text-[10px] font-bold uppercase tracking-wide border-none bg-transparent outline-none p-0 cursor-pointer ${STATUS_STYLES[formData.status]?.split(' ')[1] || 'text-slate-500'}`}
                           value={formData.status}
                           onChange={(e) => handleChange('status', e.target.value)}
                       >
                           {STATUS_OPTIONS.map(st => <option key={st} value={st}>{st}</option>)}
                       </select>
                       <ChevronDown size={10} className="text-slate-300"/>
                       {isSold && <CheckCircle size={12} className="text-green-500"/>}
                   </div>
                </div>
            </div>
            {/* BOTONES DE ACCIÓN SOLO ICONOS */}
            <div className="flex items-center gap-1">
                <button 
                   onClick={() => onSave(formData)} 
                   disabled={!isDirty}
                   title={isDirty ? "Guardar cambios" : "Sin cambios"}
                   className={`p-2 rounded-lg transition-all ${isDirty ? 'bg-slate-900 text-white hover:bg-orange-600 shadow-md' : 'text-slate-300 cursor-default'}`}
                >
                   <Save size={18}/>
                </button>
                <button 
                   onClick={onSchedule}
                   title="Agendar Cita"
                   className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                   <CalendarIcon size={18}/>
                </button>
                <button 
                   onClick={() => onDelete(formData.id)}
                   title="Eliminar"
                   className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                   <Trash2 size={18}/>
                </button>
                <div className="w-px h-6 bg-slate-100 mx-1"></div>
                <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100"><X size={18}/></button>
            </div>
        </div>

        {/* Body Compacto en Grid */}
        <div className="p-6 grid grid-cols-2 gap-6 bg-white">
            
            {/* Columna Izquierda: Económico (Con énfasis en Garantía) */}
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-2.5 rounded-lg">
                        <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Precio</label>
                        <input 
                           type="number"
                           className="w-full bg-transparent font-bold text-slate-900 outline-none text-sm"
                           value={formData.price}
                           onChange={(e) => handleChange('price', e.target.value)}
                        />
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-lg">
                        <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Tipo Venta</label>
                        <select 
                           className="w-full bg-transparent font-bold text-slate-900 outline-none text-sm p-0 appearance-none"
                           value={formData.saleType || 'Financiado'}
                           onChange={(e) => handleChange('saleType', e.target.value)}
                        >
                            {SALE_TYPES.map(st => <option key={st} value={st}>{st}</option>)}
                        </select>
                    </div>
                </div>

                {/* GARANTÍA RESALTADA LEVEMENTE */}
                <div className="bg-orange-50/50 border border-orange-100 p-3 rounded-lg relative group transition-colors hover:bg-orange-50">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-[9px] font-bold text-orange-400 uppercase flex items-center gap-1">
                             <ShieldCheck size={10}/> Garantía Premium
                        </label>
                        <span className="text-[10px] font-bold text-orange-600 bg-white px-2 py-0.5 rounded border border-orange-100 shadow-sm">
                             +{warrantyCost}€
                        </span>
                    </div>
                    <select 
                       className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none cursor-pointer appearance-none relative z-10"
                       value={formData.warranty || 'Legal (1 Año)'}
                       onChange={(e) => handleChange('warranty', e.target.value)}
                    >
                       {Object.keys(WARRANTY_PRICES).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 bottom-3 text-orange-300 pointer-events-none"/>
                </div>

                <div className="flex justify-between items-end border-t border-slate-100 pt-3 mt-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Total</span>
                    <span className="text-xl font-black text-slate-900 tracking-tight">{totalPrice.toLocaleString()}€</span>
                </div>
            </div>

            {/* Columna Derecha: Vehículo y Notas */}
            <div className="space-y-4">
                 <div className="border-b border-slate-100 pb-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Vehículo de Interés</label>
                    <input 
                        className="w-full font-bold text-slate-800 outline-none text-sm placeholder:text-slate-300"
                        value={formData.vehicle}
                        onChange={(e) => handleChange('vehicle', e.target.value)}
                    />
                 </div>

                 <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Contacto</label>
                    <input className="w-full text-xs font-medium text-slate-600 outline-none mb-1 placeholder:text-slate-300" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="Teléfono"/>
                    <input className="w-full text-xs font-medium text-slate-600 outline-none placeholder:text-slate-300" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="Email"/>
                 </div>

                 <div className="bg-yellow-50/50 rounded-lg p-2">
                    <textarea 
                        className="w-full bg-transparent text-xs text-slate-600 outline-none resize-none h-16 placeholder:text-slate-300"
                        placeholder="Notas privadas..."
                        value={formData.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                    ></textarea>
                 </div>
            </div>
        </div>
    </div>
  );
};

const DashboardView = ({ leads, onViewChange, setFilter }) => {
  const activeL = leads.filter(l => !l.isDeleted);
  const stats = [
    { title: 'Total Leads', val: activeL.length, icon: <Users/>, color: 'text-slate-900', bg: 'bg-slate-100', border: 'border-slate-200', target: 'leads', filter: 'Todos' },
    { title: 'Por Gestionar', val: activeL.filter(l => l.status === 'Nuevo Lead').length, icon: <Clock/>, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', target: 'leads', filter: 'Nuevo Lead' },
    { title: 'Citas Activas', val: activeL.filter(l => l.status === 'Cita Agendada').length, icon: <CalendarIcon/>, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', target: 'agenda', filter: 'Cita Agendada' },
    { title: 'Ventas Cerradas', val: activeL.filter(l => l.status === 'Vendido').length, icon: <CheckCircle/>, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100', target: 'reports', filter: 'Todos' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((s, idx) => (
            <div 
              key={idx} 
              onClick={() => { onViewChange(s.target); setFilter(s.filter); }}
              className={`p-6 rounded-2xl border ${s.border} bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between h-40`}
            >
               <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.title}</span>
                  <div className={`p-2 rounded-lg ${s.bg} ${s.color}`}>
                     {React.cloneElement(s.icon, { size: 18 })}
                  </div>
               </div>
               <div className="text-4xl font-black text-slate-900 tracking-tight">{s.val}</div>
            </div>
         ))}
      </div>
      
      {/* Resumen Simple de Actividad */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
         <h3 className="font-bold text-sm text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-wide border-b border-slate-100 pb-2">
            Actividad Reciente
         </h3>
         <div className="space-y-2">
            {activeL.slice(0, 3).map(l => (
                <div key={l.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors cursor-default border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">{l.name.charAt(0)}</div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">{l.name}</p>
                            <p className="text-xs text-slate-500 font-medium">{l.status}</p>
                        </div>
                    </div>
                    <span className="text-xs font-bold text-slate-300">{l.date}</span>
                </div>
            ))}
            <button onClick={() => onViewChange('leads')} className="w-full py-4 text-xs font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest mt-4">
                Ver historial completo
            </button>
         </div>
      </div>
    </div>
  );
};

const TrashView = ({ leads, onRestore, onDelete }) => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-fade-in">
     <div className="bg-slate-50 p-6 border-b border-slate-200 flex items-center gap-3 text-slate-800 font-bold text-sm">
        <Trash2 size={18}/> Papelera de Reciclaje
     </div>
     <table className="w-full text-left">
        <tbody className="divide-y divide-slate-100">
           {leads.map(lead => (
              <tr key={lead.id} className="hover:bg-red-50/10 transition-colors">
                 <td className="p-6 text-sm font-bold text-slate-800">{lead.name}</td>
                 <td className="p-6 text-sm text-slate-500">{lead.vehicle}</td>
                 <td className="p-6 text-right flex gap-3 justify-end">
                    <button onClick={() => onRestore(lead.id)} className="text-xs bg-white border border-green-200 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 flex items-center gap-2 font-bold shadow-sm transition-all">
                       <RotateCcw size={14}/> Restaurar
                    </button>
                    <button onClick={() => onDelete(lead.id)} className="text-xs bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 flex items-center gap-2 font-bold shadow-sm transition-all">
                       <Ban size={14}/> Eliminar
                    </button>
                 </td>
              </tr>
           ))}
           {leads.length === 0 && (
              <tr><td colSpan="3" className="p-16 text-center text-slate-400 font-medium text-sm">La papelera está vacía.</td></tr>
           )}
        </tbody>
     </table>
  </div>
);

const InfiniteCalendarAppointment = ({ lead, onSave, onCancel }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null); 
    const [selectedTime, setSelectedTime] = useState(null);
    const [note, setNote] = useState('');

    const changeMonth = (offset) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
        setCurrentDate(new Date(newDate));
    };

    const getDaysInMonth = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = new Date(year, month, 1);
        const days = [];
        const firstDayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1; 
        for (let i = 0; i < firstDayIndex; i++) days.push(null);
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const days = getDaysInMonth();
    const times = ['09:00', '10:00', '11:00', '12:00', '16:00', '17:00', '18:00', '19:00'];
    const monthName = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    return (
        <div className="flex flex-col md:flex-row gap-8 h-[450px] p-2">
            <div className="flex-1 border-r border-slate-100 pr-6">
                <div className="flex justify-between items-center mb-6">
                    <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronLeft size={20}/></button>
                    <span className="font-bold uppercase text-sm text-slate-900 tracking-widest">{monthName}</span>
                    <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight size={20}/></button>
                </div>
                
                <div className="grid grid-cols-7 gap-2 text-center mb-4">
                    {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => <span key={d} className="text-[10px] font-bold text-slate-300">{d}</span>)}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                    {days.map((d, i) => {
                        if (!d) return <div key={i} className="h-10"></div>;
                        const dateStr = d.toISOString().split('T')[0];
                        const isSelected = selectedDay === dateStr;
                        const isToday = new Date().toISOString().split('T')[0] === dateStr;

                        return (
                            <button 
                                key={i} 
                                onClick={() => setSelectedDay(dateStr)}
                                className={`h-10 w-10 mx-auto rounded-xl text-xs font-bold transition-all flex items-center justify-center
                                    ${isSelected ? 'bg-slate-900 text-white shadow-lg shadow-slate-300 scale-110' : 'hover:bg-slate-100 text-slate-700'}
                                    ${isToday && !isSelected ? 'border border-slate-200 text-slate-900' : ''}
                                `}
                            >
                                {d.getDate()}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="w-full md:w-72 flex flex-col">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Horarios Disponibles</h4>
                
                {selectedDay ? (
                    <div className="grid grid-cols-2 gap-3 mb-6 overflow-y-auto max-h-48 custom-scrollbar pr-2">
                        {times.map(t => (
                            <button 
                                key={t} 
                                onClick={() => setSelectedTime(t)}
                                className={`py-2 rounded-lg text-xs font-bold border transition-all ${selectedTime === t ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'border-slate-200 text-slate-600 hover:border-slate-900'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-300 italic mb-4 border border-dashed border-slate-100 rounded-xl">
                        <CalendarIcon size={24} className="mb-2 opacity-50"/>
                        <span className="text-xs">Elige un día</span>
                    </div>
                )}

                <textarea 
                    placeholder="Nota para la cita..." 
                    className="w-full p-3 bg-slate-50 rounded-xl text-xs border-none focus:bg-white focus:ring-1 focus:ring-slate-900 outline-none mb-4 resize-none transition-all"
                    rows="2"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                ></textarea>

                <div className="mt-auto flex gap-3">
                    <button onClick={onCancel} className="flex-1 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">Cancelar</button>
                    <button 
                        disabled={!selectedDay || !selectedTime}
                        onClick={() => onSave(`${selectedDay} ${selectedTime}`, note)}
                        className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 disabled:opacity-50 shadow-lg shadow-slate-200 transition-all"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

const ModalWrapper = ({ children, onClose, title }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm print:hidden animate-fade-in">
    <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh] border border-white/50">
      <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{title}</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-900 hover:bg-slate-50 p-2 rounded-full transition-all"><X size={20}/></button>
      </div>
      <div className="overflow-y-auto p-8 custom-scrollbar">
        {children}
      </div>
    </div>
  </div>
);

const SidebarItem = ({ icon, text, collapsed, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 group relative
      ${active ? 'bg-orange-500 text-white shadow-lg shadow-orange-900/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}
      ${collapsed ? 'justify-center' : ''}
    `} 
    title={text}
  >
    <div className={`${active ? 'text-white' : 'group-hover:text-white'} transition-colors shrink-0`}>{icon}</div>
    {!collapsed && <span className="font-bold text-sm whitespace-nowrap overflow-hidden tracking-wide">{text}</span>}
    {collapsed && (
        <span className="absolute left-16 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl border border-slate-700 uppercase tracking-widest">
            {text}
        </span>
    )}
  </button>
);