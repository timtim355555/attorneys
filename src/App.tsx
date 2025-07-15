import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, Star, Users, Plus, X } from 'lucide-react';

// Critical Hero Section Component
const CriticalHeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-4xl">
          <div className="mb-8">
            <div className="inline-flex items-center bg-blue-800/30 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-blue-200 text-sm font-medium">🏛️ Trusted Legal Professionals</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Find Your
              <span className="block text-yellow-400">Legal Champion</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl">
              Connect with experienced attorneys who will fight for your rights. 
              Our network of qualified lawyers is ready to handle your case with expertise and dedication.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              Find a Lawyer Now
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200">
              Free Consultation
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-blue-700/50">
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-blue-200">Qualified Attorneys</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-blue-200">Practice Areas</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-blue-200">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <div className="absolute inset-0 bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </div>
  );
};

// Lawyer Card Component
const LawyerCard = ({ lawyer, priority = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={lawyer.image}
            alt={lawyer.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
            loading={priority ? "eager" : "lazy"}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{lawyer.name}</h3>
            <p className="text-blue-600 font-medium mb-2">{lawyer.specialty}</p>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < lawyer.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">({lawyer.reviews} reviews)</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-600 mb-4 line-clamp-3">{lawyer.bio}</p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            {lawyer.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2 text-blue-500" />
            {lawyer.phone}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2 text-blue-500" />
            {lawyer.email}
          </div>
        </div>

        {/* Practice Areas */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {lawyer.practiceAreas.slice(0, 3).map((area, index) => (
              <span
                key={index}
                className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
              >
                {area}
              </span>
            ))}
            {lawyer.practiceAreas.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                +{lawyer.practiceAreas.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium">
            Contact Now
          </button>
          <button className="flex-1 border border-blue-900 text-blue-900 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

// Practice Areas
const practiceAreas = [
  'Personal Injury',
  'Criminal Defense',
  'Family Law',
  'Business Law',
  'Real Estate',
  'Immigration',
  'Employment Law',
  'Bankruptcy',
  'Estate Planning',
  'Tax Law',
  'Intellectual Property',
  'Medical Malpractice'
];

// Main App Component
function App() {
  const [lawyers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      specialty: 'Personal Injury Attorney',
      rating: 5,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Experienced personal injury attorney with over 15 years of practice. Specializes in car accidents, slip and fall cases, and medical malpractice. Known for aggressive representation and successful settlements.',
      location: 'New York, NY',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@lawfirm.com',
      practiceAreas: ['Personal Injury', 'Medical Malpractice', 'Car Accidents', 'Slip and Fall']
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Criminal Defense Lawyer',
      rating: 5,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      bio: 'Former prosecutor turned defense attorney with deep understanding of criminal law. Successfully defended hundreds of clients in various criminal matters from DUI to serious felonies.',
      location: 'Los Angeles, CA',
      phone: '(555) 234-5678',
      email: 'michael.chen@defense.com',
      practiceAreas: ['Criminal Defense', 'DUI Defense', 'White Collar Crime', 'Drug Crimes']
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      specialty: 'Family Law Attorney',
      rating: 4,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      bio: 'Compassionate family law attorney helping families navigate difficult times. Specializes in divorce, child custody, adoption, and domestic relations with a focus on amicable resolutions.',
      location: 'Chicago, IL',
      phone: '(555) 345-6789',
      email: 'emily.rodriguez@familylaw.com',
      practiceAreas: ['Family Law', 'Divorce', 'Child Custody', 'Adoption']
    },
    {
      id: 4,
      name: 'David Thompson',
      specialty: 'Business Law Attorney',
      rating: 5,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Corporate attorney with extensive experience in business formation, mergers and acquisitions, and commercial litigation. Trusted advisor to startups and established businesses.',
      location: 'Houston, TX',
      phone: '(555) 456-7890',
      email: 'david.thompson@bizlaw.com',
      practiceAreas: ['Business Law', 'Corporate Law', 'Mergers & Acquisitions', 'Commercial Litigation']
    },
    {
      id: 5,
      name: 'Lisa Wang',
      specialty: 'Immigration Attorney',
      rating: 5,
      reviews: 174,
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Dedicated immigration attorney helping individuals and families achieve their American dreams. Fluent in multiple languages and experienced in all aspects of immigration law.',
      location: 'Miami, FL',
      phone: '(555) 567-8901',
      email: 'lisa.wang@immigration.com',
      practiceAreas: ['Immigration Law', 'Visa Applications', 'Green Cards', 'Citizenship']
    },
    {
      id: 6,
      name: 'Robert Martinez',
      specialty: 'Real Estate Attorney',
      rating: 4,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Real estate attorney specializing in residential and commercial transactions. Expert in property law, zoning issues, and real estate litigation with a track record of successful closings.',
      location: 'Phoenix, AZ',
      phone: '(555) 678-9012',
      email: 'robert.martinez@realestate.com',
      practiceAreas: ['Real Estate', 'Property Law', 'Zoning', 'Real Estate Litigation']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Filter lawyers based on search criteria
  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPracticeArea = !selectedPracticeArea || 
      lawyer.practiceAreas.some(area => area.toLowerCase().includes(selectedPracticeArea.toLowerCase()));
    
    const matchesLocation = !selectedLocation || 
      lawyer.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesPracticeArea && matchesLocation;
  });

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedPracticeArea('');
    setSelectedLocation('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by the filter effect
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <CriticalHeroSection />

      {/* Search Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Find the Right Attorney for Your Case
            </h2>
            
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Search Bar */}
              <div className="flex rounded-lg shadow-sm">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Search by name, practice area, or location..."
                />
                <button
                  type="submit"
                  className="bg-blue-900 text-white px-8 py-3 rounded-r-lg hover:bg-blue-800 transition-colors font-medium flex items-center space-x-2"
                >
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
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
                  {[...new Set(lawyers.map(lawyer => lawyer.location))].map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                {(searchTerm || selectedPracticeArea || selectedLocation) && (
                  <button
                    onClick={clearSearch}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {filteredLawyers.length} Lawyers Found
          </h2>
        </div>

        {filteredLawyers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No lawyers found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria.</p>
            <button
              onClick={clearSearch}
              className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredLawyers.map((lawyer, index) => (
              <LawyerCard 
                key={lawyer.id} 
                lawyer={lawyer} 
                priority={index < 3} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Lawyer Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-900 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-colors">
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default App;