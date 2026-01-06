import React, { useState, useEffect, useMemo } from 'react';
import { 
  Phone, X, ChevronRight, MessageCircle, ShieldCheck, 
  Calendar, Zap, Gauge, CheckCircle, Search, 
  Award, Star, UserCheck, ArrowRight, Info, ChevronDown, ChevronUp,
  Camera, MapPin, Clock, ChevronLeft
} from 'lucide-react';

/* --- CONFIGURACIÓN --- */
const AGENT_PHONE = "34640522654"; 
const AGENT_NAME = "David Castillo";
// NOTA: Recuerda que cambiamos esto a una ruta local "/david1.png" en tu entorno si ya subiste la foto
const AGENT_PHOTO_URL = "/david1.png"; 

const CARS_DATA = [
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

/* --- COMPONENTS --- */

const Navbar = () => (
  <nav className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="font-black text-xl sm:text-2xl tracking-tighter text-slate-900 italic">
          FLEXI<span className="text-orange-500">CAR</span>
        </div>
        <div className="hidden sm:flex flex-col border-l border-gray-200 pl-3">
          <span className="text-[10px] uppercase font-bold text-gray-400">Asesor Experto</span>
          <span className="text-xs font-bold text-gray-800">{AGENT_NAME}</span>
        </div>
      </div>
      <a href={`tel:${AGENT_PHONE}`} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all text-xs uppercase shadow-md active:scale-95">
        <Phone size={14} /> <span className="hidden sm:inline">Llamar</span>
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <div className="relative bg-slate-900 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920" 
        className="w-full h-full object-cover opacity-20" 
        alt="Fondo concesionario"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
      <div className="w-full lg:w-1/2 order-1 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-6 border border-orange-500/30 backdrop-blur-sm mx-auto lg:mx-0">
          <Award size={12} /> Atención VIP Garantizada
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-none mb-6">
          TU NUEVO COCHE. <br/>
          {/* Inyección de fuente directa para asegurar que se vea bien */}
          <span style={{ fontFamily: '"Playfair Display", serif' }} className="italic font-medium text-orange-500 text-3xl sm:text-4xl md:text-6xl tracking-wide">
            Asesoría Personal.
          </span>
        </h1>
        
        <div className="bg-white/5 p-5 rounded-xl border border-white/10 mb-8 max-w-lg mx-auto lg:mx-0 backdrop-blur-sm">
           <p className="text-gray-300 text-sm leading-relaxed font-light">
             Soy <span className="text-white font-bold">{AGENT_NAME}</span>. Mi compromiso es que compres con total transparencia. Gestiono tu financiación y reviso cada detalle por ti.
           </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
          <button onClick={() => document.getElementById('catalogo').scrollIntoView({behavior:'smooth'})} className="bg-white text-slate-900 px-8 py-4 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-lg w-full sm:w-auto">
            Ver Inventario
          </button>
          
          <div className="flex items-center gap-3 text-white opacity-80 hover:opacity-100 transition">
             <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center text-orange-400">
                <UserCheck size={18} />
             </div>
             <div className="text-left">
                <span className="block text-[9px] font-bold uppercase opacity-60">Garantizado</span>
                <span className="block text-xs font-bold uppercase leading-none tracking-wide">Trato directo</span>
             </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 order-2 flex justify-center lg:justify-end">
        <div className="relative max-w-xs sm:max-w-sm lg:max-w-md w-full aspect-[4/5] lg:aspect-square">
           <img 
             src={AGENT_PHOTO_URL} 
             alt={AGENT_NAME} 
             // AQUI ESTÁ EL CAMBIO: agregué 'object-top' para que siempre se vea la cabeza
             className="w-full h-full object-cover object-top rounded-[2rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 border-4 border-white/5"
           />
           <div className="absolute bottom-4 left-4 right-4 lg:bottom-auto lg:-bottom-6 lg:-left-6 lg:right-auto lg:w-auto bg-white p-4 rounded-xl shadow-xl animate-fade-in text-center flex flex-col items-center z-20">
              <div className="flex gap-1 mb-1 text-orange-500">
                 <Star size={12} fill="currentColor"/>
                 <Star size={12} fill="currentColor"/>
                 <Star size={12} fill="currentColor"/>
                 <Star size={12} fill="currentColor"/>
                 <Star size={12} fill="currentColor"/>
              </div>
              <p style={{ fontFamily: '"Playfair Display", serif' }} className="text-xs italic text-slate-800 font-bold whitespace-nowrap">"Servicio impecable"</p>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const LeadFormModal = ({ context, onClose }) => {
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let msg = `Hola ${AGENT_NAME}, soy ${fullName}. `;
    if (context.type === 'car') {
        msg += `Me interesa el ${context.data.brand} ${context.data.model} (${context.data.price}€).`;
    } else {
        msg += `Quisiera asesoría para buscar un coche.`;
    }
    window.open(`https://wa.me/${AGENT_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      {/* FONDO BLANCO CON TRANSPARENCIA (white/90) Y BLUR */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative border border-white/50">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition"><X size={20}/></button>
        <div className="p-6 text-center border-b border-gray-100/50">
          <div className="w-12 h-12 bg-green-100/80 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600">
             <MessageCircle size={24}/>
          </div>
          <h3 className="font-black text-slate-900 uppercase">¿Hablamos por WhatsApp?</h3>
          <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-widest">Atención directa con David</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Tu Nombre Completo</label>
            <input 
              autoFocus 
              placeholder="Ej. Juan Pérez" 
              required 
              className="w-full bg-white/80 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-green-500 outline-none transition-all" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
            />
          </div>
          <button type="submit" className="w-full bg-[#25D366] text-white py-3.5 rounded-lg font-bold text-xs uppercase flex items-center justify-center gap-2 hover:bg-[#1ebc50] transition shadow-lg shadow-green-100">
            Continuar al Chat <ArrowRight size={14}/>
          </button>
        </form>
      </div>
    </div>
  );
};

/* --- MODAL DETALLE CON GALERÍA Y DISEÑO COMPACTO --- */
const DetailModal = ({ car, onClose, onContact }) => {
  const [warranty, setWarranty] = useState(3);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => { 
    document.body.style.overflow = 'hidden'; 
    return () => { document.body.style.overflow = 'unset'; } 
  }, []);

  const toggleWarranty = (id) => {
    setWarranty(warranty === id ? null : id);
  };

  const nextImg = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev === car.images.length - 1 ? 0 : prev + 1));
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));
  };

  const warrantyOptions = [
    {
      id: 3, title: "Garantía Premium 3 años", price: "1.600 €", badge: "Opción recomendada",
      items: ["Motor y Caja", "Electrónica", "Batería Híbrido/EV", "Vehículo Sustitución"]
    },
    {
      id: 2, title: "Garantía Premium 2 años", price: "1.250 €", 
      items: ["Motor y Caja", "Electrónica", "Sustitución"]
    },
    {
      id: 1, title: "Garantía Premium 1 año", price: "850 €", items: ["Motor y Caja", "Cobertura Nacional"]
    },
    {
      id: 0, title: "Garantía Básica", price: "0 €", desc: "Garantía legal estándar", items: []
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-slate-900/95 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white w-full sm:max-w-6xl h-[90vh] max-h-[900px] rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row relative">
        <button onClick={onClose} className="absolute top-3 right-3 z-[60] bg-white/90 p-2 rounded-full shadow-lg text-slate-800 hover:bg-gray-100 transition"><X size={20}/></button>

        {/* COLUMNA GALERÍA */}
        <div className="w-full sm:w-1/2 shrink-0 bg-slate-900 flex flex-col h-1/2 sm:h-full overflow-hidden relative group">
           
           {/* Imagen Principal */}
           <div className="w-full flex-1 relative bg-black flex items-center justify-center overflow-hidden">
              <img src={car.images[activeImg]} className="w-full h-full object-cover transition-opacity duration-300" alt={`${car.model} vista principal`}/>
              
              {/* Botones de Navegación (Flechas) - Solo si hay más de 1 imagen */}
              {car.images.length > 1 && (
                <>
                  <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all z-20">
                     <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all z-20">
                     <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Contador */}
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded flex items-center gap-1 pointer-events-none">
                 <Camera size={12}/> {activeImg + 1} / {car.images.length}
              </div>
           </div>

           {/* Cinta de Miniaturas */}
           <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide bg-white border-t border-gray-100 shrink-0">
              {car.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImg(idx)}
                  className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImg === idx ? 'border-orange-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`Miniatura ${idx + 1}`}/>
                </button>
              ))}
           </div>
        </div>

        {/* COLUMNA INFO - DISEÑO COMPACTO */}
        <div className="w-full sm:w-1/2 flex flex-col h-full bg-white relative overflow-hidden min-h-0">
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 pb-24 sm:pb-6 custom-scrollbar">
            
            {/* Cabecera Compacta */}
            <div className="mb-3 border-b border-gray-100 pb-2">
               <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{car.brand}</span>
               <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{car.model}</h2>
               
               <div className="flex gap-3 mt-2">
                  <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Contado</span>
                    <span className="text-lg font-black text-slate-900 leading-none">{car.price}€</span>
                  </div>
                  <div className="bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                    <span className="text-[9px] font-bold text-orange-400 uppercase block">Financiado *</span>
                    <span className="text-lg font-black text-orange-600 leading-none">{car.monthly}€</span>
                  </div>
               </div>
            </div>

            {/* Ficha Técnica Mini */}
            <div className="grid grid-cols-3 gap-2 mb-3">
                 {[
                  {l: 'Año', v: car.year}, {l: 'KM', v: car.km}, {l: 'Motor', v: car.fuel}
                 ].map((x,i) => (
                    <div key={i} className="bg-slate-50/50 border border-gray-100 p-1.5 rounded-lg text-center">
                       <span className="block text-gray-400 font-bold uppercase text-[9px] mb-0.5">{x.l}</span>
                       <span className="text-[10px] font-bold text-slate-700">{x.v}</span>
                    </div>
                 ))}
            </div>

            {/* Descripción */}
            <div className="mb-4">
                <p className="text-[11px] text-slate-500 leading-snug bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">
                    {car.desc}
                </p>
            </div>

            {/* Garantías Acordeón */}
            <div className="mb-4">
              <h4 className="text-[10px] font-black text-slate-900 uppercase mb-2 flex items-center gap-2 border-b border-gray-100 pb-1">
                <ShieldCheck size={14} className="text-orange-500"/> Garantía disponible
              </h4>
              
              <div className="space-y-1.5">
                {warrantyOptions.map(opt => (
                  <div 
                    key={opt.id} 
                    onClick={() => toggleWarranty(opt.id)}
                    className={`rounded-lg border cursor-pointer transition-all relative overflow-hidden ${warranty === opt.id ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    {opt.badge && (
                        <div className="bg-orange-500 text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-wider inline-block rounded-br-lg mb-0.5">
                            {opt.badge}
                        </div>
                    )}

                    <div className="p-2 pt-0.5">
                        <div className="flex justify-between items-center gap-2">
                            <h5 className={`text-[10px] font-bold ${warranty === opt.id ? 'text-orange-900' : 'text-slate-700'}`}>{opt.title}</h5>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-black text-slate-900">{opt.price}</span>
                                {warranty === opt.id ? <ChevronUp size={14} className="text-orange-500"/> : <ChevronDown size={14} className="text-gray-400"/>}
                            </div>
                        </div>

                        {warranty === opt.id && opt.items.length > 0 && (
                           <ul className="mt-2 space-y-1 border-t border-dashed border-gray-200 pt-2 animate-fade-in">
                              {opt.items.map((item, idx) => (
                                 <li key={idx} className="flex items-start gap-1.5 text-[9px] text-slate-600">
                                    <CheckCircle size={10} className="text-green-500 mt-0.5 shrink-0"/>
                                    <span>{item}</span>
                                 </li>
                              ))}
                           </ul>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer Legal (Modal) */}
            <div className="px-1 mb-2">
               <p className="text-[8px] text-gray-400 italic text-center leading-tight">
                 *Este anuncio no es vinculante, puede contener errores, se muestra a título indicativo.
               </p>
            </div>
          </div>

          {/* Acción Principal Fija */}
          <div className="p-3 bg-white border-t border-gray-100 absolute bottom-0 w-full sm:static z-20">
             <button 
                onClick={() => onContact(car)} 
                className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold text-xs uppercase shadow-lg shadow-green-100 flex items-center justify-center gap-2 hover:bg-[#1ebc50] transition-colors"
             >
                <MessageCircle size={16}/> Solicitar Información
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- CATÁLOGO --- */
const Stock = ({ onSelect }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("Todas");
  const itemsPerPage = 8;

  const brands = ["Todas", ...new Set(CARS_DATA.map(c => c.brand))];

  const filteredCars = useMemo(() => {
    return CARS_DATA.filter(car => {
      const matchesSearch = car.model.toLowerCase().includes(search.toLowerCase()) || car.brand.toLowerCase().includes(search.toLowerCase());
      const matchesBrand = brandFilter === "Todas" || car.brand === brandFilter;
      return matchesSearch && matchesBrand;
    });
  }, [search, brandFilter]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const currentCars = filteredCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-6 mb-8 items-center justify-between">
         <div className="text-center md:text-left">
            <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">Catálogo Oficial</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Vehículos revisados por David Castillo</p>
         </div>
         
         <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16}/>
               <input 
                 type="text" placeholder="Buscar..." 
                 className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-orange-500 w-full"
                 value={search} onChange={(e) => {setSearch(e.target.value); setCurrentPage(1)}}
               />
            </div>
            <select 
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-orange-500"
              value={brandFilter} onChange={(e) => {setBrandFilter(e.target.value); setCurrentPage(1)}}
            >
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentCars.map((car) => (
          <div 
            key={car.id} onClick={() => onSelect(car)}
            className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer flex flex-col h-full relative"
          >
            <div className="aspect-video sm:aspect-[4/3] relative overflow-hidden bg-gray-200">
              <img src={car.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={car.model}/>
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[9px] font-bold text-gray-800 shadow-sm uppercase">{car.year}</div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest">{car.brand}</span>
              <h3 className="text-sm font-black text-slate-900 mb-2 truncate">{car.model}</h3>
              <div className="mt-auto pt-3 border-t border-gray-50 flex justify-between items-end">
                <div>
                   <span className="block text-lg font-black text-slate-900">{car.price}€</span>
                   <span className="text-[9px] text-gray-400 uppercase font-bold flex items-center gap-1">
                      {car.monthly}€/mes <span className="text-orange-500 font-black">*</span>
                   </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                   <ChevronRight size={18}/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
         <p className="text-[9px] text-gray-400 italic flex items-center justify-center gap-1">
            <Info size={10} /> * Cuota sujeta a financiación y condiciones del estudio. Consultar con David Castillo.
         </p>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
           {Array.from({length: totalPages}).map((_, i) => (
             <button 
                key={i} onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${currentPage === i + 1 ? 'bg-slate-900 text-white shadow-xl scale-110' : 'bg-white border border-gray-100 text-gray-400 hover:bg-gray-50'}`}
             >
               {i + 1}
             </button>
           ))}
        </div>
      )}
    </section>
  );
};

/* --- FOOTER PROFESIONAL --- */
const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12 px-6 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Resumen */}
        <div>
           <div className="font-black text-2xl italic text-white mb-4 tracking-tighter">FLEXI<span className="text-orange-500">CAR</span></div>
           <p className="leading-relaxed opacity-80 text-xs">
             Líderes en venta de vehículos de ocasión en Valencia.
             Asesoramiento exclusivo por David Castillo, garantizando máxima transparencia, financiación a medida y vehículos 100% certificados.
           </p>
        </div>
        {/* Ubicación */}
        <div>
           <h3 className="font-bold text-white uppercase tracking-widest mb-4 text-xs">Ubicación</h3>
           <div className="flex items-start gap-3 mb-3">
              <MapPin className="text-orange-500 shrink-0 mt-0.5" size={16} />
              <p className="text-xs">Av. del Automóvil, 123<br/>46000 Valencia, España</p>
           </div>
           <div className="flex items-start gap-3">
               <Phone className="text-orange-500 shrink-0 mt-0.5" size={16} />
               <p className="text-xs">+34 640 52 26 54</p>
           </div>
        </div>
        {/* Horarios */}
        <div>
           <h3 className="font-bold text-white uppercase tracking-widest mb-4 text-xs">Horarios de Atención</h3>
           <div className="flex items-start gap-3">
              <Clock className="text-orange-500 shrink-0 mt-0.5" size={16} />
              <ul className="space-y-1.5 text-xs">
                 <li>Lunes - Viernes: <span className="text-white font-bold">09:30 - 14:00 | 16:30 - 20:00</span></li>
                 <li>Sábados: <span className="text-white font-bold">10:00 - 14:00</span></li>
                 <li>Domingos: <span className="text-slate-500">Cerrado</span></li>
              </ul>
           </div>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-10 pt-6 text-center text-[10px] opacity-50 uppercase tracking-widest">
        © 2025 Agente Oficial Flexicar - {AGENT_NAME} | Todos los derechos reservados.
      </div>
  </footer>
);

/* --- APP --- */
export default function App() {
  // Efecto para inyectar la fuente Playfair Display sin tocar CSS
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const [selectedCar, setSelectedCar] = useState(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadContext, setLeadContext] = useState(null);

  const handleCarContact = (car) => {
    setLeadContext({ type: 'car', data: car });
    setShowLeadForm(true);
  };

  const handleGeneralContact = () => {
    setLeadContext({ type: 'general' });
    setShowLeadForm(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Stock onSelect={setSelectedCar} />
      
      {selectedCar && !showLeadForm && (
        <DetailModal car={selectedCar} onClose={() => setSelectedCar(null)} onContact={handleCarContact} />
      )}

      {showLeadForm && (
        <LeadFormModal context={leadContext} onClose={() => setShowLeadForm(false)} />
      )}

      <Footer />

      <button 
        onClick={handleGeneralContact}
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-40"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}