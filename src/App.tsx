import React, { useState } from 'react';
import { Search, Phone, Mail, MapPin, Scale, Users, Award, Filter, Menu, X, Plus, Shield, FileSpreadsheet, Database, Globe, Github } from 'lucide-react';
import { Lawyer } from './types/lawyer';
import { lawyers as initialLawyers, addLawyer } from './data/lawyers';
import { SchemaMarkup } from './components/SchemaMarkup';
import { SEOHead } from './components/SEOHead';

// Preload critical images
// Lazy load heavy components to reduce initial bundle size
const AddLawyerForm = React.lazy(() => import('./components/AddLawyerForm').then(module => ({ default: module.AddLawyerForm })));
const ExcelImport = React.lazy(() => import('./components/ExcelImport').then(module => ({ default: module.ExcelImport })));
const BulkDataManager = React.lazy(() => import('./components/BulkDataManager').then(module => ({ default: module.BulkDataManager })));
const SitemapManager = React.lazy(() => import('./components/SitemapManager').then(module => ({ default: module.SitemapManager })));
const GitHubSync = React.lazy(() => import('./components/GitHubSync').then(module => ({ default: module.GitHubSync })));

const preloadImage = (src: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

// Lazy loading component for images
const LazyImage: React.FC<{
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
}> = ({ src, alt, className, priority = false }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  React.useEffect(() => {
    if (priority) {
      preloadImage(src);
    }
  }, [src, priority]);

  return (
    <div className={`${className} bg-gray-200 flex items-center justify-center`}>
      {!loaded && !error && (
        <div className="animate-pulse bg-gray-300 w-full h-full flex items-center justify-center">
          <Users className="h-8 w-8 text-gray-400" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${error ? 'hidden' : ''}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      {error && (
        <div className={`${className} bg-gray-100 flex items-center justify-center`}>
          <Users className="h-8 w-8 text-gray-400" />
        </div>
      )}
    </div>
  );
};

const practiceAreas = [
  "Corporate Law", "Criminal Defense", "Family Law", "Personal Injury", 
  "Real Estate Law", "Immigration Law", "Tax Law", "Employment Law",
  "Intellectual Property", "Estate Planning", "Bankruptcy Law", "Environmental Law",
  "Healthcare Law", "Securities Law", "Construction Law", "Elder Law",
  "Insurance Law", "Education Law", "Aviation Law", "Entertainment Law",
  "Sports Law", "Nonprofit Law", "Energy Law", "Privacy Law",
  "Maritime Law", "Cybersecurity Law", "International Law", "Franchise Law",
  "Military Law", "Agricultural Law", "Gaming Law", "Business Law",
  "Contract Law", "Litigation", "Appellate Law", "Administrative Law",
  "Antitrust Law", "Banking Law", "Communications Law", "Consumer Protection",
  "Data Protection", "Disability Law", "Drug & Device Law", "ERISA Law",
  "Government Relations", "Health Insurance", "Labor Relations", "Land Use",
  "Mergers & Acquisitions", "Municipal Law", "Oil & Gas Law", "Patent Law",
  "Product Liability", "Public Finance", "Regulatory Compliance", "Social Security",
  "Trademark Law", "Transportation Law", "Veterans Affairs", "Workers Compensation",
  "Zoning Law"
];

function App() {
  const [lawyers, setLawyers] = useState<Lawyer[]>(initialLawyers);
  const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>(initialLawyers);
  const [displayedLawyers, setDisplayedLawyers] = useState<Lawyer[]>(initialLawyers.slice(0, 12)); // Show only 12 initially
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);
  const [showBulkManager, setShowBulkManager] = useState(false);
  const [showSitemapManager, setShowSitemapManager] = useState(false);
  const [showGitHubSync, setShowGitHubSync] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Toggle this for admin features

  // Virtual scrolling and pagination for better performance
  const [currentPage, setCurrentPage] = useState(1);
  const lawyersPerPage = 12;
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Preload only critical images for LCP optimization
  React.useEffect(() => {
    // Preload only first 3 images for desktop LCP
    const criticalLawyers = lawyers.slice(0, 3);
    criticalLawyers.forEach((lawyer, index) => {
      if (index < 3) { // Only first 3 for desktop
        preloadImage(lawyer.image);
      }
    });
  }, []);

  // Debounced search to reduce blocking time
  const [searchDebounceTimer, setSearchDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const handleSearch = () => {
    let filtered = lawyers;
    
    if (searchTerm) {
      filtered = filtered.filter(lawyer => 
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.practiceAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedPracticeArea) {
      filtered = filtered.filter(lawyer => 
        lawyer.practiceAreas.includes(selectedPracticeArea)
      );
    }
    
    if (selectedLocation) {
      filtered = filtered.filter(lawyer => 
        lawyer.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }
    
    setFilteredLawyers(filtered);
    setDisplayedLawyers(filtered.slice(0, lawyersPerPage));
    setCurrentPage(1);
  };

  // Debounced search handler
  const handleDebouncedSearch = (term: string, practiceArea: string, location: string) => {
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }
    
    const timer = setTimeout(() => {
      setSearchTerm(term);
      setSelectedPracticeArea(practiceArea);
      setSelectedLocation(location);
    }, 300); // 300ms debounce
    
    setSearchDebounceTimer(timer);
  };

  // Load more lawyers (pagination)
  const loadMoreLawyers = React.useCallback(() => {
    if (isLoadingMore) return;
    
    setIsLoadingMore(true);
    
    // Simulate async loading to prevent blocking
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * lawyersPerPage;
      const endIndex = startIndex + lawyersPerPage;
      const newLawyers = filteredLawyers.slice(startIndex, endIndex);
      
      if (newLawyers.length > 0) {
        setDisplayedLawyers(prev => [...prev, ...newLawyers]);
        setCurrentPage(nextPage);
      }
      
      setIsLoadingMore(false);
    }, 100);
  }, [currentPage, filteredLawyers, isLoadingMore]);

  // Intersection observer for infinite scroll
  const loadMoreRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedLawyers.length < filteredLawyers.length) {
          loadMoreLawyers();
        }
      },
      { threshold: 0.1 }
    );
    
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    
    return () => observer.disconnect();
  }, [loadMoreLawyers, displayedLawyers.length, filteredLawyers.length]);

  const handleAddLawyer = (newLawyerData: Omit<Lawyer, 'id'>) => {
    const newLawyer = addLawyer(newLawyerData);
    setLawyers([...lawyers, newLawyer]);
    setFilteredLawyers([...filteredLawyers, newLawyer]);
    setDisplayedLawyers([...displayedLawyers, newLawyer]);
  };

  const handleImportLawyers = (newLawyers: Omit<Lawyer, 'id'>[]) => {
    const importedLawyers = newLawyers.map(lawyerData => addLawyer(lawyerData));
    setLawyers([...lawyers, ...importedLawyers]);
    setFilteredLawyers([...filteredLawyers, ...importedLawyers]);
    setDisplayedLawyers([...displayedLawyers, ...importedLawyers.slice(0, lawyersPerPage)]);
  };

  const handleUpdateLawyer = (id: number, updates: Partial<Lawyer>) => {
    const updatedLawyers = lawyers.map(lawyer => 
      lawyer.id === id ? { ...lawyer, ...updates } : lawyer
    );
    setLawyers(updatedLawyers);
    setFilteredLawyers(updatedLawyers.filter(lawyer => {
      if (searchTerm && !lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !lawyer.practiceAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }
      if (selectedPracticeArea && !lawyer.practiceAreas.includes(selectedPracticeArea)) {
        return false;
      }
      if (selectedLocation && !lawyer.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
      return true;
    }));
    
    // Update displayed lawyers
    const updatedDisplayed = displayedLawyers.map(lawyer => 
      lawyer.id === id ? { ...lawyer, ...updates } : lawyer
    );
    setDisplayedLawyers(updatedDisplayed);
  };

  const handleDeleteLawyer = (id: number) => {
    const updatedLawyers = lawyers.filter(lawyer => lawyer.id !== id);
    setLawyers(updatedLawyers);
    setFilteredLawyers(filteredLawyers.filter(lawyer => lawyer.id !== id));
    setDisplayedLawyers(displayedLawyers.filter(lawyer => lawyer.id !== id));
  };

  const generateSEOUrl = (lawyer: Lawyer, practiceArea: string) => {
    const practiceAreaSlug = practiceArea.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    const locationSlug = lawyer.location.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    return `/best-attorney-for-${practiceAreaSlug}-in-${locationSlug}-2025`;
  };

  const generateSEOTitle = (lawyer: Lawyer, practiceArea: string) => {
    return `Best Attorney for ${practiceArea} in ${lawyer.location} 2025`;
  };
  
  React.useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedPracticeArea, selectedLocation]);

  // Cleanup debounce timer
  React.useEffect(() => {
    return () => {
      if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
      }
    };
  }, [searchDebounceTimer]);

  if (selectedLawyer) {
    const primaryPracticeArea = selectedLawyer.practiceAreas[0];
    const seoTitle = generateSEOTitle(selectedLawyer, primaryPracticeArea);
    
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
        <nav className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Scale className="h-8 w-8 text-blue-900" />
               <button
                 onClick={() => {
                   setSelectedLawyer(null);
                   window.history.pushState({}, '', '/');
                 }}
                 className="text-xl font-bold text-gray-900 hover:text-blue-900 transition-colors"
               >
                 Attorneys-deets
               </button>
              </div>
              <button
                onClick={() => setSelectedLawyer(null)}
                className="text-blue-900 hover:text-blue-700 font-medium"
              >
                ← Back to Directory
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* SEO-Optimized H1 Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {seoTitle}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-64 bg-gradient-to-r from-blue-900 to-blue-700">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <LazyImage
                src={selectedLawyer.image} 
                alt={selectedLawyer.name}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:left-8 md:transform-none w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
                priority={true}
              />
            </div>
            
            <div className="px-4 md:px-8 py-6">
              <div className="text-center md:text-left md:ml-40 md:-mt-16 mt-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedLawyer.name}</h2>
                <p className="text-xl text-blue-900 font-semibold mb-4">
                  Specializing in {primaryPracticeArea} • {selectedLawyer.location}
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center justify-center md:justify-start w-full">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < Math.floor(selectedLawyer.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                    <span className="ml-2 text-gray-600">({selectedLawyer.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-blue-900" />
                        <a 
                          href={`tel:${selectedLawyer.phone}`} 
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md hover:shadow-lg"
                        >
                          <Phone className="h-4 w-4" />
                          <span>Call {selectedLawyer.phone}</span>
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-900" />
                        <a href={`mailto:${selectedLawyer.email}`} className="text-blue-600 hover:text-blue-800 font-medium break-all">
                          {selectedLawyer.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-blue-900" />
                        <span className="text-gray-700">{selectedLawyer.location}</span>
                      </div>
                      {selectedLawyer.verified && (
                        <div className="flex items-center space-x-3">
                          <Shield className="h-5 w-5 text-green-600" />
                          <span className="text-green-600 font-medium">Verified Attorney</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Practice Areas</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedLawyer.practiceAreas.map((area, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {area}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Specializations</h3>
                    <ul className="space-y-1">
                      {selectedLawyer.specializations.map((spec, index) => (
                        <li key={index} className="text-gray-700">• {spec}</li>
                      ))}
                    </ul>
                    
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedLawyer.bio}</p>
                </div>
                
                {/* Prominent Call to Action */}
                <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Ready to Get Legal Help?</h3>
                  <div className="flex flex-col gap-4 justify-center">
                    <a
                      href={`tel:${selectedLawyer.phone}`}
                      className="flex items-center justify-center space-x-3 bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Phone className="h-6 w-6" />
                      <span>Call {selectedLawyer.phone}</span>
                    </a>
                    <a
                      href={`mailto:${selectedLawyer.email}`}
                      className="flex items-center justify-center space-x-3 bg-green-600 text-white px-6 py-4 rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Mail className="h-6 w-6" />
                      <span>Send Email</span>
                    </a>
                  </div>
                  <p className="text-center text-gray-600 mt-3 text-sm">
                    Free consultation available • {selectedLawyer.availability} for new clients
                  </p>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Education & Experience</h3>
                  <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-blue-900" />
                      <span className="text-gray-700 text-sm md:text-base">{selectedLawyer.education}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-blue-900" />
                      <span className="text-gray-700 text-sm md:text-base">{selectedLawyer.experience} years of experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead type="homepage" />
      <SchemaMarkup 
        type="homepage"
        lawyers={lawyers}
      />
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Scale className="h-8 w-8 text-blue-900" />
             <button
               onClick={() => {
                 setSelectedLawyer(null);
                 window.history.pushState({}, '', '/');
               }}
               className="text-xl font-bold text-gray-900 hover:text-blue-900 transition-colors"
             >
               Attorneys-deets
             </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => {
                  setSelectedLawyer(null);
                  window.history.pushState({}, '', '/');
                }}
                className="text-gray-700 hover:text-blue-900 font-medium"
              >
                Find Lawyers
              </button>
              <button 
                onClick={() => {
                  setSelectedLawyer(null);
                  window.history.pushState({}, '', '/practice-areas');
                }}
                className="text-gray-700 hover:text-blue-900 font-medium"
              >
                Practice Areas
              </button>
              <button 
                onClick={() => {
                  setSelectedLawyer(null);
                  window.history.pushState({}, '', '/about-us');
                }}
                className="text-gray-700 hover:text-blue-900 font-medium"
              >
                About
              </button>
              <button 
                onClick={() => {
                  setSelectedLawyer(null);
                  window.history.pushState({}, '', '/contact-us');
                }}
                className="text-gray-700 hover:text-blue-900 font-medium"
              >
                Contact
              </button>
              <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                List Your Firm
              </button>
              {isAdmin && (
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Lawyer</span>
                </button>
              )}
              {isAdmin && (
                <button 
                  onClick={() => setShowImportForm(true)}
                  className="flex items-center space-x-2 bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Excel Import</span>
                </button>
              )}
              {isAdmin && (
                <button 
                  onClick={() => setShowBulkManager(true)}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Database className="h-4 w-4" />
                  <span>Bulk Manager</span>
                </button>
              )}
              {isAdmin && (
                <button
                  onClick={() => setShowSitemapManager(true)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>SEO Sitemap</span>
                </button>
              )}
              {isAdmin && (
                <button 
                  onClick={() => setShowSitemapManager(true)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>SEO Sitemap</span>
                </button>
              )}
              {isAdmin && (
                <button 
                  onClick={() => setShowGitHubSync(true)}
                  className="flex items-center space-x-2 bg-gray-800 text-white px-3 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub Sync</span>
                </button>
              )}
            </div>
            
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <button 
              onClick={() => {
                setSelectedLawyer(null);
                setMobileMenuOpen(false);
                window.history.pushState({}, '', '/');
              }}
              className="block py-2 text-gray-700 hover:text-blue-900 w-full text-left"
            >
              Find Lawyers
            </button>
            <button 
              onClick={() => {
                setSelectedLawyer(null);
                setMobileMenuOpen(false);
                window.history.pushState({}, '', '/practice-areas');
              }}
              className="block py-2 text-gray-700 hover:text-blue-900 w-full text-left"
            >
              Practice Areas
            </button>
            <button 
              onClick={() => {
                setSelectedLawyer(null);
                setMobileMenuOpen(false);
                window.history.pushState({}, '', '/about-us');
              }}
              className="block py-2 text-gray-700 hover:text-blue-900 w-full text-left"
            >
              About
            </button>
            <button 
              onClick={() => {
                setSelectedLawyer(null);
                setMobileMenuOpen(false);
                window.history.pushState({}, '', '/contact-us');
              }}
              className="block py-2 text-gray-700 hover:text-blue-900 w-full text-left"
            >
              Contact
            </button>
            <button className="w-full mt-2 bg-blue-900 text-white px-4 py-2 rounded-lg">
              List Your Firm
            </button>
            {isAdmin && (
              <button 
                onClick={() => setShowAddForm(true)}
                className="w-full mt-2 bg-green-600 text-white px-4 py-2 rounded-lg mb-2"
              >
                Add Lawyer
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => setShowImportForm(true)}
                className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg mb-2"
              >
                Excel Import
              </button>
            )}
            {isAdmin && (
              <button 
                onClick={() => setShowBulkManager(true)}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg"
              >
                Bulk Manager
              </button>
            )}
            {isAdmin && (
              <button 
                onClick={() => setShowSitemapManager(true)}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                SEO Sitemap
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find the Right Lawyer<br />
              <span className="text-yellow-400">For Your Case</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with experienced attorneys in your area
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-2xl">
              <div className="grid md:grid-cols-3 gap-4">
                
                <select
                  defaultValue={selectedPracticeArea}
                  onChange={(e) => handleDebouncedSearch(searchTerm, e.target.value, selectedLocation)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="">All Practice Areas</option>
                  {practiceAreas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                
                <input
                  type="text"
                  placeholder="Location..."
                  defaultValue={selectedLocation}
                  onChange={(e) => handleDebouncedSearch(searchTerm, selectedPracticeArea, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
                
                <button
                  onClick={handleSearch}
                  className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
                >
                  Search Lawyers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredLawyers.length} Lawyers Found {displayedLawyers.length < filteredLawyers.length && `(Showing ${displayedLawyers.length})`}
          </h2>
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Lawyer</span>
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => setShowImportForm(true)}
                className="flex items-center space-x-2 bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <FileSpreadsheet className="h-4 w-4" />
                <span>Excel Import</span>
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => setShowBulkManager(true)}
                className="flex items-center space-x-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Database className="h-4 w-4" />
                <span>Bulk Manager</span>
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-blue-900 hover:text-blue-700"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Lawyer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedLawyers.map((lawyer, index) => (
            <div 
              key={lawyer.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
              onClick={() => {
                setSelectedLawyer(lawyer);
                // Update URL without page reload for SEO
                const primaryPracticeArea = lawyer.practiceAreas[0];
                const seoUrl = generateSEOUrl(lawyer, primaryPracticeArea);
                window.history.pushState({}, '', seoUrl);
              }}
            >
              <div className="relative h-48">
                <LazyImage
                  src={lawyer.image} 
                  alt={lawyer.name}
                  className="w-full h-full object-cover"
                  priority={index < 3} // Only first 3 for desktop LCP
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-medium">{lawyer.rating}</span>
                  </div>
                  {lawyer.verified && (
                    <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                      <Shield className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{lawyer.name}</h3>
                <div className="flex items-center space-x-2 text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{lawyer.location}</span>
                  <span className="text-sm">• {lawyer.experience} years</span>
                  {lawyer.availability && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      lawyer.availability === 'Available' ? 'bg-green-100 text-green-800' :
                      lawyer.availability === 'Limited' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {lawyer.availability}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {lawyer.practiceAreas.slice(0, 2).map((area, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {area}
                    </span>
                  ))}
                  {lawyer.practiceAreas.length > 2 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      +{lawyer.practiceAreas.length - 2} more
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{lawyer.bio}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <a
                      href={`tel:${lawyer.phone}`}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
                    >
                      <Phone className="h-4 w-4" />
                      <span>{lawyer.phone}</span>
                    </a>
                  </div>
                  <span className="text-blue-900 font-medium hover:text-blue-700">View Profile →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Trigger */}
        {displayedLawyers.length < filteredLawyers.length && (
          <div ref={loadMoreRef} className="text-center py-8">
            {isLoadingMore ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-900"></div>
                <span className="text-gray-600">Loading more lawyers...</span>
              </div>
            ) : (
              <button
                onClick={loadMoreLawyers}
                className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Load More Lawyers ({filteredLawyers.length - displayedLawyers.length} remaining)
              </button>
            )}
          </div>
        )}

        {filteredLawyers.length === 0 && displayedLawyers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Scale className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No lawyers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all lawyers.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Scale className="h-8 w-8 text-yellow-400" />
               <button
                 onClick={() => {
                   setSelectedLawyer(null);
                   window.history.pushState({}, '', '/');
                 }}
                 className="text-xl font-bold hover:text-yellow-300 transition-colors"
               >
                 Attorneys-deets
               </button>
              </div>
              <p className="text-gray-400">
                Connecting clients with qualified legal professionals nationwide.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Practice Areas</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Corporate Law</a></li>
                <li><a href="#" className="hover:text-white">Criminal Defense</a></li>
                <li><a href="#" className="hover:text-white">Family Law</a></li>
                <li><a href="#" className="hover:text-white">Personal Injury</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about-us" className="hover:text-white">About Us</a></li>
                <li><a href="/contact-us" className="hover:text-white">Contact Us</a></li>
                <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms-conditions" className="hover:text-white">Terms & Conditions</a></li>
                <li><a href="/disclaimer" className="hover:text-white">Disclaimer</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">For Lawyers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Join Our Network</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
                <li><a href="#" className="hover:text-white">Login</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Attorneys-deets. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add Lawyer Form Modal */}
      <React.Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div></div>}>
        {showAddForm && (
          <AddLawyerForm
            onAddLawyer={handleAddLawyer}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </React.Suspense>

      {/* Excel Import Modal */}
      <React.Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div></div>}>
        {showImportForm && (
          <ExcelImport
            onImportLawyers={handleImportLawyers}
            onClose={() => setShowImportForm(false)}
          />
        )}
      </React.Suspense>

      {/* Bulk Data Manager Modal */}
      <React.Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div></div>}>
        {showBulkManager && (
          <BulkDataManager
            lawyers={lawyers}
            onImportLawyers={handleImportLawyers}
            onUpdateLawyer={handleUpdateLawyer}
            onDeleteLawyer={handleDeleteLawyer}
            onClose={() => setShowBulkManager(false)}
          />
        )}
      </React.Suspense>

      {/* Sitemap Manager Modal */}
      <React.Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div></div>}>
        {showSitemapManager && (
          <SitemapManager
            lawyers={lawyers}
            onClose={() => setShowSitemapManager(false)}
          />
        )}
      </React.Suspense>

      {/* GitHub Sync Modal */}
      <React.Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div></div>}>
        {showGitHubSync && (
          <GitHubSync
            lawyers={lawyers}
            onSyncFromGitHub={handleImportLawyers}
            onClose={() => setShowGitHubSync(false)}
          />
        )}
      </React.Suspense>
    </div>
  );
}

export default App;