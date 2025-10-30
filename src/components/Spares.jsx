import React, { useEffect, useMemo, useState, useRef } from "react";

export default function AutoSpareZone() {
  const PHONE = "919663523386"; // Updated WhatsApp number
  const CALL_NUMBER = "918861420201"; // Added call number
  
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  
  // Refs for carousels
  const heroCarouselRef = useRef(null);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Professional data structure with direct images for each car
  const carBrands = useMemo(
    () => [
      {
        id: "maruti-swift",
        name: "Maruti Suzuki Swift",
        category: "Hatchback",
        image: "https://images.unsplash.com/photo-1663852408695-f57f4d75a536?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3dpZnQlMjBjYXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        rating: 4.5,
        reviewCount: 128,
        spares: [
          { id: "swift-brake", name: "Brake Pads", description: "High-performance brake pads for all models" },
          { id: "swift-oil", name: "Oil Filter", description: "Genuine oil filter for optimal engine performance" },
          { id: "swift-clutch", name: "Clutch Plate", description: "Durable clutch plate for smooth gear shifts" },
          { id: "swift-ac", name: "AC Compressor", description: "Efficient AC compressor for cooling system" },
          { id: "swift-lights", name: "Headlights", description: "Bright LED headlights for better visibility" }
        ]
      },
       {
        id: "maruti-800",
        name: "Maruti Suzuki 800",
        category: "Hatchback",
        image: "https://images.unsplash.com/photo-1746968578004-8f7a566e87fd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHN1enVraSUyMDgwMHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        rating: 4.5,
        reviewCount: 128,
        spares: [
          { id: "swift-brake", name: "Brake Pads", description: "High-performance brake pads for all models" },
          { id: "swift-oil", name: "Oil Filter", description: "Genuine oil filter for optimal engine performance" },
          { id: "swift-clutch", name: "Clutch Plate", description: "Durable clutch plate for smooth gear shifts" },
          { id: "swift-ac", name: "AC Compressor", description: "Efficient AC compressor for cooling system" },
          { id: "swift-lights", name: "Headlights", description: "Bright LED headlights for better visibility" }
        ]
      },
       {
        id: "zen",
        name: "Zen",
        category: "Hatchback",
        image: "https://i.pinimg.com/736x/86/a3/2a/86a32a68df6d3cab9cddc0794c44324f.jpg",
        rating: 4.5,
        reviewCount: 128,
        spares: [
          { id: "swift-brake", name: "Brake Pads", description: "High-performance brake pads for all models" },
          { id: "swift-oil", name: "Oil Filter", description: "Genuine oil filter for optimal engine performance" },
          { id: "swift-clutch", name: "Clutch Plate", description: "Durable clutch plate for smooth gear shifts" },
          { id: "swift-ac", name: "AC Compressor", description: "Efficient AC compressor for cooling system" },
          { id: "swift-lights", name: "Headlights", description: "Bright LED headlights for better visibility" }
        ]
      },
       {
        id: "alto",
        name: "Alto",
        category: "Hatchback",
        image: "data:image/jpeg;base64,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",
        rating: 4.5,
        reviewCount: 128,
        spares: [
          { id: "swift-brake", name: "Brake Pads", description: "High-performance brake pads for all models" },
          { id: "swift-oil", name: "Oil Filter", description: "Genuine oil filter for optimal engine performance" },
          { id: "swift-clutch", name: "Clutch Plate", description: "Durable clutch plate for smooth gear shifts" },
          { id: "swift-ac", name: "AC Compressor", description: "Efficient AC compressor for cooling system" },
          { id: "swift-lights", name: "Headlights", description: "Bright LED headlights for better visibility" }
        ]
      },
       {
        id: "i-10|1-20",
        name: "i-10 and 1-20",
        category: "Hatchback",
        image: "https://plus.unsplash.com/premium_photo-1686730540277-c7e3a5571553?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        rating: 4.5,
        reviewCount: 128,
        spares: [
          { id: "swift-brake", name: "Brake Pads", description: "High-performance brake pads for all models" },
          { id: "swift-oil", name: "Oil Filter", description: "Genuine oil filter for optimal engine performance" },
          { id: "swift-clutch", name: "Clutch Plate", description: "Durable clutch plate for smooth gear shifts" },
          { id: "swift-ac", name: "AC Compressor", description: "Efficient AC compressor for cooling system" },
          { id: "swift-lights", name: "Headlights", description: "Bright LED headlights for better visibility" }
        ]
      },
      {
        id: "tata-nexon",
        name: "Tata Nexon",
        category: "SUV",
        image: "https://images.news18.com/ibnlive/uploads/2021/07/1625838586_tata-nexon-dark-edition-10.png",
        rating: 4.7,
        reviewCount: 95,
        spares: [
          { id: "nexon-suspension", name: "Suspension Kit", description: "Complete suspension kit for smooth ride" },
          { id: "nexon-gearbox", name: "Gearbox", description: "Reliable gearbox for efficient power transmission" },
          { id: "nexon-bumper", name: "Bumper", description: "Sturdy bumper for front and rear protection" },
          { id: "nexon-fuel", name: "Fuel Pump", description: "High-pressure fuel pump for optimal delivery" },
          { id: "nexon-radiator", name: "Radiator", description: "Efficient radiator for engine cooling" }
        ]
      },
      {
        id: "hyundai-creta",
        name: "Hyundai Creta",
        category: "SUV",
        image: "https://plus.unsplash.com/premium_photo-1686730540277-c7e3a5571553?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        rating: 4.6,
        reviewCount: 142,
        spares: [
          { id: "creta-alternator", name: "Alternator", description: "High-output alternator for electrical systems" },
          { id: "creta-filter", name: "Air Filter", description: "Premium air filter for clean engine air" },
          { id: "creta-mount", name: "Engine Mount", description: "Durable engine mount for stability" },
          { id: "creta-belt", name: "Timing Belt", description: "Precision timing belt for engine synchronization" },
          { id: "creta-lights", name: "Tail Lights", description: "Stylish tail lights for safety and aesthetics" }
        ]
      },
      {
        id: "honda-city",
        name: "Honda City",
        category: "Sedan",
        image: "https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZGElMjBjaXR5fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        rating: 4.8,
        reviewCount: 187,
        spares: [
          { id: "city-steering", name: "Steering Pump", description: "Power steering pump for effortless driving" },
          { id: "city-exhaust", name: "Exhaust Pipe", description: "Stainless steel exhaust pipe for durability" },
          { id: "city-battery", name: "Car Battery", description: "Long-lasting battery for reliable starting" },
          { id: "city-handle", name: "Door Handle", description: "Ergonomic door handle for easy access" },
          { id: "city-mirror", name: "Mirror Set", description: "Adjustable mirror set for better visibility" }
        ]
      },
      {
        id: "mahindra-thar",
        name: "Mahindra Thar",
        category: "SUV",
        image: "https://images.unsplash.com/photo-1737355096420-da27436b1671?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGhhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        rating: 4.9,
        reviewCount: 76,
        spares: [
          { id: "thar-tyre", name: "Tyre Set", description: "All-terrain tyre set for any road condition" },
          { id: "thar-oil", name: "Engine Oil", description: "Synthetic engine oil for maximum protection" },
          { id: "thar-shock", name: "Shock Absorbers", description: "Heavy-duty shock absorbers for smooth ride" },
          { id: "thar-grill", name: "Front Grill", description: "Stylish front grill for enhanced look" },
          { id: "thar-fog", name: "Fog Lights", description: "Powerful fog lights for poor visibility conditions" }
        ]
      },
      {
        id: "toyota-innova",
        name: "Toyota Innova",
        category: "MPV",
        image: "https://images.unsplash.com/photo-1748215210939-ad8b6c8c086d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5ub3ZhfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        rating: 4.7,
        reviewCount: 112,
        spares: [
          { id: "innova-oxygen", name: "Oxygen Sensor", description: "Precision oxygen sensor for emission control" },
          { id: "innova-maf", name: "Mass Air Flow Sensor", description: "Accurate MAF sensor for fuel efficiency" },
          { id: "innova-injector", name: "Fuel Injector", description: "High-performance fuel injector for optimal delivery" },
          { id: "innova-catalytic", name: "Catalytic Converter", description: "Efficient catalytic converter for emission reduction" },
          { id: "innova-egr", name: "EGR Valve", description: "EGR valve for emission control" }
        ]
      },
      {
        id: "bmw-3series",
        name: "BMW 3 Series",
        category: "Luxury",
        image: "https://plus.unsplash.com/premium_photo-1686730540277-c7e3a5571553?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        rating: 4.8,
        reviewCount: 64,
        spares: [
          { id: "bmw-control", name: "Control Arm", description: "Precision control arm for handling" },
          { id: "bmw-strut", name: "Strut Mount", description: "Durable strut mount for suspension" },
          { id: "bmw-gasket", name: "Valve Cover Gasket", description: "High-quality valve cover gasket" },
          { id: "bmw-ignition", name: "Ignition Coil", description: "Performance ignition coil for better spark" },
          { id: "bmw-window", name: "Window Regulator", description: "Reliable window regulator for smooth operation" }
        ]
      },
      {
        id: "mercedes-cclass",
        name: "Mercedes C-Class",
        category: "Luxury",
        image: "https://plus.unsplash.com/premium_photo-1686730540277-c7e3a5571553?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        rating: 4.9,
        reviewCount: 58,
        spares: [
          { id: "merc-suspension", name: "Air Suspension Compressor", description: "Premium air suspension compressor" },
          { id: "merc-abc", name: "ABC Pump", description: "Active Body Control pump for luxury ride" },
          { id: "merc-maf", name: "Mass Airflow Sensor", description: "Precision MAF sensor for performance" },
          { id: "merc-crank", name: "Crankshaft Sensor", description: "Reliable crankshaft position sensor" },
          { id: "merc-brake", name: "Brake Caliper", description: "High-performance brake caliper" }
        ]
      }
    ],
    []
  );

  // Hero carousel slides
  const heroSlides = [
    {
      title: "Premium Auto Parts",
      subtitle: "Genuine spare parts for every vehicle",
      image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Nationwide Delivery",
      subtitle: "Fast shipping across India with tracked delivery",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
    },
    {
      title: "Trusted Quality",
      subtitle: "100% genuine parts with manufacturer warranty",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  // Categories and tabs
  const categories = useMemo(() => ["all", ...new Set(carBrands.map((c) => c.category))], [carBrands]);
  const tabs = useMemo(() => ["all", "bestSellers", "newArrivals"], []);

  // Filtering and sorting logic
  const displayedCars = useMemo(() => {
    let list = carBrands.filter((car) => 
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (category !== "all") list = list.filter((c) => c.category === category);
    
    // Tab filtering
    if (activeTab === "bestSellers") {
      list = list.filter(car => car.rating >= 4.7);
    } else if (activeTab === "newArrivals") {
      list = list.slice().reverse();
    }
    
    // Sorting
    if (sortBy === "rating") list = list.slice().sort((a, b) => b.rating - a.rating);
    if (sortBy === "az") list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
    
    return list;
  }, [carBrands, searchTerm, category, sortBy, activeTab]);

  // Simulate loading
  useEffect(() => {
    if (searchTerm || category !== "all" || activeTab !== "all") {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, category, activeTab]);

  // Hero carousel auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Subscribe simulation
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  // WhatsApp link helper
  const getWhatsAppLink = (text) => `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

  // Close modal on Esc
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedCar(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Render star rating
  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Realistic Car Wheel Spinner Component
  const CarWheelSpinner = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-24 h-24 mb-4">
        {/* Tire */}
        <div className="absolute inset-0 bg-gray-800 rounded-full flex items-center justify-center animate-spin"
             style={{ animationDuration: '1.5s' }}>
          {/* Tire tread pattern */}
          <div className="absolute inset-1 border-2 border-gray-600 rounded-full"></div>
          <div className="absolute inset-3 border-2 border-gray-600 rounded-full"></div>
          <div className="absolute inset-5 border-2 border-gray-600 rounded-full"></div>
          
          {/* Rim */}
          <div className="absolute inset-8 bg-gray-400 rounded-full flex items-center justify-center">
            {/* Center cap */}
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
            </div>
            
            {/* Spokes */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-6 bg-gray-600 rounded-full"
                style={{ transform: `rotate(${i * 72}deg) translateY(-10px)` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 font-medium">Loading car parts...</p>
    </div>
  );

  // Format phone number for display
  const formatPhoneNumber = (phone) => {
    return phone.replace(/(\d{2})(\d{5})(\d{5})/, '$1 $2 $3');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 antialiased transition-colors duration-300">
     <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white sticky top-0 z-50 shadow-2xl border-b border-gray-700/50 backdrop-blur-md">
  <div className="container mx-auto px-4 py-4 flex items-center justify-between">
    {/* Logo Section */}
    <div className="flex items-center gap-3">
      <div className="bg-gray-800 p-2 rounded-xl flex items-center justify-center shadow-inner">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1v-6a1 1 0 00-.293-.707l-4-4A1 1 0 0016 3H3z" />
        </svg>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-gray-100">
          <span className="text-teal-400">GB</span> Spares
        </h1>
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Premium Auto Parts · Chikkamagaluru
        </p>
      </div>
    </div>

    {/* Navigation + Toggles */}
    <div className="flex items-center gap-4">
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        {["Cars", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="relative group transition"
          >
            {item}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-teal-400 transition-all group-hover:w-full"></span>
          </a>
        ))}
      </nav>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          /* ☀️ Sun Icon */
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.03a1 1 0 011.42 1.41l-.7.7a1 1 0 01-1.41-1.41l.69-.7zM17 9a1 1 0 110 2h-1a1 1 0 110-2h1zM4 9a1 1 0 110 2H3a1 1 0 010-2h1zm2.05-4.97a1 1 0 010 1.41l-.7.7a1 1 0 11-1.41-1.41l.7-.7a1 1 0 011.41 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm6.36-2.64a1 1 0 00-1.41 0l-.7.7a1 1 0 101.41 1.41l.7-.7a1 1 0 000-1.41zM6.05 14.05a1 1 0 010 1.41l-.7.7a1 1 0 11-1.41-1.41l.7-.7a1 1 0 011.41 0zM10 6a4 4 0 100 8 4 4 0 000-8z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          /* 🌙 Moon Icon */
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-200" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen((s) => !s)} className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  {mobileMenuOpen && (
    <div className="md:hidden bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 py-3">
      <div className="container mx-auto px-4 flex flex-col gap-2 text-gray-300">
        <a href="#cars" className="py-2 hover:text-teal-400 transition">Cars</a>
        <a href="#about" className="py-2 hover:text-teal-400 transition">About</a>
        <a href="#contact" className="py-2 hover:text-teal-400 transition">Contact</a>
      </div>
    </div>
  )}
</header>



      {/* Hero Section with Carousel */}
      <main>
        <section className="relative h-[70vh] md:h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            {heroSlides.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
              </div>
            ))}
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-white">
                  {heroSlides[currentSlide].title}
                </h2>
                <p className="text-xl md:text-2xl mb-8 text-slate-100/90">
                  {heroSlides[currentSlide].subtitle}
                </p>
                <div className="flex gap-4 flex-wrap">
                  <a href="#cars" className="inline-block bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl transition-all transform hover:scale-105">
                    Explore Collection
                  </a>
                 
                </div>
              </div>
            </div>
          </div>
          
          {/* Carousel indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">Why Choose GB Spares?</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Experience the difference with our premium auto parts and exceptional service</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-500 transform hover:-translate-y-2 bg-white dark:bg-gray-700">
                <div className="bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">100% Genuine Parts</h3>
                <p className="text-gray-600 dark:text-gray-300">Verified parts from manufacturers and trusted suppliers, warranty included for complete peace of mind.</p>
              </div>
              <div className="group p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-500 transform hover:-translate-y-2 bg-white dark:bg-gray-700">
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Nationwide Delivery</h3>
                <p className="text-gray-600 dark:text-gray-300">Fast shipping across India with tracked delivery options. Most orders ship within 24 hours.</p>
              </div>
              <div className="group p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-500 transform hover:-translate-y-2 bg-white dark:bg-gray-700">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Expert Support</h3>
                <p className="text-gray-600 dark:text-gray-300">WhatsApp based inquiries with expert technicians. Clear refund and replacement policies.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Carousel */}
       

        {/* Cars Section */}
        <section id="cars" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">Premium Car Collection</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">Genuine spare parts for all major car brands</p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="lg:w-1/4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                  <h4 className="font-bold text-lg mb-4">Filters</h4>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
                    <input 
                      id="search" 
                      aria-label="Search car brand" 
                      value={searchTerm} 
                      onChange={(e) => setSearchTerm(e.target.value)} 
                      placeholder="Search brands..." 
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" 
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                    <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)} 
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
                    <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)} 
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      <option value="featured">Featured</option>
                      <option value="az">Name: A → Z</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                  
                  <button 
                    onClick={() => { setSearchTerm(""); setCategory("all"); setSortBy("featured"); setActiveTab("all"); }} 
                    className="w-full py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
              
              <div className="lg:w-3/4">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 font-medium text-sm ${activeTab === tab ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                      {tab === "all" && "All Parts"}
                      {tab === "bestSellers" && "Best Sellers"}
                      {tab === "newArrivals" && "New Arrivals"}
                    </button>
                  ))}
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="flex justify-center items-center h-64">
                    <CarWheelSpinner />
                  </div>
                )}

                {/* Cars Grid */}
                {!isLoading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayedCars.map((car, idx) => (
                      <article key={car.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                        <div className="relative h-56 overflow-hidden">
                          <img 
                            src={car.image} 
                            alt={`${car.name} image`} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <span className="inline-block bg-teal-600 dark:bg-teal-500 text-white text-xs px-3 py-1 rounded-full">
                              {car.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                              <div className="flex items-center gap-2">
                                {renderRating(car.rating)}
                                <span className="text-sm text-gray-500 dark:text-gray-400">({car.reviewCount})</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {car.spares.slice(0,2).map(s => s.name).join(' · ')}
                          </p>

                          <div className="flex gap-3">
                            <button 
                              onClick={() => setSelectedCar(car)} 
                              className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-3 rounded-xl transition-all transform hover:scale-105"
                            >
                              View Details
                            </button>
                            
                          </div>
                        </div>
                      </article>
                    ))}

                    {displayedCars.length === 0 && (
                      <div className="col-span-full bg-white dark:bg-gray-800 p-12 rounded-2xl text-center shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No results found</h4>
                        <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter & Contact */}
        <section id="contact" className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">Stay Connected</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">Subscribe to our newsletter for the latest updates on new parts, special offers, and industry insights.</p>
              
              <form onSubmit={handleSubscribe} className="mb-12 max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Your email address" 
                    className="flex-grow p-4 rounded-2xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" 
                    required 
                  />
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all transform hover:scale-105"
                  >
                    Subscribe
                  </button>
                </div>
              </form>

              {subscribed && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-2xl flex items-center max-w-md mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Thank you for subscribing! Check your email for confirmation.
                </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-3xl">
                <h4 className="text-xl font-bold mb-6 text-center">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm text-center">
                    <div className="bg-teal-100 dark:bg-teal-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 dark:text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="font-medium mb-1">Call Us</div>
                    <div className="text-gray-600 dark:text-gray-300">{formatPhoneNumber(CALL_NUMBER)}</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm text-center">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="font-medium mb-1">Email</div>
                    <div className="text-gray-600 dark:text-gray-300">info@gbspares.com</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm text-center">
                    <div className="bg-amber-100 dark:bg-amber-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="font-medium mb-1">Location</div>
                    <div className="text-gray-600 dark:text-gray-300">Chikkamagaluru, Karnataka</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-teal-800 to-emerald-800 dark:from-teal-900 dark:to-emerald-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white/10 p-3 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1v-6a1 1 0 00-.293-.707l-4-4A1 1 0 0016 3H3z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-teal-200">GB Spares</h3>
                </div>
                <p className="text-slate-300 mb-6">Your trusted partner for genuine automotive spare parts in Chikkamagaluru.</p>
                <div className="flex space-x-4">
                  <a href="#" className="bg-white/10 hover:bg-teal-600 w-12 h-12 rounded-full flex items-center justify-center transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-pink-600 w-12 h-12 rounded-full flex items-center justify-center transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-green-600 w-12 h-12 rounded-full flex items-center justify-center transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.99.59 3.839 1.604 5.391L1 23l6.09-1.601A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18c-1.98 0-3.803-.65-5.277-1.744l-.37-.267-3.844 1.011 1.026-3.755-.26-.36A7.95 7.95 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8zm4.8-10.8c-.2-.1-1.2-.6-1.4-.6-.2-.1-.4-.1-.5.1-.1.2-.6.7-.7.9-.1.2-.2.2-.4.1-.2-.1-.9-.3-1.7-1.1-.6-.6-1.1-1.3-1.2-1.5-.1-.2 0-.4.1-.5.1-.1.2-.2.3-.4.1-.1.1-.2.2-.4 0-.1 0-.3-.1-.4-.1-.1-.5-1.2-.7-1.6-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.7 2.7 4.2 3.7.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.2-.2-.4-.3z" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  <li><a href="#cars" className="text-slate-300 hover:text-white transition">Car Brands</a></li>
                  <li><a href="#about" className="text-slate-300 hover:text-white transition">About Us</a></li>
                  <li><a href="#" className="text-slate-300 hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="#" className="text-slate-300 hover:text-white transition">Terms & Conditions</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-6">Categories</h4>
                <ul className="space-y-3">
                  {categories.filter(c => c !== "all").map((cat) => (
                    <li key={cat}>
                      <button 
                        onClick={() => { setCategory(cat); window.scrollTo({ top: document.getElementById('cars').offsetTop - 100, behavior: 'smooth' }); }} 
                        className="text-slate-300 hover:text-white transition"
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* <div>
                <h4 className="text-xl font-bold mb-6">Business Hours</h4>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div> */}
            </div>
            
            <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
              <p>© {new Date().getFullYear()} GB Spares. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full overflow-auto max-h-[90vh] animate-fadeIn">
            <div className="relative">
              <img 
                src={selectedCar.image} 
                alt={`${selectedCar.name}`} 
                className="w-full h-64 object-cover rounded-t-3xl" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-t-3xl"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">{selectedCar.name}</h3>
                <div className="flex items-center gap-4">
                  {renderRating(selectedCar.rating)}
                  <span>({selectedCar.reviewCount} reviews)</span>
                  <span>|</span>
                  <span>{selectedCar.category}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCar(null)} 
                className="absolute top-6 right-6 bg-white/90 hover:bg-white p-3 rounded-full transition shadow-lg"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <h4 className="text-2xl font-bold mb-4">Available Parts for {selectedCar.name}</h4>
                <p className="text-lg text-green-600 dark:text-green-400 font-medium mb-6">All parts available</p>
                
                <div className="space-y-3">
                  {selectedCar.spares.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border-b border-gray-100 dark:border-gray-700">
                      <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-bold">{s.name}</h5>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{s.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <a 
                  href={getWhatsAppLink(`Hello, I'm interested in purchasing parts for my ${selectedCar.name}. Can you help me with availability and pricing?`)} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-2xl transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.99.59 3.839 1.604 5.391L1 23l6.09-1.601A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18c-1.98 0-3.803-.65-5.277-1.744l-.37-.267-3.844 1.011 1.026-3.755-.26-.36A7.95 7.95 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8zm4.8-10.8c-.2-.1-1.2-.6-1.4-.6-.2-.1-.4-.1-.5.1-.1.2-.6.7-.7.9-.1.2-.2.2-.4.1-.2-.1-.9-.3-1.7-1.1-.6-.6-1.1-1.3-1.2-1.5-.1-.2 0-.4.1-.5.1-.1.2-.2.3-.4.1-.1.1-.2.2-.4 0-.1 0-.3-.1-.4-.1-.1-.5-1.2-.7-1.6-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.7 2.7 4.2 3.7.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.2-.2-.4-.3z" />
                  </svg>
                  Contact on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Add smooth scrolling behavior */
        html {
          scroll-behavior: smooth;
        }
          @keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-x {
  background-size: 400% 400%;
  animation: gradient-x 6s ease infinite;
}

      `}</style>
    </div>
  );
}








//  Car Wheel Spinner Component
//   const CarWheelSpinner = () => (
//   <div className="flex flex-col items-center justify-center my-6">
//     <div className="w-24 h-24 mb-4 relative">
//       {/* Car wheel SVG, spins! */}
//       <svg
//         className="animate-spin"
//         viewBox="0 0 100 100"
//         width="96"
//         height="96"
//         style={{ display: 'block', margin: 'auto' }}
//       >
//         {/* Tire outline */}
//         <circle
//           cx="50"
//           cy="50"
//           r="44"
//           stroke="#333"
//           strokeWidth="8"
//           fill="#222"
//         />
//         {/* Alloy wheel rim */}
//         <circle
//           cx="50"
//           cy="50"
//           r="28"
//           stroke="#bbb"
//           strokeWidth="6"
//           fill="#e5e7eb"
//         />
//         {/* Central hub */}
//         <circle
//           cx="50"
//           cy="50"
//           r="10"
//           fill="#6b7280"
//           stroke="#555"
//           strokeWidth="3"
//         />
//         {/* Spokes */}
//         {[...Array(6)].map((_, i) => {
//           const angle = (i / 6) * Math.PI * 2;
//           const x1 = 50 + Math.cos(angle) * 10;
//           const y1 = 50 + Math.sin(angle) * 10;
//           const x2 = 50 + Math.cos(angle) * 28;
//           const y2 = 50 + Math.sin(angle) * 28;
//           return (
//             <line
//               key={i}
//               x1={x1}
//               y1={y1}
//               x2={x2}
//               y2={y2}
//               stroke="#555"
//               strokeWidth="4"
//               strokeLinecap="round"
//             />
//           );
//         })}
//         {/* Tire pattern (dots) */}
//         {[...Array(16)].map((_, i) => {
//           const angle = (i / 16) * Math.PI * 2;
//           const x = 50 + Math.cos(angle) * 44;
//           const y = 50 + Math.sin(angle) * 44;
//           return (
//             <circle
//               key={i}
//               cx={x}
//               cy={y}
//               r="2"
//               fill="#bbb"
//             />
//           );
//         })}
//       </svg>
//     </div>
//     <p className="text-gray-600 font-medium">Loading car parts...</p>
//   </div>
// );
