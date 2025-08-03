import React, { useState, useMemo } from 'react';
import { Search, MapPin, Scale, Phone, Mail, Globe, Star, ChevronRight, Users, Building, Gavel } from 'lucide-react';
import { lawyers } from './data/lawyers';
import { Lawyer } from './types/lawyer';
import { SEOHead } from './components/SEOHead';
import { SchemaMarkup } from './components/SchemaMarkup';
import { LazyImage } from './components/LazyImage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);

  // Filter lawyers based on search criteria
  const filteredLawyers = useMemo(() => {
    return lawyers.filter(lawyer => {
      const matchesSearch = searchTerm === '' || 
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.practiceAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase())) ||
        lawyer.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPracticeArea = selectedPracticeArea === '' ||
        lawyer.practiceAreas.some(area => area.toLowerCase().includes(selectedPracticeArea.toLowerCase()));
      
      const matchesLocation = selectedLocation === '' ||
        lawyer.location.toLowerCase().includes(selectedLocation.toLowerCase());
      
      return matchesSearch && matchesPracticeArea && matchesLocation;
    });
  }, [searchTerm, selectedPracticeArea, selectedLocation]);

  // Get unique practice areas and locations
  const practiceAreas = [...new Set(lawyers.flatMap(lawyer => lawyer.practiceAreas))];
  const locations = [...new Set(lawyers.map(lawyer => lawyer.location))];

  // Practice area icons mapping
  const practiceAreaIcons: { [key: string]: React.ComponentType<any> } = {
    'Personal Injury': Users,
    'Criminal Defense': Scale,
    'Family Law': Users,
    'Corporate Law': Building,
    'Real Estate Law': Building,
    'Immigration Law': Globe,
    'Employment Law': Users,
    'Bankruptcy Law': Scale,
    'Estate Planning': Gavel,
    'Tax Law': Scale,
    'Medical Malpractice': Users,
    'Intellectual Property': Gavel,
    'Workers Compensation': Users,
    'Social Security Disability': Users,
    'Environmental Law': Globe,
    'Healthcare Law': Users,
    'Securities Law': Building,
    'Construction Law': Building,
    'Elder Law': Users,
    'Insurance Law': Scale,
    'Education Law': Users,
    'Aviation Law': Globe,
    'Entertainment Law': Gavel,
    'Military Law': Scale,
    'Consumer Protection': Users,
    'Civil Rights': Scale,
    'Nonprofit Law': Users,
    'Energy Law': Building,
    'Privacy Law': Scale,
    'Maritime Law': Globe,
    'Cybersecurity Law': Scale
  };

  const getIconForPracticeArea = (area: string) => {
    return practiceAreaIcons[area] || Gavel;
  };

  if (selectedLawyer) {
    const primaryPracticeArea = selectedLawyer.practiceAreas[0];
    const locationSlug = selectedLawyer.location.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    const practiceAreaSlug = primaryPracticeArea.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    const yearsSince = new Date().getFullYear() - selectedLawyer.experience;

    return (
      <div className="min-h-screen bg-gray-50">
        <SEOHead 
          type="lawyer" 
          data={{ lawyer: selectedLawyer }} 
        />
        <SchemaMarkup 
          type="lawyer" 
          lawyer={selectedLawyer} 
        />
        
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Scale className="h-8 w-8 text-[#62A8F9]" />
                <h1 className="text-2xl font-bold text-gray-900">Attorneys-deets</h1>
              </div>
              <button
                onClick={() => setSelectedLawyer(null)}
                className="flex items-center space-x-2 text-[#62A8F9] hover:text-blue-700 font-medium"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                <span>Back to Directory</span>
              </button>
            </div>
          </div>
        </header>

        {/* Lawyer Profile */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              {/* Header Section */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedLawyer.name} – Leading {primaryPracticeArea} Specialist in {selectedLawyer.location.split(',')[0]}
                </h1>
                <div className="w-full h-px bg-gray-300 my-6"></div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Meet {selectedLawyer.name}: Trusted {primaryPracticeArea} Attorney Serving {selectedLawyer.location.split(',')[0]} Clients
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {selectedLawyer.name} brings over {selectedLawyer.experience} years of legal expertise in {selectedLawyer.practiceAreas.join(', ')}. 
                  Based in {selectedLawyer.location}, {selectedLawyer.name.split(' ')[0]} is recognized for delivering clear, strategic advice in areas like {selectedLawyer.specializations?.slice(0, 3).join(', ') || selectedLawyer.practiceAreas.slice(0, 3).join(', ')}.
                </p>
              </div>

              <div className="w-full h-px bg-gray-300 my-8"></div>

              {/* Credentials Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Credentials, Client Ratings & Contact Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">•</span>
                      <span className="font-medium text-gray-900">Rating:</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(selectedLawyer.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-gray-900 font-semibold ml-1">
                          {selectedLawyer.rating} / 5
                        </span>
                        <span className="text-gray-600">({selectedLawyer.reviews} reviews)</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">•</span>
                      <span className="font-medium text-gray-900">Years of Practice:</span>
                      <span className="text-gray-700">Since {yearsSince}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">•</span>
                      <span className="font-medium text-gray-900">Education:</span>
                      <span className="text-gray-700">{selectedLawyer.education}</span>
                    </div>

                    {selectedLawyer.barNumber && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-700">•</span>
                        <span className="font-medium text-gray-900">Bar Number:</span>
                        <span className="text-gray-700">{selectedLawyer.barNumber}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">•</span>
                      <span className="font-medium text-gray-900">Email:</span>
                      <a
                        href={`mailto:${selectedLawyer.email}`}
                        className="text-[#62A8F9] hover:text-blue-700 underline"
                      >
                        {selectedLawyer.email}
                      </a>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">•</span>
                      <span className="font-medium text-gray-900">Phone:</span>
                      <a
                        href={`tel:${selectedLawyer.phone}`}
                        className="text-[#62A8F9] hover:text-blue-700 underline"
                      >
                        {selectedLawyer.phone}
                      </a>
                    </div>

                    {selectedLawyer.website && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-700">•</span>
                        <span className="font-medium text-gray-900">Website:</span>
                        <a
                          href={selectedLawyer.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#62A8F9] hover:text-blue-700 underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Practice Areas */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">Practice Areas:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLawyer.practiceAreas.map((area, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#62A8F9] bg-opacity-10 text-[#62A8F9] rounded-full text-sm font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
                <a
                  href={`tel:${selectedLawyer.phone}`}
                  className="flex items-center space-x-2 bg-[#62A8F9] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`mailto:${selectedLawyer.email}`}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Email</span>
                </a>
                {selectedLawyer.website && (
                  <a
                    href={selectedLawyer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Visit Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead type="homepage" />
      <SchemaMarkup type="homepage" lawyers={lawyers} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#62A8F9] to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Scale className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold">Attorneys-deets</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Find the Right Lawyer for Your Case
          </p>
          <p className="text-lg mb-12 opacity-80 max-w-3xl mx-auto">
            Connect with experienced attorneys in your area. Browse verified lawyers by practice area and location.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lawyers, practice areas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62A8F9] focus:border-transparent text-gray-900"
                />
              </div>
              
              <select
                value={selectedPracticeArea}
                onChange={(e) => setSelectedPracticeArea(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62A8F9] focus:border-transparent text-gray-900"
              >
                <option value="">All Practice Areas</option>
                {practiceAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#62A8F9] focus:border-transparent text-gray-900"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
              <Gavel className="h-5 w-5 text-[#62A8F9]" />
              <span className="text-[#62A8F9] font-semibold">Practice Areas</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Find Lawyers by Specialty
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse attorneys by their areas of expertise and find the right legal specialist for your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {practiceAreas.slice(0, 12).map((area) => {
              const Icon = getIconForPracticeArea(area);
              const lawyerCount = lawyers.filter(lawyer => 
                lawyer.practiceAreas.includes(area)
              ).length;
              
              return (
                <div
                  key={area}
                  onClick={() => setSelectedPracticeArea(area)}
                  className="group cursor-pointer bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-[#62A8F9] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#62A8F9] transition-colors">
                      {area}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lawyerCount} {lawyerCount === 1 ? 'lawyer' : 'lawyers'}
                    </p>
                    <ChevronRight className="h-4 w-4 text-[#62A8F9] mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* States Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(98, 168, 249, 0.1)' }}>
              <MapPin className="h-5 w-5" style={{ color: '#62A8F9' }} />
              <span className="font-semibold" style={{ color: '#62A8F9' }}>Browse by State</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Find Lawyers by Location
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover qualified attorneys in your state and local area.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...new Set(lawyers.map(lawyer => lawyer.location.split(',')[1]?.trim()).filter(Boolean))].slice(0, 15).map((state) => {
              const stateCount = lawyers.filter(lawyer => 
                lawyer.location.includes(state)
              ).length;
              
              return (
                <div
                  key={state}
                  onClick={() => setSelectedLocation(state)}
                  className="group cursor-pointer bg-gradient-to-br from-white to-blue-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: '#62A8F9' }}>
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#62A8F9] transition-colors">
                      {state}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {stateCount} lawyers
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(98, 168, 249, 0.1)' }}>
              <Building className="h-5 w-5" style={{ color: '#62A8F9' }} />
              <span className="font-semibold" style={{ color: '#62A8F9' }}>Major Cities</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Top Legal Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find experienced attorneys in major metropolitan areas.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...new Set(lawyers.map(lawyer => lawyer.location.split(',')[0]?.trim()).filter(Boolean))].slice(0, 12).map((city) => {
              const cityCount = lawyers.filter(lawyer => 
                lawyer.location.startsWith(city)
              ).length;
              
              return (
                <div
                  key={city}
                  onClick={() => setSelectedLocation(city)}
                  className="group cursor-pointer bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#62A8F9' }}>
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#62A8F9] transition-colors">
                      {city}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {cityCount} {cityCount === 1 ? 'lawyer' : 'lawyers'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lawyers Directory */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Attorneys
            </h2>
            <p className="text-lg text-gray-600">
              {filteredLawyers.length} {filteredLawyers.length === 1 ? 'lawyer' : 'lawyers'} found
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLawyers.slice(0, 9).map((lawyer) => {
              const primaryPracticeArea = lawyer.practiceAreas[0];
              const yearsSince = new Date().getFullYear() - lawyer.experience;
              
              return (
                <div
                  key={lawyer.id}
                  onClick={() => setSelectedLawyer(lawyer)}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                >
                  <div className="p-8">
                    {/* Header Section */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#62A8F9] transition-colors">
                        {lawyer.name} – Leading {primaryPracticeArea} Specialist in {lawyer.location.split(',')[0]}
                      </h3>
                      <div className="w-full h-px bg-gray-300 my-4"></div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Meet {lawyer.name}: Trusted {primaryPracticeArea} Attorney Serving {lawyer.location.split(',')[0]} Clients
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {lawyer.name} brings over {lawyer.experience} years of legal expertise in {lawyer.practiceAreas.slice(0, 2).join(' and ')}. 
                        Based in {lawyer.location}, {lawyer.name.split(' ')[0]} is recognized for delivering clear, strategic advice.
                      </p>
                    </div>

                    <div className="w-full h-px bg-gray-300 my-6"></div>

                    {/* Credentials Section */}
                    <div className="mb-6">
                      <h5 className="font-semibold text-gray-900 mb-4">
                        Credentials, Client Ratings & Contact Details
                      </h5>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-700">•</span>
                          <span className="font-medium text-gray-900">Rating:</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(lawyer.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-gray-900 font-semibold ml-1">
                              {lawyer.rating} / 5
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-gray-700">•</span>
                          <span className="font-medium text-gray-900">Years of Practice:</span>
                          <span className="text-gray-700">Since {yearsSince}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-gray-700">•</span>
                          <span className="font-medium text-gray-900">Email:</span>
                          <a
                            href={`mailto:${lawyer.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#62A8F9] hover:text-blue-700 underline"
                          >
                            {lawyer.email}
                          </a>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-gray-700">•</span>
                          <span className="font-medium text-gray-900">Phone:</span>
                          <a
                            href={`tel:${lawyer.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#62A8F9] hover:text-blue-700 underline"
                          >
                            {lawyer.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Practice Areas */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {lawyer.practiceAreas.slice(0, 3).map((area, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-[#62A8F9] bg-opacity-10 text-[#62A8F9] rounded-full text-xs font-medium"
                          >
                            {area}
                          </span>
                        ))}
                        {lawyer.practiceAreas.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            +{lawyer.practiceAreas.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4 border-t border-gray-200">
                      <a
                        href={`tel:${lawyer.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center space-x-2 bg-[#62A8F9] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        <Phone className="h-4 w-4" />
                        <span>Call</span>
                      </a>
                      <a
                        href={`mailto:${lawyer.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        <Mail className="h-4 w-4" />
                        <span>Email</span>
                      </a>
                    </div>

                    {/* Availability Badge */}
                    <div className="mt-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        lawyer.availability === 'Available' 
                          ? 'bg-green-100 text-green-800'
                          : lawyer.availability === 'Limited'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {lawyer.availability}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredLawyers.length > 9 && (
            <div className="text-center mt-12">
              <button className="bg-[#62A8F9] text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                View All {filteredLawyers.length} Lawyers
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
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-6 w-6" />
                <span className="text-xl font-bold">Attorneys-deets</span>
              </div>
              <p className="text-gray-400">
                Find the right lawyer for your case. Connect with experienced attorneys in your area.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Practice Areas</h3>
              <ul className="space-y-2 text-gray-400">
                {practiceAreas.slice(0, 6).map(area => (
                  <li key={area}>
                    <button 
                      onClick={() => setSelectedPracticeArea(area)}
                      className="hover:text-white transition-colors"
                    >
                      {area}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Locations</h3>
              <ul className="space-y-2 text-gray-400">
                {locations.slice(0, 6).map(location => (
                  <li key={location}>
                    <button 
                      onClick={() => setSelectedLocation(location)}
                      className="hover:text-white transition-colors"
                    >
                      {location}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
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