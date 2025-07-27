import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, Phone, Mail, Globe, User, Filter, ChevronDown, Award, Clock, Shield, Users, Map, ArrowRight, CheckCircle, Scale, Gavel, BookOpen } from 'lucide-react';
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
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <LazyImage
          src={lawyer.image || 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg'}
          alt={lawyer.name}
          className="w-20 h-20 rounded-lg object-cover"
          priority={false}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{lawyer.name}</h3>
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
                  <span className="ml-1 text-sm text-gray-600">
                    {lawyer.rating} ({lawyer.reviews} reviews)
                  </span>
                </div>
                {lawyer.verified && (
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-600 ml-1">Verified</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{lawyer.location}</span>
                <Clock className="h-4 w-4 ml-4 mr-1" />
                <span className="text-sm">{lawyer.experience} years experience</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {lawyer.practiceAreas.slice(0, 3).map((area, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {area}
                  </span>
                ))}
                {lawyer.practiceAreas.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{lawyer.practiceAreas.length - 3} more
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 text-sm line-clamp-2 mb-3">{lawyer.about}</p>
              
              <div className="flex items-center space-x-4">
                <a
                  href={`tel:${lawyer.phone}`}
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Call Now
                </a>
                <a
                  href={`mailto:${lawyer.email}`}
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </a>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                lawyer.availability === 'Available' 
                  ? 'bg-green-100 text-green-800'
                  : lawyer.availability === 'Limited'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {lawyer.availability}
              </div>
              {lawyer.hourlyRate && (
                <div className="text-sm text-gray-600 mt-2">{lawyer.hourlyRate}</div>
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
      
      {/* Header - Avvo Style */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Scale className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-900">Attorneys-deets</h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={clearFilters} className="text-gray-700 hover:text-blue-600 font-medium">Find a lawyer</button>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Legal advice</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">More</a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium">
                For lawyers
              </button>
            </nav>
          </div>
        </div>
      </header>

      {!showResults ? (
        <>
          {/* Hero Section - Avvo Style */}
          <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Find the right lawyer for you
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Get the legal help you need. Search our directory of qualified attorneys.
                </p>
                
                {/* Main Search Bar - Avvo Style */}
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="What do you need help with?"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        />
                      </div>
                      <div className="relative">
                        <select
                          value={selectedPracticeArea}
                          onChange={(e) => setSelectedPracticeArea(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg appearance-none bg-white"
                        >
                          <option value="">Practice area</option>
                          {practiceAreas.map(area => (
                            <option key={area} value={area}>{area}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="City, state"
                          value={selectedLocation}
                          onChange={(e) => setSelectedLocation(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleSearch}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                    >
                      Find lawyers
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Three Search Segments - Avvo Style */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Browse by Practice Area */}
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Browse lawyers by practice area</h3>
                  <p className="text-lg text-gray-600">Find attorneys who specialize in your legal issue</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {practiceAreas.slice(0, 18).map(area => {
                    const lawyerCount = lawyers.filter(lawyer => 
                      lawyer.practiceAreas.includes(area)
                    ).length;
                    
                    return (
                      <button
                        key={area}
                        onClick={() => handlePracticeAreaClick(area)}
                        className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left"
                      >
                        <div className="flex items-center mb-2">
                          <Gavel className="h-5 w-5 text-blue-600 mr-2" />
                        </div>
                        <div className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600">
                          {area}
                        </div>
                        <div className="text-xs text-gray-500">
                          {lawyerCount} lawyer{lawyerCount !== 1 ? 's' : ''}
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                {practiceAreas.length > 18 && (
                  <div className="text-center mt-8">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-lg flex items-center mx-auto">
                      View all practice areas
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Browse by State */}
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Find lawyers by state</h3>
                  <p className="text-lg text-gray-600">Connect with attorneys in your state</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {states.map(state => {
                    const lawyerCount = lawyers.filter(lawyer => 
                      lawyer.location.includes(state)
                    ).length;
                    
                    return (
                      <button
                        key={state}
                        onClick={() => handleStateClick(state)}
                        className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 text-center"
                      >
                        <div className="flex items-center justify-center mb-2">
                          <Map className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-green-600">
                          {state}
                        </div>
                        <div className="text-xs text-gray-500">
                          {lawyerCount} lawyer{lawyerCount !== 1 ? 's' : ''}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Browse by City */}
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Find lawyers by city</h3>
                  <p className="text-lg text-gray-600">Locate attorneys in major cities</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {cities.slice(0, 20).map(city => {
                    const lawyerCount = lawyers.filter(lawyer => 
                      lawyer.location.includes(city)
                    ).length;
                    
                    return (
                      <button
                        key={city}
                        onClick={() => handleCityClick(city)}
                        className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 text-center"
                      >
                        <div className="flex items-center justify-center mb-2">
                          <MapPin className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-purple-600">
                          {city}
                        </div>
                        <div className="text-xs text-gray-500">
                          {lawyerCount} lawyer{lawyerCount !== 1 ? 's' : ''}
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                {cities.length > 20 && (
                  <div className="text-center mt-8">
                    <button className="text-purple-600 hover:text-purple-800 font-medium text-lg flex items-center mx-auto">
                      View all cities
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Why Choose Us Section - Avvo Style */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Why choose Attorneys-deets?</h3>
                <p className="text-lg text-gray-600">We make it easy to find the right legal help</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Verified attorneys</h4>
                  <p className="text-gray-600">All lawyers are verified and licensed to practice law</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Client reviews</h4>
                  <p className="text-gray-600">Read real reviews from clients to make informed decisions</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Easy to connect</h4>
                  <p className="text-gray-600">Contact attorneys directly with one click</p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Results Section */
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {filteredLawyers.length} Lawyers Found
                  {selectedPracticeArea && (
                    <span className="text-lg font-normal text-gray-600 ml-2">
                      in {selectedPracticeArea}
                    </span>
                  )}
                  {selectedState && (
                    <span className="text-lg font-normal text-gray-600 ml-2">
                      in {selectedState}
                    </span>
                  )}
                  {selectedCity && (
                    <span className="text-lg font-normal text-gray-600 ml-2">
                      in {selectedCity}
                    </span>
                  )}
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-800 font-medium mt-2"
                >
                  ← Back to Search
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {filteredLawyers.map(lawyer => (
                <LawyerCard key={lawyer.id} lawyer={lawyer} />
              ))}
            </div>
            
            {filteredLawyers.length === 0 && (
              <div className="text-center py-12">
                <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No lawyers found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start new search
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer - Avvo Style */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Scale className="h-6 w-6 text-blue-400 mr-2" />
                <h4 className="text-lg font-semibold">Attorneys-deets</h4>
              </div>
              <p className="text-gray-400">
                Find the right lawyer for your legal needs. Professional directory of verified attorneys.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For clients</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Find a lawyer</a></li>
                <li><a href="#" className="hover:text-white">Legal advice</a></li>
                <li><a href="#" className="hover:text-white">Ask a lawyer</a></li>
                <li><a href="#" className="hover:text-white">Legal forms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For lawyers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Join our directory</a></li>
                <li><a href="#" className="hover:text-white">Lawyer marketing</a></li>
                <li><a href="#" className="hover:text-white">Resources</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Attorneys-deets. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;