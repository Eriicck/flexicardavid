import React, { useState, useEffect } from 'react';
import { 
  Car, Plus, Trash2, Edit3, Save, X, Image as ImageIcon, 
  Search, LayoutGrid, List, ChevronLeft, ChevronRight, AlertCircle, 
  RefreshCw, Settings, Download, AlertTriangle, CheckCircle
} from 'lucide-react';

// --- DATOS POR DEFECTO (Sincronizados con App.jsx) ---
const DEFAULT_CARS = [
  { 
    id: 1, brand: "BMW", model: "Serie 4 Gran Coupé", year: 2021, km: "42.000", fuel: "Diésel", price: "32.900", monthly: "410", 
    desc: "Acabado M-Sport completo, techo solar, llantas de 19' y sonido Harman Kardon.", 
    images: [
      "https://cdn.motor1.com/images/mgl/nGrbG/s3/bmw-4er-gran-coupe-2021.jpg",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1000",
      "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2VzL29yaWdpbmFsL0JNVy9TRVJJRVMtNC80NDU5OF9CRVJMSU5BLTUtUFVFUlRBUy9ibXctc2VyaWU0LWdyYW5jb3VwZS1iYWNrLXZpZXcuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMDI0LCJoZWlnaHQiOm51bGwsImZpdCI6ImNvdmVyIn19fQ=="  ] 
  },
  { 
    id: 2, brand: "Mercedes-Benz", model: "Clase A 200 AMG", year: 2020, km: "58.000", fuel: "Gasolina", price: "26.500", monthly: "340", 
    desc: "Doble pantalla MBUX, realidad aumentada y paquete Night.", 
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1000",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1000",
      "https://images.unsplash.com/photo-1554744512-d6c603f27c54?w=1000"
    ] 
  },
  { 
    id: 3, brand: "Audi", model: "Q5 S-Line Quattro", year: 2019, km: "85.000", fuel: "Diésel", price: "34.900", monthly: "450", 
    desc: "Tracción Quattro, faros Matrix LED y asientos de cuero eléctricos.", 
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1000",
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=1000",
      "https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=1000"
    ] 
  },
  { 
    id: 4, brand: "Volkswagen", model: "Golf 8 GTI", year: 2022, km: "25.000", fuel: "Gasolina", price: "36.500", monthly: "480", 
    desc: "245CV, diferencial autoblocante y digital cockpit pro. Estado de reestreno.", 
    images: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1000",
      "https://images.unsplash.com/photo-1566274360936-692e0cf15523?w=1000",
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=1000"
    ] 
  },
  { 
    id: 5, brand: "Toyota", model: "RAV4 Hybrid", year: 2021, km: "40.000", fuel: "Híbrido", price: "29.900", monthly: "380", 
    desc: "Etiqueta ECO, bajo consumo y maletero gigante. Ideal familias.", 
    images: ["https://www.autodataar.com/contenido/noticias/original/2025/02/05/1738769649.webp"] 
  },
  { 
    id: 6, brand: "Porsche", model: "Macan S", year: 2018, km: "90.000", fuel: "Gasolina", price: "52.000", monthly: "650", 
    desc: "Motor V6, escape deportivo y llantas Spyder 21.", 
    images: [
            "https://landinginteligente.com/fotos/CatalogoUsados/deconcesionarias--2023-6-14--18-36-30/e780836f-9a3a-4222-b0f3-9146b888cf19.jpg",
      "https://di-uploads-pod3.dealerinspire.com/porscheoffremont/uploads/2025/09/macan-white.jpg"

            ] 
  },
  { 
    id: 7, brand: "Ford", model: "Mustang GT", year: 2020, km: "30.000", fuel: "Gasolina", price: "44.900", monthly: "520", 
    desc: "Motor V8 5.0L Coyote. Sonido espectacular y cambio manual.", 
    images: ["https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1000"] 
  },
  { 
    id: 8, brand: "Tesla", model: "Model 3 Performance", year: 2022, km: "15.000", fuel: "Eléctrico", price: "41.000", monthly: "490", 
    desc: "Autopilot, interior blanco premium y llantas Überturbine.", 
    images: ["https://www.shop4tesla.com/cdn/shop/articles/lohnt-sich-ein-gebrauchtes-tesla-model-3-vor-und-nachteile-833053.jpg?v=1733570691"] 
  },
  { 
    id: 9, brand: "Mini", model: "Cooper S JCW", year: 2019, km: "55.000", fuel: "Gasolina", price: "22.900", monthly: "290", 
    desc: "Acabado John Cooper Works, sonido de escape y techo panorámico.", 
    images: ["https://cdn.motor1.com/images/mgl/Kb1GNl/s3/mini-cooper-se-2024-im-jcw-trim.jpg"] 
  },
  { 
    id: 10, brand: "Land Rover", model: "Range Rover Evoque", year: 2020, km: "60.000", fuel: "Diésel", price: "31.500", monthly: "399", 
    desc: "Tiradores retráctiles, doble pantalla táctil y capacidad off-road.", 
    images: ["https://www.landroverwindsor.com/images/ckfinder/2025%20RANGE%20ROVER%20EVOQUE.jpg"] 
  },
];

export default function InventoryManager() {
  const [cars, setCars] = useState([]);
  const [view, setView] = useState('list'); // 'list' | 'form'
  const [editingCar, setEditingCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // --- CARGAR DATOS AL INICIO ---
  useEffect(() => {
    const stored = localStorage.getItem('flexicar_inventory');
    if (stored) {
      setCars(JSON.parse(stored));
    } else {
      setCars(DEFAULT_CARS);
      localStorage.setItem('flexicar_inventory', JSON.stringify(DEFAULT_CARS));
    }
  }, []);

  // --- GUARDAR CAMBIOS ---
  const saveToStorage = (newCars) => {
    setCars(newCars);
    localStorage.setItem('flexicar_inventory', JSON.stringify(newCars));
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este vehículo?')) {
      const newCars = cars.filter(c => c.id !== id);
      saveToStorage(newCars);
    }
  };

  const handleSaveCar = (carData) => {
    let newCars;
    if (editingCar) {
      newCars = cars.map(c => c.id === carData.id ? carData : c);
    } else {
      const newId = Math.max(...cars.map(c => c.id), 0) + 1;
      newCars = [{ ...carData, id: newId }, ...cars];
    }
    saveToStorage(newCars);
    setView('list');
    setEditingCar(null);
  };

  const handleResetDefaults = () => {
    if (window.confirm('¿Confirmas que deseas restaurar los datos de fábrica? Se perderán los cambios actuales.')) {
      saveToStorage(DEFAULT_CARS);
      setShowSettings(false);
      setCurrentPage(1);
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(cars, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flexicar_inventario_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtrado
  const filteredCars = cars.filter(c => 
    c.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lógica Paginación
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const paginatedCars = filteredCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Resetear página si cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* HEADER */}
      <header className="bg-slate-900 text-white p-4 sm:p-6 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-orange-500 p-2 rounded-lg shrink-0">
                <Car size={20} className="text-white"/>
             </div>
             <div>
                <h1 className="text-lg sm:text-xl font-black italic tracking-tighter">FLEXI<span className="text-orange-500">CAR</span></h1>
                <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest font-bold">Gestor de Inventario</p>
             </div>
          </div>
          
          <div className="flex gap-2 sm:gap-3">
             {view === 'list' && (
                <>
                   <div className="relative">
                       <button 
                         onClick={() => setShowSettings(!showSettings)}
                         className="p-2 sm:px-4 sm:py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors flex items-center justify-center"
                         title="Configuración"
                       >
                         <Settings size={18}/>
                       </button>

                       {showSettings && (
                           <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-fade-in">
                               <div className="p-3 border-b border-slate-100">
                                   <p className="text-xs font-bold text-slate-400 uppercase">Configuración</p>
                               </div>
                               <button 
                                 onClick={handleExportData}
                                 className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                               >
                                   <Download size={14} className="text-blue-500"/> Exportar Backup JSON
                               </button>
                               <button 
                                 onClick={handleResetDefaults}
                                 className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                               >
                                   <RefreshCw size={14}/> Restaurar Fábrica
                               </button>
                           </div>
                       )}
                   </div>

                   {showSettings && <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)}></div>}

                   <button 
                     onClick={() => { setEditingCar(null); setView('form'); }}
                     className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-5 py-2 rounded-lg font-bold text-xs sm:text-sm uppercase shadow-lg flex items-center gap-2 transition-all"
                   >
                     <Plus size={16}/> <span className="hidden sm:inline">Nuevo</span>
                   </button>
                </>
             )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        {view === 'list' ? (
          <div className="space-y-6">
            {/* BARRA DE BÚSQUEDA */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                    <input 
                      type="text" 
                      placeholder="Buscar por marca o modelo..." 
                      className="w-full pl-10 pr-4 py-2 outline-none text-sm font-medium text-slate-700 bg-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-auto text-xs text-slate-400 font-bold uppercase px-3 sm:border-l border-slate-100 text-center sm:text-left whitespace-nowrap">
                    {filteredCars.length} Vehículos en total
                </div>
            </div>

            {/* GRID DE COCHES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedCars.map(car => (
                    <div key={car.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
                        <div className="relative h-48 bg-slate-100 shrink-0">
                            {car.images[0] ? (
                                <img src={car.images[0]} alt={car.model} className="w-full h-full object-cover"/>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <ImageIcon size={40}/>
                                </div>
                            )}
                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase shadow-sm">
                                {car.price}€
                            </div>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                            <div className="mb-2">
                                <p className="text-[10px] font-bold text-orange-500 uppercase">{car.brand}</p>
                                <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{car.model}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4 text-[10px] text-slate-500 font-medium">
                                <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">{car.year}</span>
                                <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">{car.km} km</span>
                                <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">{car.fuel}</span>
                            </div>
                            
                            <div className="mt-auto flex gap-2 border-t border-slate-100 pt-3">
                                <button 
                                  onClick={() => { setEditingCar(car); setView('form'); }}
                                  className="flex-1 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase hover:bg-slate-800 transition-colors flex justify-center gap-2 items-center"
                                >
                                    <Edit3 size={14}/> Editar
                                </button>
                                <button 
                                  onClick={() => handleDelete(car.id)}
                                  className="px-3 py-2 bg-red-50 text-red-500 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
                                >
                                    <Trash2 size={16}/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* PAGINACIÓN */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8 pb-8">
                    <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-50 hover:bg-slate-50"
                    >
                        <ChevronLeft size={20}/>
                    </button>
                    <span className="text-sm font-bold text-slate-500">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-50 hover:bg-slate-50"
                    >
                        <ChevronRight size={20}/>
                    </button>
                </div>
            )}
          </div>
        ) : (
          <CarForm 
             initialData={editingCar} 
             onSave={handleSaveCar} 
             onCancel={() => { setView('list'); setEditingCar(null); }} 
          />
        )}
      </main>
    </div>
  );
}

// --- FORMULARIO DE EDICIÓN/CREACIÓN ---
const CarForm = ({ initialData, onSave, onCancel }) => {
    // Estado inicial vacío o con datos si editamos
    const defaultState = {
        brand: '', model: '', year: new Date().getFullYear(), km: '', fuel: 'Gasolina',
        price: '', monthly: '', desc: '', images: ['']
    };
    
    const [formData, setFormData] = useState(initialData || defaultState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    const addImageField = () => {
        setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
    };

    const removeImageField = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Limpiamos imagenes vacias
        const cleanData = {
            ...formData,
            images: formData.images.filter(img => img.trim() !== '')
        };
        // Validación básica
        if(cleanData.images.length === 0) {
            alert("Debes agregar al menos una imagen (URL).");
            return;
        }
        onSave(cleanData);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-fade-in mb-8">
            <div className="bg-slate-50 px-6 sm:px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
                    {initialData ? <Edit3 size={20} className="text-orange-500"/> : <Plus size={20} className="text-orange-500"/>}
                    {initialData ? 'Editar Vehículo' : 'Nuevo Vehículo'}
                </h2>
                <button onClick={onCancel} className="text-slate-400 hover:text-slate-800 transition-colors"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                {/* Datos Básicos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Marca</label>
                        <input name="brand" required value={formData.brand} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-bold text-slate-800 outline-none focus:border-orange-500 transition-colors" placeholder="Ej. BMW"/>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Modelo</label>
                        <input name="model" required value={formData.model} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-bold text-slate-800 outline-none focus:border-orange-500 transition-colors" placeholder="Ej. Serie 3 Pack M"/>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Año</label>
                            <input name="year" type="number" required value={formData.year} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium outline-none focus:border-orange-500"/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Kilometraje</label>
                            <input name="km" required value={formData.km} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium outline-none focus:border-orange-500" placeholder="Ej. 40.000"/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Combustible</label>
                            <select name="fuel" value={formData.fuel} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium outline-none focus:border-orange-500">
                                <option value="Gasolina">Gasolina</option>
                                <option value="Diésel">Diésel</option>
                                <option value="Híbrido">Híbrido</option>
                                <option value="Eléctrico">Eléctrico</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Precio (€)</label>
                            <input name="price" required value={formData.price} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-bold text-slate-900 outline-none focus:border-orange-500" placeholder="Ej. 25.000"/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Cuota Mensual (€)</label>
                            <input name="monthly" value={formData.monthly} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-bold text-orange-600 outline-none focus:border-orange-500" placeholder="Ej. 350"/>
                        </div>
                    </div>
                </div>

                {/* Descripción */}
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Descripción / Equipamiento</label>
                    <textarea name="desc" required value={formData.desc} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-medium outline-none focus:border-orange-500 h-24 resize-none" placeholder="Detalles destacados del coche..."></textarea>
                </div>

                {/* Imágenes */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                        <ImageIcon size={14}/> Galería de Imágenes (URLs)
                    </label>
                    <div className="space-y-3">
                        {formData.images.map((img, idx) => (
                            <div key={idx} className="flex gap-2">
                                <input 
                                  value={img} 
                                  onChange={(e) => handleImageChange(idx, e.target.value)} 
                                  className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium outline-none focus:border-orange-500"
                                  placeholder="https://..."
                                />
                                {img && (
                                    <div className="w-10 h-10 rounded border border-slate-200 overflow-hidden shrink-0 bg-gray-200">
                                        <img src={img} alt="Preview" className="w-full h-full object-cover"/>
                                    </div>
                                )}
                                <button type="button" onClick={() => removeImageField(idx)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={16}/>
                                </button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addImageField} className="mt-3 text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
                        <Plus size={14}/> Agregar otra imagen
                    </button>
                </div>

                {/* Botones */}
                <div className="flex gap-4 pt-4 border-t border-slate-100">
                    <button type="button" onClick={onCancel} className="flex-1 py-3 border border-slate-200 rounded-xl text-slate-500 font-bold text-sm hover:bg-slate-50 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 shadow-lg shadow-orange-100 transition-all flex justify-center gap-2 items-center">
                        <Save size={18}/> Guardar Vehículo
                    </button>
                </div>
            </form>
        </div>
    );
};