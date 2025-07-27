import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Star, Phone, Mail, Globe, User, Filter, ChevronDown, Award, Clock, Shield, Users, Map, ArrowRight, CheckCircle, Scale, Gavel, BookOpen, Zap, TrendingUp, Target, Sparkles, ChevronRight, Play } from 'lucide-react';
import { lawyers } from './data/lawyers';
import { Lawyer } from './types/lawyer';
import { LazyImage } from './components/LazyImage';
import { SEOHead } from './components/SEOHead';
import { SchemaMarkup } from './components/SchemaMarkup';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Animated counter for stats
  const [statsVisible, setStatsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ lawyers: 0, cases: 0, satisfaction: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const statsElement = document.getElementById('stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (statsVisible) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setAnimatedStats({
          lawyers: Math.floor(lawyers.length * progress),
          cases: Math.floor(5000 * progress),
          satisfaction: Math.floor(98 * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [statsVisible]);

  // Testimonials rotation
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      text: "Found the perfect corporate lawyer in minutes. The platform made it so easy to compare attorneys and read reviews.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Individual Client",
      text: "Excellent service! Connected with a family law attorney who helped me through a difficult divorce. Highly recommend.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Startup Founder",
      text: "The intellectual property lawyers here are top-notch. Got exactly the legal help I needed for my tech startup.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Get unique practice areas, states, and cities
  const practiceAreas = useMemo(() => {
    const areas = new Set<string>();
    lawyers.forEach(lawyer => {
      lawyer.practiceAreas.forEach(area => areas.add(area));
    });
    return Array.from(areas).sort();
  }, []);

  const states = useMemo(() => {
    const stateSet = new Set<string>();
    lawyers.forEach(lawyer => {
      const state = lawyer.location.split(',')[1]?.trim();
      if (state) stateSet.add(state);
    });
    return Array.from(stateSet).sort();
  }, []);

  const cities = useMemo(() => {
    const citySet = new Set<string>();
    lawyers.forEach(lawyer => {
      const city = lawyer.location.split(',')[0]?.trim();
      if (city) citySet.add(city);
    });
    return Array.from(citySet).sort();
  }, []);

  // Filter lawyers based on current selections
  const filteredLawyers = useMemo(() => {
    return lawyers.filter(lawyer => {
      const matchesSearch = searchTerm === '' || 
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.practiceAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase())) ||
        lawyer.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPracticeArea = selectedPracticeArea === '' || 
        lawyer.practiceAreas.includes(selectedPracticeArea);
      
      const matchesState = selectedState === '' || 
        lawyer.location.includes(selectedState);
      
      const matchesCity = selectedCity === '' || 
        lawyer.location.includes(selectedCity);

      return matchesSearch && matchesPracticeArea && matchesState && matchesCity;
    });
  }, [searchTerm, selectedPracticeArea, selectedState, selectedCity]);

  const handleSearch = () => {
    setShowResults(true);
  };

  const handlePracticeAreaClick = (area: string) => {
    setSelectedPracticeArea(area);
    setSelectedState('');
    setSelectedCity('');
    setSearchTerm('');
    setShowResults(true);
  };

  const handleStateClick = (state: string) => {
    setSelectedState(state);
    setSelectedPracticeArea('');
    setSelectedCity('');
    setSearchTerm('');
    setShowResults(true);
  };

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    setSelectedPracticeArea('');
    setSelectedState('');
    setSearchTerm('');
    setShowResults(true);
  };

  const clearFilters = () => {
    setSelectedPracticeArea('');
    setSelectedState('');
    setSelectedCity('');
    setSearchTerm('');
    setShowResults(false);
  };

  const LawyerCard = ({ lawyer }: { lawyer: Lawyer }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <LazyImage
            src={lawyer.image || 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg'}
            alt={lawyer.name}
            className="w-20 h-20 rounded-xl object-cover"
            priority={false}
          />
          {lawyer.verified && (
            <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {lawyer.name}
              </h3>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(lawyer.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600 font-medium">
                    {lawyer.rating} ({lawyer.reviews} reviews)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                <span className="text-sm font-medium">{lawyer.location}</span>
                <Clock className="h-4 w-4 ml-4 mr-1 text-green-500" />
                <span className="text-sm font-medium">{lawyer.experience} years exp.</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {lawyer.practiceAreas.slice(0, 3).map((area, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 text-xs rounded-full font-medium border border-blue-200"
                  >
                    {area}
                  </span>
                ))}
                {lawyer.practiceAreas.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                    +{lawyer.practiceAreas.length - 3} more
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 text-sm line-clamp-2 mb-4">{lawyer.about}</p>
              
              <div className="flex items-center space-x-4">
                <a
                  href={`tel:${lawyer.phone}`}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors group-hover:shadow-lg"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
                <a
                  href={`mailto:${lawyer.email}`}
                  className="flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 text-sm font-medium transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </a>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                lawyer.availability === 'Available' 
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : lawyer.availability === 'Limited'
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {lawyer.availability}
              </div>
              {lawyer.hourlyRate && (
                <div className="text-sm font-semibold text-gray-900 mt-2">{lawyer.hourlyRate}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <SEOHead type="homepage" />
      <SchemaMarkup type="homepage" lawyers={lawyers} />
      
      {/* Creative Header with Gradient */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-2 rounded-xl mr-3">
                  <Scale className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Attorneys-deets</h1>
                  <p className="text-blue-200 text-sm">Legal Excellence Directory</p>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={clearFilters} className="text-blue-100 hover:text-white font-medium transition-colors">
                Find Lawyers
              </button>
              <a href="#" className="text-blue-100 hover:text-white font-medium transition-colors">Legal Resources</a>
              <a href="#" className="text-blue-100 hover:text-white font-medium transition-colors">About</a>
              <button className="bg-white text-blue-900 px-6 py-2 rounded-full hover:bg-blue-50 font-bold transition-all hover:shadow-lg">
                For Lawyers
              </button>
            </nav>
          </div>
        </div>
      </header>

      {!showResults ? (
        <>
          {/* Creative Hero Section with Animation */}
          <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
              <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="mb-8">
                <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-6 py-2 mb-6">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-300" />
                  <span className="text-sm font-medium">Trusted by 50,000+ clients</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Find Your
                  <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Perfect Lawyer
                  </span>
                </h2>
                
                <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Connect with top-rated attorneys across all practice areas. 
                  <span className="block mt-2 font-semibold">Get expert legal help in minutes, not days.</span>
                </p>
              </div>
              
              {/* Enhanced Search Bar */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 backdrop-blur-sm">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="relative group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Legal Issue</label>
                      <input
                        type="text"
                        placeholder="What do you need help with?"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg group-hover:border-blue-300 transition-colors"
                      />
                      <Search className="absolute right-4 top-12 h-5 w-5 text-gray-400" />
                    </div>
                    
                    <div className="relative group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Practice Area</label>
                      <select
                        value={selectedPracticeArea}
                        onChange={(e) => setSelectedPracticeArea(e.target.value)}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg appearance-none bg-white group-hover:border-blue-300 transition-colors"
                      >
                        <option value="">All Practice Areas</option>
                        {practiceAreas.map(area => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-12 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                    
                    <div className="relative group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        placeholder="City, State"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg group-hover:border-blue-300 transition-colors"
                      />
                      <MapPin className="absolute right-4 top-12 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-center">
                      <Search className="h-6 w-6 mr-3" />
                      Find My Lawyer Now
                      <ArrowRight className="h-6 w-6 ml-3" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Animated Stats Section */}
          <section id="stats-section" className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {animatedStats.lawyers.toLocaleString()}+
                  </div>
                  <div className="text-gray-600 font-medium">Verified Attorneys</div>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {animatedStats.cases.toLocaleString()}+
                  </div>
                  <div className="text-gray-600 font-medium">Cases Resolved</div>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {animatedStats.satisfaction}%
                  </div>
                  <div className="text-gray-600 font-medium">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </section>

          {/* Creative Browse Sections */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Practice Areas with Creative Cards */}
              <div className="mb-20">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center bg-blue-100 rounded-full px-6 py-2 mb-4">
                    <Gavel className="h-5 w-5 mr-2 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">PRACTICE AREAS</span>
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-4">Browse by Legal Specialty</h3>
                  <p className="text-xl text-gray-600">Find attorneys who specialize in your specific legal needs</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {practiceAreas.slice(0, 18).map((area, index) => {
                    const lawyerCount = lawyers.filter(lawyer => 
                      lawyer.practiceAreas.includes(area)
                    ).length;
                    
                    return (
                      <button
                        key={area}
                        onClick={() => handlePracticeAreaClick(area)}
                        className="group relative p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 text-left hover:-translate-y-2"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="h-5 w-5 text-blue-600" />
                        </div>
                        
                        <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-700 transition-colors">
                          <Gavel className="h-6 w-6 text-white" />
                        </div>
                        
                        <div className="font-bold text-gray-900 text-sm mb-2 group-hover:text-blue-600 transition-colors">
                          {area}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                          {lawyerCount} attorney{lawyerCount !== 1 ? 's' : ''}
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity"></div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* States Section */}
              <div className="mb-20">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center bg-green-100 rounded-full px-6 py-2 mb-4">
                    <Map className="h-5 w-5 mr-2 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">BY STATE</span>
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-4">Find Lawyers by State</h3>
                  <p className="text-xl text-gray-600">Connect with attorneys licensed in your state</p>
                </div>
                
                <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                  {states.map((state, index) => {
                    const lawyerCount = lawyers.filter(lawyer => 
                      lawyer.location.includes(state)
                    ).length;
                    
                    return (
                      <button
                        key={state}
                        onClick={() => handleStateClick(state)}
                        className="group p-4 bg-gradient-to-br from-white to-green-50 rounded-xl border-2 border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 text-center hover:-translate-y-1"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="bg-green-600 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-green-700 transition-colors">
                          <Map className="h-5 w-5 text-white" />
                        </div>
                        <div className="font-bold text-gray-900 text-sm mb-1 group-hover:text-green-600 transition-colors">
                          {state}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                          {lawyerCount}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cities Section */}
              <div className="mb-20">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center bg-purple-100 rounded-full px-6 py-2 mb-4">
                    <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-800">BY CITY</span>
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-4">Find Lawyers by City</h3>
                  <p className="text-xl text-gray-600">Locate attorneys in major metropolitan areas</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {cities.slice(0, 20).map((city, index) => {
                    const lawyerCount = lawyers.filter(lawyer => 
                      lawyer.location.includes(city)
                    ).length;
                    
                    return (
                      <button
                        key={city}
                        onClick={() => handleCityClick(city)}
                        className="group p-6 bg-gradient-to-br from-white to-purple-50 rounded-2xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-2"
                        style={{ animationDelay: `${index * 75}ms` }}
                      >
                        <div className="bg-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-700 transition-colors">
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <div className="font-bold text-gray-900 text-sm mb-2 group-hover:text-purple-600 transition-colors">
                          {city}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                          {lawyerCount} attorney{lawyerCount !== 1 ? 's' : ''}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Carousel */}
          <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-6 py-2 mb-4">
                  <Star className="h-5 w-5 mr-2 text-yellow-300" />
                  <span className="text-sm font-semibold">CLIENT TESTIMONIALS</span>
                </div>
                <h3 className="text-4xl font-bold mb-4">What Our Clients Say</h3>
                <p className="text-xl text-blue-100">Real experiences from real people</p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-yellow-300 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
                      "{testimonials[currentTestimonial].text}"
                    </blockquote>
                    
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="font-bold text-lg">{testimonials[currentTestimonial].name}</div>
                        <div className="text-blue-200">{testimonials[currentTestimonial].role}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-8 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentTestimonial ? 'bg-white' : 'bg-white bg-opacity-30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Why Choose Us */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center bg-blue-100 rounded-full px-6 py-2 mb-4">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">WHY CHOOSE US</span>
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-4">The Smart Way to Find Legal Help</h3>
                <p className="text-xl text-gray-600">We make finding the right attorney simple, fast, and reliable</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">100% Verified</h4>
                  <p className="text-gray-600 leading-relaxed">Every attorney is thoroughly vetted, licensed, and verified for your peace of mind and protection.</p>
                </div>
                
                <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Instant Connection</h4>
                  <p className="text-gray-600 leading-relaxed">Connect with qualified attorneys in minutes, not days. Get the legal help you need right away.</p>
                </div>
                
                <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Star className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Proven Results</h4>
                  <p className="text-gray-600 leading-relaxed">Read authentic reviews and ratings from real clients to make informed decisions about your legal representation.</p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Enhanced Results Section */
        <section className="py-12 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {filteredLawyers.length} Attorney{filteredLawyers.length !== 1 ? 's' : ''} Found
                    {selectedPracticeArea && (
                      <span className="block text-lg font-normal text-blue-600 mt-1">
                        specializing in {selectedPracticeArea}
                      </span>
                    )}
                    {selectedState && (
                      <span className="block text-lg font-normal text-green-600 mt-1">
                        licensed in {selectedState}
                      </span>
                    )}
                    {selectedCity && (
                      <span className="block text-lg font-normal text-purple-600 mt-1">
                        practicing in {selectedCity}
                      </span>
                    )}
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium mt-3 group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Back to Search
                  </button>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-2">Sorted by relevance</div>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>Best Match</option>
                    <option>Highest Rated</option>
                    <option>Most Reviews</option>
                    <option>Years of Experience</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {filteredLawyers.map(lawyer => (
                <LawyerCard key={lawyer.id} lawyer={lawyer} />
              ))}
            </div>
            
            {filteredLawyers.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No attorneys found</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  We couldn't find any attorneys matching your criteria. Try adjusting your search.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-bold shadow-lg hover:shadow-xl"
                >
                  Start New Search
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Creative Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-white bg-opacity-20 p-2 rounded-xl mr-3">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Attorneys-deets</h4>
                  <p className="text-blue-200 text-sm">Legal Excellence Directory</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Your trusted partner in finding exceptional legal representation. 
                Connect with verified attorneys who deliver results.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-blue-200">For Clients</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Find a Lawyer
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Legal Resources
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Ask a Question
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Legal Forms
                </a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-green-200">For Lawyers</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Join Our Directory
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Marketing Solutions
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Success Stories
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Support Center
                </a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-purple-200">Company</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  About Us
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Contact
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Privacy Policy
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Terms of Service
                </a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white border-opacity-20 pt-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex space-x-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors cursor-pointer">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors cursor-pointer">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors cursor-pointer">
                  <Phone className="h-5 w-5" />
                </div>
              </div>
            </div>
            <p className="text-gray-300">
              &copy; 2024 Attorneys-deets. All rights reserved. | 
              <span className="text-blue-200"> Connecting clients with exceptional legal representation.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;