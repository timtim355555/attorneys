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
        <div className="mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{lawyer.name}</h3>
            <p className="text-gray-600 mb-3">{lawyer.practiceAreas.join(', ')} Attorney</p>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {lawyer.location}
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Award className="h-4 w-4 mr-1" />
              {lawyer.college}
            </div>
          </div>
        </div>

        {/* Practice Areas */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {lawyer.practiceAreas.map((area, index) => (
              <span
                key={index}
                className="inline-block bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* About section */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {lawyer.about}
        </p>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2 text-blue-500" />
            <a href={`tel:${lawyer.phone}`} className="hover:text-blue-600">
              {lawyer.phone}
            </a>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2 text-blue-500" />
            <a href={`mailto:${lawyer.email}`} className="hover:text-blue-600">
              {lawyer.email}
            </a>
          </div>
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

  // Avvo-style Footer Component
  const AvvoFooter = () => {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Popular Cities */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Cities</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">New York Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Los Angeles Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Chicago Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Houston Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Phoenix Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Philadelphia Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">San Antonio Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">San Diego Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Dallas Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">San Jose Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Austin Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Jacksonville Lawyers</a></li>
              </ul>
            </div>

            {/* Popular Practice Areas */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Practice Areas</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Personal Injury Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Criminal Defense Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Family Law Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">DUI Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Business Law Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Real Estate Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Immigration Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Employment Law Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Bankruptcy Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Estate Planning Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Tax Law Lawyers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Medical Malpractice Lawyers</a></li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">About Attorneys-deets</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">How It Works</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Legal Advice</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Lawyer Reviews</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Legal Forms</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Legal Research</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Find a Lawyer</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Legal Topics</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Press</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Help Center</a></li>
              </ul>
            </div>

            {/* For Lawyers */}
            <div>
              <h3 className="text-lg font-semibold mb-4">For Lawyers</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Join Attorneys-deets</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Lawyer Marketing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Advertise with Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Lawyer Directory</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Premium Profiles</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Client Reviews</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Legal Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Webinars</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Resources</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Success Stories</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Support</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <h2 className="text-2xl font-bold text-blue-400 mr-8">Attorneys-deets</h2>
                <p className="text-gray-400 text-sm">
                  © 2024 Attorneys-deets. All rights reserved.
                </p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Disclaimer</a>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm text-center">
                Attorneys-deets is a comprehensive legal directory connecting clients with qualified attorneys. 
                Our platform provides verified lawyer profiles, client reviews, and easy communication tools to help you find the right legal representation.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
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
        {/* Avvo-style Directory Sections */}
        <div className="space-y-12">
          {/* Lawyers By Practice Area */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Lawyers By Practice Area</h2>
              <p className="text-gray-600 text-lg">Find attorneys specializing in your legal issue</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: 'Personal Injury', count: '15,234', icon: '⚖️' },
                { name: 'Criminal Defense', count: '12,456', icon: '🛡️' },
                { name: 'Family Law', count: '18,789', icon: '👨‍👩‍👧‍👦' },
                { name: 'DUI Defense', count: '8,567', icon: '🚗' },
                { name: 'Business Law', count: '11,234', icon: '💼' },
                { name: 'Real Estate', count: '9,876', icon: '🏠' },
                { name: 'Immigration', count: '7,654', icon: '🌍' },
                { name: 'Employment Law', count: '6,543', icon: '👔' },
                { name: 'Bankruptcy', count: '5,432', icon: '💰' },
                { name: 'Estate Planning', count: '8,765', icon: '📋' },
                { name: 'Tax Law', count: '4,321', icon: '📊' },
                { name: 'Medical Malpractice', count: '3,210', icon: '🏥' }
              ].map((area, index) => (
                <a
                  key={index}
                  href="#"
                  className="group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-4 transition-all duration-200"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{area.icon}</div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">
                      {area.name}
                    </h3>
                    <p className="text-sm text-gray-600">{area.count} lawyers</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                View All Practice Areas →
              </a>
            </div>
          </section>

          {/* Lawyers By States */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Lawyers By States</h2>
              <p className="text-gray-600 text-lg">Find qualified attorneys in your state</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: 'California', count: '45,678', abbr: 'CA' },
                { name: 'New York', count: '38,234', abbr: 'NY' },
                { name: 'Texas', count: '32,567', abbr: 'TX' },
                { name: 'Florida', count: '28,901', abbr: 'FL' },
                { name: 'Illinois', count: '22,345', abbr: 'IL' },
                { name: 'Pennsylvania', count: '19,876', abbr: 'PA' },
                { name: 'Ohio', count: '17,654', abbr: 'OH' },
                { name: 'Georgia', count: '16,432', abbr: 'GA' },
                { name: 'North Carolina', count: '15,321', abbr: 'NC' },
                { name: 'Michigan', count: '14,210', abbr: 'MI' },
                { name: 'New Jersey', count: '13,987', abbr: 'NJ' },
                { name: 'Virginia', count: '12,876', abbr: 'VA' },
                { name: 'Washington', count: '11,765', abbr: 'WA' },
                { name: 'Arizona', count: '10,654', abbr: 'AZ' },
                { name: 'Massachusetts', count: '9,543', abbr: 'MA' },
                { name: 'Tennessee', count: '8,432', abbr: 'TN' },
                { name: 'Indiana', count: '7,321', abbr: 'IN' },
                { name: 'Missouri', count: '6,210', abbr: 'MO' },
                { name: 'Maryland', count: '5,987', abbr: 'MD' },
                { name: 'Wisconsin', count: '4,876', abbr: 'WI' }
              ].map((state, index) => (
                <a
                  key={index}
                  href="#"
                  className="group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-3 transition-all duration-200"
                >
                  <div className="text-center">
                    <div className="bg-blue-100 group-hover:bg-blue-200 text-blue-600 font-bold text-sm px-2 py-1 rounded mb-2 inline-block">
                      {state.abbr}
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 text-sm mb-1">
                      {state.name}
                    </h3>
                    <p className="text-xs text-gray-600">{state.count} lawyers</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                View All States →
              </a>
            </div>
          </section>

          {/* Lawyers By Cities */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Lawyers By Cities</h2>
              <p className="text-gray-600 text-lg">Connect with local attorneys in major cities</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'New York, NY', count: '12,345', population: '8.3M', icon: '🗽' },
                { name: 'Los Angeles, CA', count: '9,876', population: '4.0M', icon: '🌴' },
                { name: 'Chicago, IL', count: '7,654', population: '2.7M', icon: '🏙️' },
                { name: 'Houston, TX', count: '6,543', population: '2.3M', icon: '🤠' },
                { name: 'Phoenix, AZ', count: '5,432', population: '1.7M', icon: '🌵' },
                { name: 'Philadelphia, PA', count: '4,321', population: '1.6M', icon: '🔔' },
                { name: 'San Antonio, TX', count: '3,210', population: '1.5M', icon: '🏛️' },
                { name: 'San Diego, CA', count: '2,987', population: '1.4M', icon: '🏖️' },
                { name: 'Dallas, TX', count: '2,876', population: '1.3M', icon: '🏢' },
                { name: 'San Jose, CA', count: '2,765', population: '1.0M', icon: '💻' },
                { name: 'Austin, TX', count: '2,654', population: '965K', icon: '🎸' },
                { name: 'Jacksonville, FL', count: '2,543', population: '911K', icon: '🏖️' }
              ].map((city, index) => (
                <a
                  key={index}
                  href="#"
                  className="group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-4 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{city.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                        {city.name}
                      </h3>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-gray-600">{city.count} lawyers</p>
                        <p className="text-xs text-gray-500">{city.population}</p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                View All Cities →
              </a>
            </div>
          </section>
        </div>
      </div>
      
      {/* Avvo-style Footer */}
      <AvvoFooter />
    </div>
  );
}

export default App;