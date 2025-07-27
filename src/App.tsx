import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, Phone, Mail, Globe, User, Filter, ChevronDown, Award, Clock, Shield, Users, Map } from 'lucide-react';
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
      const matchesPracticeArea = selectedPracticeArea === '' || 
        lawyer.practiceAreas.includes(selectedPracticeArea);
      
      const matchesState = selectedState === '' || 
        lawyer.location.includes(selectedState);
      
      const matchesCity = selectedCity === '' || 
        lawyer.location.includes(selectedCity);

      return matchesPracticeArea && matchesState && matchesCity;
    });
  }, [selectedPracticeArea, selectedState, selectedCity]);

  const handlePracticeAreaClick = (area: string) => {
    setSelectedPracticeArea(area);
    setSelectedState('');
    setSelectedCity('');
    setShowResults(true);
  };

  const handleStateClick = (state: string) => {
    setSelectedState(state);
    setSelectedPracticeArea('');
    setSelectedCity('');
    setShowResults(true);
  };

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    setSelectedPracticeArea('');
    setSelectedState('');
    setShowResults(true);
  };

  const clearFilters = () => {
    setSelectedPracticeArea('');
    setSelectedState('');
    setSelectedCity('');
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
    <div className="min-h-screen bg-gray-50">
      <SEOHead type="homepage" />
      <SchemaMarkup type="homepage" lawyers={lawyers} />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Attorneys-deets</h1>
              <span className="ml-2 text-sm text-gray-500">Find the right lawyer</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={clearFilters} className="text-gray-700 hover:text-blue-600 font-medium">Home</button>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Practice Areas</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {!showResults ? (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Find the Right Lawyer for Your Case
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Connect with experienced attorneys in your area. Browse verified lawyers with client reviews and ratings.
              </p>
            </div>
          </section>

          {/* Three Search Segments */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* 1. Search Lawyers by Practice Area */}
              <div className="mb-16">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Search Lawyers by Practice Area</h3>
                  <p className="text-lg text-gray-600">Find specialized attorneys for your specific legal needs</p>
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
                        className="p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-900 transition-all duration-200 text-left hover:shadow-md"
                      >
                        <div className="font-semibold text-sm mb-1">{area}</div>
                        <div className="text-xs text-gray-500">
                          {lawyerCount} lawyer{lawyerCount !== 1 ? 's' : ''}
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                {practiceAreas.length > 18 && (
                  <div className="text-center mt-8">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-lg">
                      View All {practiceAreas.length} Practice Areas →
                    </button>
                  </div>
                )}
              </div>

              {/* 2. Search for Lawyers by States */}
              <div className="mb-16">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Search for Lawyers by States</h3>
                  <p className="text-lg text-gray-600">Browse attorneys by state to find local legal representation</p>
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
                        className="p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50 hover:text-green-900 transition-all duration-200 text-center hover:shadow-md"
                      >
                        <div className="flex items-center justify-center mb-2">
                          <Map className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="font-semibold text-sm mb-1">{state}</div>
                        <div className="text-xs text-gray-500">
                          {lawyerCount} lawyer{lawyerCount !== 1 ? 's' : ''}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Search Lawyers by Cities */}
              <div className="mb-16">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Search Lawyers by Cities</h3>
                  <p className="text-lg text-gray-600">Find attorneys in your specific city or metropolitan area</p>
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
                        className="p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-900 transition-all duration-200 text-center hover:shadow-md"
                      >
                        <div className="flex items-center justify-center mb-2">
                          <MapPin className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="font-semibold text-sm mb-1">{city}</div>
                        <div className="text-xs text-gray-500">
                          {lawyerCount} lawyer{lawyerCount !== 1 ? 's' : ''}
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                {cities.length > 20 && (
                  <div className="text-center mt-8">
                    <button className="text-purple-600 hover:text-purple-800 font-medium text-lg">
                      View All {cities.length} Cities →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Results Section */
        <section className="py-12">
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
                  Try selecting a different search option
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Search
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Attorneys-deets</h4>
              <p className="text-gray-400">
                Find the right lawyer for your legal needs. Connect with experienced attorneys in your area.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Practice Areas</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Personal Injury</a></li>
                <li><a href="#" className="hover:text-white">Criminal Defense</a></li>
                <li><a href="#" className="hover:text-white">Family Law</a></li>
                <li><a href="#" className="hover:text-white">Business Law</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Find a Lawyer</a></li>
                <li><a href="#" className="hover:text-white">Legal Advice</a></li>
                <li><a href="#" className="hover:text-white">Law Firms</a></li>
                <li><a href="#" className="hover:text-white">Legal Forms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
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