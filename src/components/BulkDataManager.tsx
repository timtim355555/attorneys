import React, { useState, useRef } from 'react';
import { Upload, Download, FileSpreadsheet, X, AlertCircle, CheckCircle, Database, Globe, Users, BarChart3, Search, Filter, Trash2, Edit, Eye } from 'lucide-react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Lawyer } from '../types/lawyer';

interface BulkDataManagerProps {
  lawyers: Lawyer[];
  onImportLawyers: (lawyers: Omit<Lawyer, 'id'>[]) => void;
  onUpdateLawyer: (id: number, updates: Partial<Lawyer>) => void;
  onDeleteLawyer: (id: number) => void;
  onClose: () => void;
}

interface ImportStats {
  total: number;
  successful: number;
  failed: number;
  duplicates: number;
}

export const BulkDataManager: React.FC<BulkDataManagerProps> = ({ 
  lawyers, 
  onImportLawyers, 
  onUpdateLawyer, 
  onDeleteLawyer, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'import' | 'manage' | 'export'>('import');
  const [dragActive, setDragActive] = useState(false);
  const [importData, setImportData] = useState<any[]>([]);
  const [importStats, setImportStats] = useState<ImportStats | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLawyers, setSelectedLawyers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter lawyers based on search
  const filteredLawyers = lawyers.filter(lawyer =>
    lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lawyer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lawyer.practiceAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(filteredLawyers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLawyers = filteredLawyers.slice(startIndex, startIndex + itemsPerPage);

  const downloadBulkTemplate = () => {
    const template = Array.from({ length: 10 }, (_, i) => ({
      name: `Lawyer ${i + 1}`,
      image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg',
      practiceAreas: 'Corporate Law,Business Law',
      experience: 10 + i,
      location: 'City, State',
      phone: `(555) ${String(123 + i).padStart(3, '0')}-4567`,
      email: `lawyer${i + 1}@lawfirm.com`,
      rating: 4.5 + (i % 5) * 0.1,
      reviews: 50 + i * 10,
      education: 'Law School, JD',
      bio: `Partner at Law Firm ${i + 1} specializing in various legal matters with ${10 + i} years of practice.`,
      specializations: 'Litigation,Contract Law,Business Formation',
      website: `https://lawfirm${i + 1}.com`,
      barNumber: `ST${String(123456 + i).padStart(6, '0')}`,
      languages: 'English,Spanish',
      hourlyRate: '$300-500',
      availability: ['Available', 'Limited', 'Busy'][i % 3],
      verified: i % 2 === 0 ? 'TRUE' : 'FALSE'
    }));

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bulk Lawyers Import');
    XLSX.writeFile(wb, 'bulk_lawyers_template.xlsx');
  };

  const exportAllLawyers = () => {
    const exportData = lawyers.map(lawyer => ({
      id: lawyer.id,
      name: lawyer.name,
      image: lawyer.image,
      practiceAreas: lawyer.practiceAreas.join(','),
      experience: lawyer.experience,
      location: lawyer.location,
      phone: lawyer.phone,
      email: lawyer.email,
      rating: lawyer.rating,
      reviews: lawyer.reviews,
      education: lawyer.education,
      bio: lawyer.bio,
      specializations: lawyer.specializations?.join(',') || '',
      website: lawyer.website || '',
      barNumber: lawyer.barNumber || '',
      languages: lawyer.languages?.join(',') || 'English',
      hourlyRate: lawyer.hourlyRate || '',
      availability: lawyer.availability || 'Available',
      verified: lawyer.verified ? 'TRUE' : 'FALSE'
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'All Lawyers Data');
    XLSX.writeFile(wb, `lawyers_export_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const processBulkFile = (file: File) => {
    setIsProcessing(true);
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    const processData = (data: any[]) => {
      const stats: ImportStats = {
        total: data.length,
        successful: 0,
        failed: 0,
        duplicates: 0
      };

      const validData: any[] = [];
      const existingEmails = new Set(lawyers.map(l => l.email.toLowerCase()));

      data.forEach((row, index) => {
        try {
          // Check for duplicates
          if (existingEmails.has(row.email?.toLowerCase())) {
            stats.duplicates++;
            return;
          }

          // Basic validation
          if (!row.name || !row.email || !row.practiceAreas) {
            stats.failed++;
            return;
          }

          validData.push({
            name: row.name?.toString().trim() || '',
            image: row.image?.toString().trim() || 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg',
            practiceAreas: row.practiceAreas ? row.practiceAreas.toString().split(',').map((area: string) => area.trim()) : [],
            experience: parseInt(row.experience) || 0,
            location: row.location?.toString().trim() || '',
            phone: row.phone?.toString().trim() || '',
            email: row.email?.toString().trim() || '',
            rating: parseFloat(row.rating) || 5.0,
            reviews: parseInt(row.reviews) || 0,
            education: row.education?.toString().trim() || '',
            bio: row.bio?.toString().trim() || '',
            specializations: row.specializations ? row.specializations.toString().split(',').map((spec: string) => spec.trim()) : [],
            website: row.website?.toString().trim() || '',
            barNumber: row.barNumber?.toString().trim() || '',
            languages: row.languages ? row.languages.toString().split(',').map((lang: string) => lang.trim()) : ['English'],
            hourlyRate: row.hourlyRate?.toString().trim() || '',
            availability: (row.availability?.toString().trim() as 'Available' | 'Busy' | 'Limited') || 'Available',
            verified: row.verified?.toString().toLowerCase() === 'true' || false
          });

          stats.successful++;
        } catch (error) {
          stats.failed++;
        }
      });

      setImportData(validData);
      setImportStats(stats);
      setIsProcessing(false);
    };

    if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => processData(results.data),
        error: () => setIsProcessing(false)
      });
    } else if (['xlsx', 'xls'].includes(fileExtension || '')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          processData(jsonData);
        } catch (error) {
          setIsProcessing(false);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processBulkFile(e.dataTransfer.files[0]);
    }
  };

  const handleBulkImport = () => {
    if (importData.length > 0) {
      onImportLawyers(importData);
      setImportData([]);
      setImportStats(null);
      setActiveTab('manage');
    }
  };

  const handleSelectAll = () => {
    if (selectedLawyers.length === paginatedLawyers.length) {
      setSelectedLawyers([]);
    } else {
      setSelectedLawyers(paginatedLawyers.map(l => l.id));
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedLawyers.length} lawyers?`)) {
      selectedLawyers.forEach(id => onDeleteLawyer(id));
      setSelectedLawyers([]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Database className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Bulk Data Manager</h2>
            <span className="bg-blue-800 px-3 py-1 rounded-full text-sm">
              {lawyers.length.toLocaleString()} lawyers
            </span>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'import', label: 'Bulk Import', icon: Upload },
              { id: 'manage', label: 'Manage Data', icon: Users },
              { id: 'export', label: 'Export Data', icon: Download }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
          {/* Import Tab */}
          {activeTab === 'import' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Database className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Total Lawyers</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{lawyers.length.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Capacity</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">100K</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-900">Usage</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">{((lawyers.length / 100000) * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">Ready to Import</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{importData.length}</p>
                </div>
              </div>

              {/* Template Download */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <FileSpreadsheet className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-blue-900">Bulk Import Template</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Download our optimized template for importing up to 100,000 lawyers efficiently.
                    </p>
                    <button
                      onClick={downloadBulkTemplate}
                      className="mt-2 flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Bulk Template (10 sample rows)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Upload Large Dataset
                </h3>
                <p className="text-gray-600 mb-4">
                  Supports files up to 100,000 lawyers • CSV, XLSX, XLS formats
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Choose File'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => e.target.files?.[0] && processBulkFile(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {/* Import Stats */}
              {importStats && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-green-900">Import Analysis Complete</h3>
                      <div className="grid grid-cols-4 gap-4 mt-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{importStats.total}</p>
                          <p className="text-sm text-gray-600">Total Records</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{importStats.successful}</p>
                          <p className="text-sm text-gray-600">Valid</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-red-600">{importStats.failed}</p>
                          <p className="text-sm text-gray-600">Failed</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-yellow-600">{importStats.duplicates}</p>
                          <p className="text-sm text-gray-600">Duplicates</p>
                        </div>
                      </div>
                      <button
                        onClick={handleBulkImport}
                        disabled={importStats.successful === 0}
                        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300"
                      >
                        Import {importStats.successful} Lawyers
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Manage Tab */}
          {activeTab === 'manage' && (
            <div className="space-y-6">
              {/* Search and Actions */}
              <div className="flex justify-between items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search lawyers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  {selectedLawyers.length > 0 && (
                    <button
                      onClick={handleBulkDelete}
                      className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete ({selectedLawyers.length})</span>
                    </button>
                  )}
                  <button
                    onClick={handleSelectAll}
                    className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                  >
                    <span>{selectedLawyers.length === paginatedLawyers.length ? 'Deselect All' : 'Select All'}</span>
                  </button>
                </div>
              </div>

              {/* Lawyers Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            checked={selectedLawyers.length === paginatedLawyers.length && paginatedLawyers.length > 0}
                            onChange={handleSelectAll}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Practice Areas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedLawyers.map((lawyer) => (
                        <tr key={lawyer.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedLawyers.includes(lawyer.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedLawyers([...selectedLawyers, lawyer.id]);
                                } else {
                                  setSelectedLawyers(selectedLawyers.filter(id => id !== lawyer.id));
                                }
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img className="h-10 w-10 rounded-full object-cover" src={lawyer.image} alt="" />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{lawyer.name}</div>
                                <div className="text-sm text-gray-500">{lawyer.experience} years exp.</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lawyer.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lawyer.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {lawyer.practiceAreas.slice(0, 2).map((area, idx) => (
                                <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                  {area}
                                </span>
                              ))}
                              {lawyer.practiceAreas.length > 2 && (
                                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                  +{lawyer.practiceAreas.length - 2}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              lawyer.verified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {lawyer.verified ? 'Verified' : 'Unverified'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <a
                                href={`tel:${lawyer.phone}`}
                                className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                title="Call lawyer"
                              >
                                <Phone className="h-4 w-4" />
                              </a>
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => onDeleteLawyer(lawyer.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredLawyers.length)}</span> of{' '}
                        <span className="font-medium">{filteredLawyers.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100"
                        >
                          Previous
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = i + 1;
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === page
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Export Tab */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Download className="h-6 w-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-900">Export All Data</h3>
                  </div>
                  <p className="text-blue-700 mb-4">
                    Download complete database of all {lawyers.length.toLocaleString()} lawyers in Excel format.
                  </p>
                  <button
                    onClick={exportAllLawyers}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Export All Lawyers
                  </button>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Filter className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-900">Filtered Export</h3>
                  </div>
                  <p className="text-green-700 mb-4">
                    Export only the lawyers matching your current search and filter criteria.
                  </p>
                  <button
                    onClick={() => {
                      const exportData = filteredLawyers.map(lawyer => ({
                        id: lawyer.id,
                        name: lawyer.name,
                        email: lawyer.email,
                        location: lawyer.location,
                        practiceAreas: lawyer.practiceAreas.join(','),
                        experience: lawyer.experience,
                        verified: lawyer.verified ? 'TRUE' : 'FALSE'
                      }));
                      const ws = XLSX.utils.json_to_sheet(exportData);
                      const wb = XLSX.utils.book_new();
                      XLSX.utils.book_append_sheet(wb, ws, 'Filtered Lawyers');
                      XLSX.writeFile(wb, `filtered_lawyers_${new Date().toISOString().split('T')[0]}.xlsx`);
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    Export Filtered ({filteredLawyers.length})
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <FileSpreadsheet className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-medium">Excel Format</p>
                      <p className="text-sm text-gray-600">Full data with formatting</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium">CSV Format</p>
                      <p className="text-sm text-gray-600">Raw data for processing</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="font-medium">API Export</p>
                      <p className="text-sm text-gray-600">JSON format for APIs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};