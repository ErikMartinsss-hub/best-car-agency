import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronRight, Menu, Instagram, Facebook, ArrowRight, Search } from 'lucide-react';

// --- COMPONENTE LOGO SVG (SILHUETA DE CARRO ESPORTE) ---
const CarLogoIcon = ({ size = 60 }) => (
  <svg 
    width={size} 
    height={size * 0.5} 
    viewBox="0 0 120 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_0_12px_rgba(230,57,70,0.7)] transition-transform duration-300 group-hover:scale-105"
  >
    <path 
      d="M5 45 C15 45 20 42 25 35 C35 25 75 25 85 35 C90 40 95 42 110 42 L115 30 L110 32 C100 32 95 35 90 40 L85 45 H5Z" 
      fill="#E63946" 
    />
    <path 
      d="M30 36 C40 30 70 30 80 36 L75 43 H35 L30 36Z" 
      fill="#09090b" 
    />
    <circle cx="25" cy="45" r="7" fill="#09090b" stroke="#E63946" strokeWidth="2"/>
    <circle cx="95" cy="45" r="7" fill="#09090b" stroke="#E63946" strokeWidth="2"/>
    <path d="M110 42L115 45L110 48V42Z" fill="white" />
  </svg>
);

interface Car {
  id: number;
  name: string;
  price: string;
  externalImg: string;
  internalImg: string;
  description: string;
  brand: string;
  category: 'car' | 'motorcycle';
  gallery?: string[];
  colors?: { name: string; hex: string; img: string }[]; // <-- ADICIONE ESTA LINHA
}

const CAR_DATA: Car[] = [
  { 
    id: 1, 
    brand: "Honda", 
    category: 'car', 
    name: "Honda Civic Advanced Hybrid", 
    price: "$30,595", 
    externalImg: "https://www.honda.com.br/automoveis/sites/hab/files/2025-07/Civic_Hibrido_Banner_Desktop.webp", 
    internalImg: "https://www.honda.com.br/automoveis/sites/hab/files/2025-07/33_Painel_Geral_V5_150_1.webp", 
    description: "A new design, sporty, elegant and refined with striking lines. The New Civic Hybrid brings sophistication and modernity to every detail.",
    colors: [
      { name: "Crystal Black", hex: "#000000", img: "https://www.honda.com.br/automoveis/sites/hab/files/2025-07/45_Ambientada_02_150.webp" },
      { name: "Platinum White", hex: "#FFFFFF", img: "https://www.honda.com.br/automoveis/sites/hab/files/2025-07/Civic_Hibrido_Banner_Desktop.webp" }
    ],
    gallery: [ "https://www.honda.com.br/automoveis/sites/hab/files/2025-07/37_Multi_Multimidia_Tela_Androidtimidia8_V5_150.webp" ]
  },
  { 
    id: 9, 
    brand: "Porsche", 
    category: 'car', 
    name: "718 Cayman", 
    price: "$68,300", 
    externalImg: "https://a.storyblok.com/f/322327/2616x1473/80e0ec1da5/cm21n3box0002-1-718-cayman-driving.jpg/m/1800x1012/smart/filters:format(webp)", 
    internalImg: "https://a.storyblok.com/f/322327/820x1300/bacea715b7/cm24n3bid0001-02-718-cayman-interior.jpg/m/530x636/smart/filters:format(webp)", 
    description: "The 718 Cayman is the mid-engine sports car that defines precision. Perfect balance and unmistakable Porsche DNA.",
    colors: [
      { name: "Guards Red", hex: "#D30000", img: "https://a.storyblok.com/f/322327/2616x1473/80e0ec1da5/cm21n3box0002-1-718-cayman-driving.jpg" },
      { name: "Racing Yellow", hex: "#FFD700", img: "https://a.storyblok.com/f/322327/1700x1300/7e1130e75f/bx24i3cid0014-01-718-cayman-sportschronopackage.jpg" }
    ],
    gallery: [ "https://a.storyblok.com/f/322327/1700x1300/7e1130e75f/bx24i3cid0014-01-718-cayman-sportschronopackage.jpg" ]
  },
  { 
    id: 10, 
    brand: "Honda", 
    category: 'car', 
    name: "Honda Civic SEDAN", 
    price: "$77,900", 
    externalImg: "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2026/civic-sedan/Full-Gallery-OP/Exterior/Modal/2026-honda-civic-sedan-sport-meteorite-gray-metallic-rear-02.jpg", 
    internalImg: "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2026/civic-sedan/Full-Gallery-OP/Interior/Modal/2026-honda-civic-sedan-sport-touring-hybrid-dashboard-city-skyline-01.jpg", 
    description: "The sporty Civic Sedan blends efficiency and excitement with powerful hybrid performance.",
    colors: [
      { name: "Meteorite Gray", hex: "#424242", img: "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2026/civic-sedan/Full-Gallery-OP/Exterior/Modal/2026-honda-civic-sedan-sport-meteorite-gray-metallic-rear-02.jpg" },
      { name: "Crystal Red", hex: "#e91111", img: "https://dealerinspire-image-library-prod.s3.us-east-1.amazonaws.com/images/Nla1yxqbeUfzwk2n5OhHEGqTdlZwJRNwjRrhzBrD.jpg" }
    ],
    gallery: ["https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2026/civic-sedan/Full-Gallery-OP/Interior/Modal/2026-honda-civic-sedan-sport-touring-hybrid-interior-seats-dashboard-03.jpg"]
  },
  { 
    id: 7, 
    brand: "Honda", 
    category: 'motorcycle', 
    name: "Honda Forza 750", 
    price: "$13,500", 
    externalImg: "https://www.honda.co.uk/content/dam/central/motorcycles/scooters/forza-750-2025/overview/gallery-2/honda-forza750-gallery-01-1728x972-desktop.jpg/jcr:content/renditions/c4_r.jpg", 
    internalImg: "https://www.honda.co.uk/content/dam/central/motorcycles/scooters/forza-750-2025/overview/gallery/honda-forza750-gallery-06-1728x972-desktop.jpg/jcr:content/renditions/c4_r.jpg", 
    description: "The ultimate GT scooter experience. Sophisticated, powerful and versatile.",
    colors: [
      { name: "Mat Ballistic Black", hex: "#1A1A1A", img: "https://motociclismoonline.com.br/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/08/2024-honda-forza-750-black-1-1000x667-1.jpg.webp" },
      { name: "Iridium Gray", hex: "#7D7D7D", img: "https://www.honda.co.uk/content/dam/central/motorcycles/scooters/forza-750-2025/overview/gallery-2/honda-forza750-gallery-04-1728x972-desktop.jpg/jcr:content/renditions/c4_r.jpg" }
    ],
    gallery: ["https://www.honda.co.uk/content/dam/central/motorcycles/scooters/forza-750-2025/overview/gallery/honda-forza750-gallery-03-1728x972-desktop.jpg"]
  },
  { 
    id: 8, 
    brand: "Honda", 
    category: 'motorcycle', 
    name: "CB500 Hornet", 
    price: "$5,899", 
    externalImg: "https://powersports.honda.com/motorcycle/standard/cb500f/2026/-/media/products/family/cb500f/family-features/media-square/2025/2025-cb500f-unique-styling-992x992.jpg", 
    internalImg: "https://powersports.honda.com/motorcycle/standard/cb500f/2026/-/media/products/family/cb500f/family-features/media-square/2025/2025-cb500f-inverted-showa-sff-bp-fork-992x992.jpg", 
    description: "High performance on any terrain with the new CB500 Hornet.",
    colors: [
      { name: "Grand Prix Red", hex: "#FF0000", img: "https://powersports.honda.com/motorcycle/standard/cb500f/2026/-/media/products/family/cb500f/family-features/media-square/2025/2025-cb500f-unique-styling-992x992.jpg" }
    ],
    gallery: ["https://powersports.honda.com/motorcycle/standard/cb500f/2026/-/media/products/family/cb500f/family-features/media-square/2025/2025-cb500f-slipper-clutch-992x992.jpg"]
  }, 
  { 
    id: 11, // Mudei para 11 para não repetir o 8
    brand: "Honda", 
    category: 'motorcycle', 
    name: "CBR650R E-Clutch", 
    price: "$9,199", 
    externalImg: "https://powersports.honda.com/motorcycle/sport/-/media/products/family/cbr650r/family-gallery/expanded/2026/2026-cbr650r-gallery-02.jpg", 
    internalImg: "https://powersports.honda.com/motorcycle/sport/-/media/products/family/cbr650r/family-gallery/expanded/2026/2026-cbr650r-gallery-01.jpg", 
    description: "Supersport soul with the innovative Honda E-Clutch for stall-free confidence.",
    colors: [
      { name: "Grand Prix Red", hex: "#FF0000", img: "https://powersports.honda.com/motorcycle/sport/-/media/products/family/cbr650r/family-gallery/expanded/2026/2026-cbr650r-gallery-02.jpg" },
      { name: "Matte Black Metallic", hex: "#1A1A1A", img: "https://powersports.honda.com/motorcycle/sport/-/media/products/family/cbr650r/family-gallery/expanded/2026/2026-cbr650r-gallery-01.jpg" }
    ]
  }
];

export default function App() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [activeImg, setActiveImg] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState<'all' | 'car' | 'motorcycle'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (selectedCar) setActiveImg(selectedCar.externalImg);
  }, [selectedCar]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredVehicles = CAR_DATA.filter(v => {
    const matchesFilter = filter === 'all' || v.category === filter;
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleWhatsApp = (carName: string) => {
    const url = `https://wa.me/5511986022554?text=Olá! Tenho interesse no ${carName}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-red-600 selection:text-white">
      
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-zinc-950/90 backdrop-blur-lg py-4 border-b border-zinc-800' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-1 group cursor-pointer">
            <CarLogoIcon size={70} />
            <h1 className="text-2xl font-black tracking-tighter text-white italic -ml-1">
              BEST<span className="text-red-600">CAR</span>
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            <a href="#home" className="hover:text-red-500 transition">Home</a>
            <a href="#inventory" className="hover:text-red-500 transition">Inventory</a>
            <button onClick={() => setIsContactOpen(true)} className="bg-red-600 px-6 py-2 rounded-full hover:bg-red-700 transition">Contact Us</button>
          </nav>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}><Menu size={28} /></button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="fixed inset-0 bg-zinc-900 z-50 p-8 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button className="absolute top-8 right-8" onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black italic text-white uppercase">HOME</a>
            <a href="#inventory" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black italic text-white uppercase">INVENTORY</a>
            <button onClick={() => {setIsMenuOpen(false); setIsContactOpen(true)}} className="text-4xl font-black text-red-600 italic uppercase">CONTACT</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover opacity-30 grayscale" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-8 uppercase text-white shadow-black drop-shadow-2xl">Drive the <br/> Extraordinary</motion.h2>
          <a href="#inventory" className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-black text-lg hover:bg-red-600 hover:text-white transition-all group shadow-xl uppercase">
            View Stock <ArrowRight className="group-hover:translate-x-2 transition" />
          </a>
        </div>
      </section>

      {/* INVENTORY */}
      <section id="inventory" className="py-32 container mx-auto px-6">
        <div className="flex flex-col gap-12 mb-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="text-5xl font-black italic tracking-tighter uppercase text-white">Our Inventory</h3>
              <p className="text-zinc-500 mt-2 font-medium uppercase tracking-widest text-[10px]">Machines for high performance lovers.</p>
            </div>
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition" size={18} />
              <input 
                type="text" placeholder="Search model..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-1 focus:ring-red-600 transition text-sm font-medium text-white"
              />
            </div>
          </div>
          <div className="flex bg-zinc-900 p-1 rounded-2xl border border-zinc-800 w-fit self-center md:self-start">
            {(['all', 'car', 'motorcycle'] as const).map((type) => (
              <button key={type} onClick={() => setFilter(type)}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === type ? 'bg-red-600 text-white shadow-lg shadow-red-900/40' : 'text-zinc-500 hover:text-white'}`}>
                {type === 'all' ? 'All' : type + 's'}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode='popLayout'>
            {filteredVehicles.map((car) => (
              <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={car.id} 
                whileHover={{ y: -12 }} onClick={() => setSelectedCar(car)}
                className="bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-800 cursor-pointer group shadow-2xl">
                <div className="h-72 overflow-hidden relative">
                  <img src={car.externalImg} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={car.name} />
                  <span className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">{car.category}</span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black uppercase italic tracking-tight text-white">{car.name}</h3>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-red-600 font-mono text-2xl font-bold">{car.price}</span>
                    <div className="bg-zinc-800 p-3 rounded-full group-hover:bg-red-600 transition-colors shadow-lg"><ChevronRight /></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-900 border-t border-zinc-800 py-20 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-left">
          <div className="col-span-1">
            <div className="flex items-center justify-center md:justify-start gap-1 mb-6">
              <CarLogoIcon size={50} />
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                BEST<span className="text-red-600">CAR</span>
              </h1>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed uppercase font-medium">Machines for high performance lovers. <br/> The best selection in São Paulo.</p>
          </div>
          <div className="flex flex-col gap-4 text-zinc-400 text-sm">
            <h5 className="font-black text-white uppercase tracking-widest text-xs mb-2">Social Media</h5>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://www.instagram.com/devemdev" target="_blank" rel="noopener noreferrer" className="bg-zinc-800 p-3 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-lg text-white"><Instagram size={18} /></a>
              <a href="#" className="bg-zinc-800 p-3 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-lg text-white"><Facebook size={18} /></a>
            </div>
          </div>
          <div className="text-zinc-400 text-sm">
            <h5 className="font-black text-white uppercase tracking-widest text-xs mb-4">Location</h5>
            <p className="italic font-bold text-zinc-300">São Paulo, SP - Brazil</p>
            <p className="text-xs text-zinc-500 mt-2">Available for worldwide delivery.</p>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-black text-white uppercase tracking-widest text-xs mb-4">Newsletter</h5>
            <div className="flex gap-2">
              <input type="text" placeholder="Your e-mail" className="bg-zinc-800 border-none rounded-xl px-4 py-2 text-xs outline-none focus:ring-1 focus:ring-red-600 w-full text-white" />
              <button className="bg-zinc-100 text-black p-2 rounded-xl hover:bg-red-600 hover:text-white transition"><ArrowRight size={16}/></button>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-20 pt-10 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6 text-white">
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">© {new Date().getFullYear()} BEST CAR AGENCY - ALL RIGHTS RESERVED</p>
          <div className="flex items-center gap-3 group">
            <span className="text-zinc-500 text-[9px] uppercase font-black tracking-widest">Powered by</span>
            <div className="flex flex-col items-end leading-none text-right">
              <span className="text-red-600 font-black italic text-lg tracking-tighter group-hover:text-white transition-colors duration-500 uppercase">ÉRIK MARTINS</span>
              <span className="text-zinc-500 text-[8px] font-bold tracking-widest uppercase">Developer Erik Martins</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL DETALHES - COM SELETOR DE CORES DINÂMICO */}
      <AnimatePresence>
        {selectedCar && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-2 md:p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} 
              className="bg-zinc-900 max-w-6xl w-full max-h-[95vh] rounded-[2rem] md:rounded-[3rem] overflow-y-auto md:overflow-hidden relative border border-zinc-800 shadow-3xl"
            >
              <button 
                onClick={() => setSelectedCar(null)} 
                className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-black/60 rounded-full hover:bg-red-600 transition z-[60] text-white shadow-lg"
              >
                <X size={20}/>
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* LADO ESQUERDO: SHOWROOM */}
                <div className="flex flex-col bg-black w-full">
                  <div className="h-[250px] sm:h-[350px] md:h-[500px] overflow-hidden relative flex items-center justify-center bg-black">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activeImg} src={activeImg} 
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-contain p-4" alt="Main Display" 
                      />
                    </AnimatePresence>
                  </div>
                  
                  <div className="p-4 flex gap-3 overflow-x-auto bg-zinc-900/50 border-t border-zinc-800 scrollbar-hide">
                    {[selectedCar.externalImg, selectedCar.internalImg, ...(selectedCar.gallery || [])].map((img, idx) => (
                      <button 
                        key={idx} onClick={() => setActiveImg(img)}
                        className={`w-20 h-14 md:w-24 md:h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImg === img ? 'border-red-600 scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
                      >
                        <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* LADO DIREITO: INFO & CUSTOMIZAÇÃO */}
                <div className="p-8 md:p-16 flex flex-col justify-center bg-zinc-900">
                  <div className="mb-6 md:mb-8">
                    <span className="text-red-600 font-black tracking-widest text-xs uppercase italic">{selectedCar.brand}</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-3 md:mb-4 italic uppercase tracking-tighter leading-tight text-white">{selectedCar.name}</h2>
                    <div className="h-1.5 w-16 bg-red-600 rounded-full"></div>
                  </div>
                  
                  <p className="text-zinc-400 text-base md:text-lg mb-8 font-light leading-relaxed italic text-white">"{selectedCar.description}"</p>

                  {/* NOVO: SELETOR DE CORES */}
                  {selectedCar.colors && (
                    <div className="mb-10 bg-black/20 p-6 rounded-3xl border border-zinc-800/50">
                      <p className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.2em] mb-4">Available Colors</p>
                      <div className="flex gap-4">
                        {selectedCar.colors.map((color, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImg(color.img)}
                            className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                              activeImg === color.img ? 'border-red-600 scale-110 shadow-[0_0_20px_rgba(230,57,70,0.3)]' : 'border-zinc-700 hover:border-zinc-500'
                            }`}
                          >
                            <div className="w-7 h-7 rounded-full shadow-inner" style={{ backgroundColor: color.hex }} />
                          </button>
                        ))}
                      </div>
                      <p className="text-white text-xs mt-4 font-bold uppercase italic tracking-tighter opacity-80">
                        {selectedCar.colors.find(c => c.img === activeImg)?.name || "Default Edition"}
                      </p>
                    </div>
                  )}

                  <div className="text-4xl md:text-5xl font-mono mb-8 md:mb-12 text-white font-bold tracking-tight">{selectedCar.price}</div>
                  
                  <button onClick={() => handleWhatsApp(selectedCar.name)} className="bg-green-600 hover:bg-green-700 h-16 md:h-18 rounded-2xl font-black text-lg md:text-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl text-white uppercase">
                    <MessageCircle /> Book Test Drive
                  </button>
                  <p className="mt-6 text-center text-zinc-600 text-[10px] uppercase font-black tracking-widest">Available in São Paulo, SP</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL CONTATO */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-red-600/10 backdrop-blur-2xl z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-zinc-900 p-12 rounded-[3.5rem] w-full max-w-lg border border-zinc-800 shadow-3xl">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Get in Touch</h3>
                <button onClick={() => setIsContactOpen(false)} className="text-zinc-500 hover:text-white transition"><X size={24}/></button>
              </div>
              <div className="space-y-5">
                <input type="text" placeholder="Full Name" className="w-full bg-zinc-800 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-red-600 transition font-medium text-white" />
                <input type="email" placeholder="E-mail" className="w-full bg-zinc-800 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-red-600 transition font-medium text-white" />
                <textarea placeholder="How can we help you?" rows={4} className="w-full bg-zinc-800 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-red-600 resize-none transition font-medium text-white"></textarea>
                <button className="w-full bg-red-600 py-5 rounded-2xl font-black hover:bg-red-700 transition shadow-xl text-lg uppercase tracking-widest text-white">Send Message</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}