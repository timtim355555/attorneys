import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, Phone, Mail, Globe, User, Filter, ChevronDown, Award, Clock, Shield, Users } from 'lucide-react';
import { lawyers } from './data/lawyers';
import { Lawyer } from './types/lawyer';
import { LazyImage } from './components/LazyImage';
import { SEOHead } from './components/SEOHead';
import { SchemaMarkup } from './components/SchemaMarkup';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);

  // Get unique practice areas and locations
  const practiceAreas = useMemo(() => {
    const areas = new Set<string>();
    lawyers.forEach(lawyer => {
      lawyer.practiceAreas.forEach(area => areas.add(area));
    });
    return Array.from(areas).sort();
  }, []);

  const locations = useMemo(() => {
    const locs = new Set(lawyers.map(lawyer => lawyer.location));
    return Array.from(locs).sort();
  }, []);

  // Filter lawyers
  const filteredLawyers = useMemo(() => {
    return lawyers.filter(lawyer => {
      const matchesSearch = searchTerm === '' || 
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.practiceAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase())) ||
        lawyer.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPracticeArea = selectedPracticeArea === '' || 
        lawyer.practiceAreas.includes(selectedPracticeArea);
      
      const matchesLocation = selectedLocation === '' || 
        lawyer.location === selectedLocation;
      
      const matchesAvailability = selectedAvailability === '' || 
        lawyer.availability === selectedAvailability;

      return matchesSearch && matchesPracticeArea && matchesLocation && matchesAvailability;
    });
  }, [searchTerm, selectedPracticeArea, selectedLocation, selectedAvailability]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedPracticeArea('');
    setSelectedLocation('');
    setSelectedAvailability('');
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
                <button
                  onClick={() => setSelectedLawyer(lawyer)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Profile
                </button>
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

  const LawyerProfile = ({ lawyer }: { lawyer: Lawyer }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={() => setSelectedLawyer(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            ✕
          </button>
          
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-t-2xl">
            <div className="flex items-start space-x-6">
              <LazyImage
                src={lawyer.image || 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg'}
                alt={lawyer.name}
                className="w-32 h-32 rounded-xl object-cover border-4 border-white"
                priority={true}
              />
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{lawyer.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(lawyer.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-blue-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-blue-100">
                      {lawyer.rating} ({lawyer.reviews} reviews)
                    </span>
                  </div>
                  {lawyer.verified && (
                    <div className="flex items-center bg-green-500 px-2 py-1 rounded-full">
                      <Shield className="h-4 w-4 mr-1" />
                      <span className="text-sm">Verified</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-blue-100">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{lawyer.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{lawyer.experience} years experience</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    <span>{lawyer.college}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{lawyer.availability} for new clients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
                  <p className="text-gray-700 leading-relaxed">{lawyer.about}</p>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Practice Areas</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {lawyer.practiceAreas.map((area, index) => (
                      <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-blue-900 font-medium">{area}</span>
                      </div>
                    ))}
                  </div>
                </section>
                
                {lawyer.specializations && lawyer.specializations.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Specializations</h2>
                    <div className="flex flex-wrap gap-2">
                      {lawyer.specializations.map((spec, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
              
              <div>
                <div className="bg-gray-50 rounded-xl p-6 sticky top-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <a
                      href={`tel:${lawyer.phone}`}
                      className="flex items-center w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Phone className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-medium">Call Now</div>
                        <div className="text-sm text-blue-100">{lawyer.phone}</div>
                      </div>
                    </a>
                    
                    <a
                      href={`mailto:${lawyer.email}`}
                      className="flex items-center w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-medium">Send Email</div>
                        <div className="text-sm text-gray-500">{lawyer.email}</div>
                      </div>
                    </a>
                    
                    {lawyer.website && (
                      <a
                        href={lawyer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Globe className="h-5 w-5 mr-3" />
                        <div>
                          <div className="font-medium">Visit Website</div>
                          <div className="text-sm text-gray-500">View firm details</div>
                        </div>
                      </a>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-3 text-sm">
                      {lawyer.barNumber && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bar Number:</span>
                          <span className="font-medium">{lawyer.barNumber}</span>
                        </div>
                      )}
                      {lawyer.languages && lawyer.languages.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Languages:</span>
                          <span className="font-medium">{lawyer.languages.join(', ')}</span>
                        </div>
                      )}
                      {lawyer.hourlyRate && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rate:</span>
                          <span className="font-medium">{lawyer.hourlyRate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Find Lawyers</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Practice Areas</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find the Right Lawyer for Your Case
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Connect with experienced attorneys in your area. Browse verified lawyers with client reviews and ratings.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search lawyers or practice areas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
                
                <select
                  value={selectedPracticeArea}
                  onChange={(e) => setSelectedPracticeArea(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="">All Practice Areas</option>
                  {practiceAreas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                  <ChevronDown className={`h-4 w-4 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid md:grid-cols-3 gap-4">
                    <select
                      value={selectedAvailability}
                      onChange={(e) => setSelectedAvailability(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">Any Availability</option>
                      <option value="Available">Available</option>
                      <option value="Limited">Limited</option>
                      <option value="Busy">Busy</option>
                    </select>
                    
                    <div className="flex items-center">
                      <button
                        onClick={clearFilters}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {filteredLawyers.length} Lawyers Found
              </h3>
              <p className="text-gray-600 mt-1">
                Showing results {searchTerm || selectedPracticeArea || selectedLocation ? 'for your search' : 'in all areas'}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Highest Rated</option>
                <option>Most Reviews</option>
                <option>Years of Experience</option>
                <option>Availability</option>
              </select>
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
                Try adjusting your search criteria or clearing filters
              </p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

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

      {/* Lawyer Profile Modal */}
      {selectedLawyer && <LawyerProfile lawyer={selectedLawyer} />}
    </div>
  );
}

export default App;