import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, Star, Users, Plus, X, Filter, ChevronDown, Award, Shield, Clock, MessageCircle } from 'lucide-react';

// Avvo-style Header Component
const AvvoHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">Attorneys-deets</h1>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Find a Lawyer</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Legal Advice</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Reviews</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Resources</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 text-sm font-medium">Sign In</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              For Lawyers
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Avvo-style Hero Section
const AvvoHeroSection = ({ onSearch, searchTerm, setSearchTerm, selectedLocation, setSelectedLocation }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find the right lawyer for you
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with experienced attorneys in your area. Get the legal help you need.
          </p>
          
          {/* Avvo-style Search Form */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={onSearch} className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Legal Issue</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="e.g., Personal Injury, Divorce, DUI"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="City, State"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors font-medium flex items-center justify-center space-x-2"
                  >
                    <Search className="h-5 w-5" />
                    <span>Find Lawyers</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Avvo-style Lawyer Card
const AvvoLawyerCard = ({ lawyer, priority = false }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Header with photo and basic info */}
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={lawyer.image}
            alt={lawyer.name}
            className="w-20 h-20 rounded-lg object-cover border border-gray-200"
            loading={priority ? "eager" : "lazy"}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{lawyer.name}</h3>
            <p className="text-gray-600 mb-2">{lawyer.practiceAreas[0]} Attorney</p>
            
            {/* Avvo Rating Style */}
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex items-center">
                <div className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold mr-2">
                  {lawyer.rating.toFixed(1)}
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(lawyer.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">({lawyer.reviews})</span>
              </div>
              {lawyer.verified && (
                <div className="flex items-center text-green-600">
                  <Shield className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {lawyer.location}
            </div>
            
            <div className="text-sm text-gray-600">
              {lawyer.experience} years experience
            </div>
          </div>
        </div>

        {/* Practice Areas */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {lawyer.practiceAreas.slice(0, 3).map((area, index) => (
              <span
                key={index}
                className="inline-block bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full"
              >
                {area}
              </span>
            ))}
            {lawyer.practiceAreas.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                +{lawyer.practiceAreas.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Bio snippet */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {lawyer.bio}
        </p>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2 text-blue-500" />
            <a href={`tel:${lawyer.phone}`} className="hover:text-blue-600">
              {lawyer.phone}
            </a>
          </div>
          {lawyer.website && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="h-4 w-4 mr-2" />
              <a href={lawyer.website} className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                View Website
              </a>
            </div>
          )}
        </div>

        {/* Avvo-style Action Buttons */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors text-sm font-medium flex items-center justify-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span>Contact</span>
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

// Avvo-style Filters Sidebar
const AvvoFiltersSidebar = ({ 
  selectedPracticeArea, 
  setSelectedPracticeArea, 
  practiceAreas,
  lawyers,
  filteredLawyers 
}) => {
  const [showAllAreas, setShowAllAreas] = useState(false);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Refine Results</h3>
      
      {/* Results count */}
      <div className="mb-6 p-3 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>{filteredLawyers.length}</strong> of <strong>{lawyers.length}</strong> lawyers
        </p>
      </div>
      
      {/* Practice Areas Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Practice Area</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="practiceArea"
              checked={selectedPracticeArea === ''}
              onChange={() => setSelectedPracticeArea('')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">All Practice Areas</span>
          </label>
          {practiceAreas.slice(0, showAllAreas ? practiceAreas.length : 8).map(area => {
            const count = lawyers.filter(lawyer => 
              lawyer.practiceAreas.some(pa => pa.toLowerCase().includes(area.toLowerCase()))
            ).length;
            
            return (
              <label key={area} className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="practiceArea"
                    checked={selectedPracticeArea === area}
                    onChange={() => setSelectedPracticeArea(area)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{area}</span>
                </div>
                <span className="text-xs text-gray-500">({count})</span>
              </label>
            );
          })}
          {practiceAreas.length > 8 && (
            <button
              onClick={() => setShowAllAreas(!showAllAreas)}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              {showAllAreas ? 'Show Less' : 'Show More'}
              <ChevronDown className={`h-4 w-4 ml-1 transform ${showAllAreas ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>
      
      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3].map(rating => (
            <label key={rating} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div className="ml-2 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-1 text-sm text-gray-700">& up</span>
              </div>
            </label>
          ))}
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
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Experienced personal injury attorney with over 15 years of practice. Specializes in car accidents, slip and fall cases, and medical malpractice. Known for aggressive representation and successful settlements.',
      location: 'New York, NY',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@lawfirm.com',
      practiceAreas: ['Personal Injury', 'Medical Malpractice', 'Car Accidents', 'Slip and Fall'],
      experience: 15,
      verified: true,
      website: 'https://sarahjohnsonlaw.com'
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      bio: 'Former prosecutor turned defense attorney with deep understanding of criminal law. Successfully defended hundreds of clients in various criminal matters from DUI to serious felonies.',
      location: 'Los Angeles, CA',
      phone: '(555) 234-5678',
      email: 'michael.chen@defense.com',
      practiceAreas: ['Criminal Defense', 'DUI Defense', 'White Collar Crime', 'Drug Crimes'],
      experience: 12,
      verified: true,
      website: 'https://chendefense.com'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      bio: 'Compassionate family law attorney helping families navigate difficult times. Specializes in divorce, child custody, adoption, and domestic relations with a focus on amicable resolutions.',
      location: 'Chicago, IL',
      phone: '(555) 345-6789',
      email: 'emily.rodriguez@familylaw.com',
      practiceAreas: ['Family Law', 'Divorce', 'Child Custody', 'Adoption'],
      experience: 18,
      verified: true,
      website: 'https://rodriguezfamilylaw.com'
    },
    {
      id: 4,
      name: 'David Thompson',
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Corporate attorney with extensive experience in business formation, mergers and acquisitions, and commercial litigation. Trusted advisor to startups and established businesses.',
      location: 'Houston, TX',
      phone: '(555) 456-7890',
      email: 'david.thompson@bizlaw.com',
      practiceAreas: ['Business Law', 'Corporate Law', 'Mergers & Acquisitions', 'Commercial Litigation'],
      experience: 20,
      verified: true,
      website: 'https://thompsonbizlaw.com'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      rating: 4.8,
      reviews: 174,
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Dedicated immigration attorney helping individuals and families achieve their American dreams. Fluent in multiple languages and experienced in all aspects of immigration law.',
      location: 'Miami, FL',
      phone: '(555) 567-8901',
      email: 'lisa.wang@immigration.com',
      practiceAreas: ['Immigration Law', 'Visa Applications', 'Green Cards', 'Citizenship'],
      experience: 11,
      verified: true,
      website: 'https://wangimmigration.com'
    },
    {
      id: 6,
      name: 'Robert Martinez',
      rating: 4.6,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Real estate attorney specializing in residential and commercial transactions. Expert in property law, zoning issues, and real estate litigation with a track record of successful closings.',
      location: 'Phoenix, AZ',
      phone: '(555) 678-9012',
      email: 'robert.martinez@realestate.com',
      practiceAreas: ['Real Estate', 'Property Law', 'Zoning', 'Real Estate Litigation'],
      experience: 16,
      verified: false,
      website: 'https://martinezrealestate.com'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  // Filter lawyers based on search criteria
  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.practiceAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesPracticeArea = !selectedPracticeArea || 
      lawyer.practiceAreas.some(area => area.toLowerCase().includes(selectedPracticeArea.toLowerCase()));
    
    const matchesLocation = !selectedLocation || 
      lawyer.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesPracticeArea && matchesLocation;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviews - a.reviews;
    if (sortBy === 'experience') return b.experience - a.experience;
    return a.name.localeCompare(b.name);
  });

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Avvo-style Header */}
      <AvvoHeader />

      {/* Hero Section */}
      <AvvoHeroSection 
        onSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <AvvoFiltersSidebar 
              selectedPracticeArea={selectedPracticeArea}
              setSelectedPracticeArea={setSelectedPracticeArea}
              practiceAreas={practiceAreas}
              lawyers={lawyers}
              filteredLawyers={filteredLawyers}
            />
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Lawyers {selectedLocation && `in ${selectedLocation}`}
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredLawyers.length} lawyers found
                </p>
              </div>
              
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="experience">Most Experience</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Lawyer Cards */}
            {filteredLawyers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No lawyers found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLawyers.map((lawyer, index) => (
                  <AvvoLawyerCard 
                    key={lawyer.id} 
                    lawyer={lawyer} 
                    priority={index < 3} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;