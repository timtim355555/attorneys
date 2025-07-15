import React, { useState, useRef } from 'react';
import { Upload, Download, FileSpreadsheet, X, AlertCircle, CheckCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Lawyer } from '../types/lawyer';

interface ExcelImportProps {
  onImportLawyers: (lawyers: Omit<Lawyer, 'id'>[]) => void;
  onClose: () => void;
}

interface ImportError {
  row: number;
  field: string;
  message: string;
}

export const ExcelImport: React.FC<ExcelImportProps> = ({ onImportLawyers, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [importData, setImportData] = useState<any[]>([]);
  const [errors, setErrors] = useState<ImportError[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadTemplate = () => {
    const template = [
      {
        name: 'John Smith',
        image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg',
        practiceAreas: 'Corporate Law,Business Law',
        experience: 15,
        location: 'New York, NY',
        phone: '(555) 123-4567',
        email: 'john.smith@smithlaw.com',
        rating: 4.8,
        reviews: 125,
        education: 'Harvard Law School, JD',
        bio: 'Senior partner at Smith & Associates with expertise in mergers and acquisitions.',
        specializations: 'M&A,Securities,Corporate Governance',
        website: 'https://smithlaw.com',
        barNumber: 'NY123456',
        languages: 'English,Spanish',
        hourlyRate: '$500-750',
        availability: 'Available',
        verified: 'TRUE'
      },
      {
        name: 'Sarah Johnson',
        image: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg',
        practiceAreas: 'Criminal Defense,DUI Defense',
        experience: 12,
        location: 'Los Angeles, CA',
        phone: '(555) 234-5678',
        email: 'sarah.johnson@defenselawca.com',
        rating: 4.9,
        reviews: 89,
        education: 'UCLA School of Law, JD',
        bio: 'Experienced criminal defense attorney with proven track record in complex cases.',
        specializations: 'White Collar Crime,Federal Defense,DUI',
        website: 'https://defenselawca.com',
        barNumber: 'CA789012',
        languages: 'English,Spanish',
        hourlyRate: '$450-600',
        availability: 'Limited',
        verified: 'TRUE'
      },
      {
        name: 'Michael Davis',
        image: 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg',
        practiceAreas: 'Family Law,Divorce',
        experience: 18,
        location: 'Chicago, IL',
        phone: '(555) 345-6789',
        email: 'michael.davis@familylawil.com',
        rating: 4.7,
        reviews: 156,
        education: 'Northwestern University School of Law, JD',
        bio: 'Compassionate family law attorney helping families through difficult transitions.',
        specializations: 'Divorce,Child Custody,Adoption',
        website: 'https://familylawil.com',
        barNumber: 'IL345678',
        languages: 'English',
        hourlyRate: '$350-500',
        availability: 'Available',
        verified: 'TRUE'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Lawyers Template');
    XLSX.writeFile(wb, 'lawyers_excel_template.xlsx');
  };

  const downloadBulkTemplate = () => {
    // Generate 50 sample lawyers for bulk upload
    const bulkTemplate = Array.from({ length: 50 }, (_, i) => ({
      name: `Attorney ${i + 1}`,
      image: `https://images.pexels.com/photos/${5668473 + (i % 10)}/pexels-photo-${5668473 + (i % 10)}.jpeg`,
      practiceAreas: [
        'Corporate Law,Business Law',
        'Criminal Defense,DUI Defense', 
        'Family Law,Divorce',
        'Personal Injury,Medical Malpractice',
        'Real Estate Law,Property Law',
        'Immigration Law,Citizenship',
        'Tax Law,IRS Defense',
        'Employment Law,Workplace Rights',
        'Intellectual Property,Patent Law',
        'Estate Planning,Probate'
      ][i % 10],
      experience: 5 + (i % 20),
      location: [
        'New York, NY',
        'Los Angeles, CA',
        'Chicago, IL',
        'Houston, TX',
        'Phoenix, AZ',
        'Philadelphia, PA',
        'San Antonio, TX',
        'San Diego, CA',
        'Dallas, TX',
        'San Jose, CA'
      ][i % 10],
      phone: `(555) ${String(100 + i).padStart(3, '0')}-${String(1000 + i).padStart(4, '0')}`,
      email: `attorney${i + 1}@lawfirm${i + 1}.com`,
      rating: 4.0 + (i % 10) * 0.1,
      reviews: 25 + (i * 3),
      education: [
        'Harvard Law School, JD',
        'Yale Law School, JD',
        'Stanford Law School, JD',
        'Columbia Law School, JD',
        'NYU School of Law, JD',
        'University of Chicago Law School, JD',
        'Georgetown University Law Center, JD',
        'Northwestern University School of Law, JD',
        'UCLA School of Law, JD',
        'University of Michigan Law School, JD'
      ][i % 10],
      bio: `Experienced attorney with ${5 + (i % 20)} years of practice specializing in various legal matters. Committed to providing excellent legal representation and achieving the best outcomes for clients.`,
      specializations: [
        'M&A,Securities,Corporate Governance',
        'White Collar Crime,Federal Defense,DUI',
        'Divorce,Child Custody,Adoption',
        'Medical Malpractice,Car Accidents,Workplace Injuries',
        'Real Estate Closings,Property Disputes,Commercial Real Estate',
        'Family Immigration,Employment Visas,Citizenship',
        'IRS Defense,Tax Litigation,Tax Planning',
        'Workplace Discrimination,Wrongful Termination,Wage Disputes',
        'Patent Prosecution,IP Litigation,Software Patents',
        'Wills & Trusts,Probate Administration,Elder Law'
      ][i % 10],
      website: `https://lawfirm${i + 1}.com`,
      barNumber: `ST${String(100000 + i).padStart(6, '0')}`,
      languages: i % 3 === 0 ? 'English,Spanish' : i % 3 === 1 ? 'English,French' : 'English',
      hourlyRate: `$${300 + (i % 5) * 50}-${500 + (i % 5) * 100}`,
      availability: ['Available', 'Limited', 'Busy'][i % 3],
      verified: i % 2 === 0 ? 'TRUE' : 'FALSE'
    }));

    const ws = XLSX.utils.json_to_sheet(bulkTemplate);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bulk Lawyers Import');
    XLSX.writeFile(wb, 'bulk_lawyers_50_template.xlsx');
  };

  const validateLawyerData = (data: any[], startRow: number = 2): ImportError[] => {
    const errors: ImportError[] = [];
    const requiredFields = ['name', 'practiceAreas', 'experience', 'location', 'phone', 'email', 'education', 'bio'];

    data.forEach((row, index) => {
      const rowNumber = startRow + index;

      // Check required fields
      requiredFields.forEach(field => {
        if (!row[field] || row[field].toString().trim() === '') {
          errors.push({
            row: rowNumber,
            field,
            message: `${field} is required`
          });
        }
      });

      // Validate email format
      if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
        errors.push({
          row: rowNumber,
          field: 'email',
          message: 'Invalid email format'
        });
      }

      // Validate phone format
      if (row.phone && !/^\(\d{3}\)\s\d{3}-\d{4}$/.test(row.phone)) {
        errors.push({
          row: rowNumber,
          field: 'phone',
          message: 'Phone should be in format: (555) 123-4567'
        });
      }

      // Validate experience
      if (row.experience && (isNaN(row.experience) || row.experience < 0)) {
        errors.push({
          row: rowNumber,
          field: 'experience',
          message: 'Experience must be a positive number'
        });
      }

      // Validate rating
      if (row.rating && (isNaN(row.rating) || row.rating < 0 || row.rating > 5)) {
        errors.push({
          row: rowNumber,
          field: 'rating',
          message: 'Rating must be between 0 and 5'
        });
      }

      // Validate availability
      if (row.availability && !['Available', 'Busy', 'Limited'].includes(row.availability)) {
        errors.push({
          row: rowNumber,
          field: 'availability',
          message: 'Availability must be: Available, Busy, or Limited'
        });
      }
    });

    return errors;
  };

  const transformData = (data: any[]): Omit<Lawyer, 'id'>[] => {
    return data.map(row => ({
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
    }));
  };

  const processFile = (file: File) => {
    setIsProcessing(true);
    setErrors([]);

    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const validationErrors = validateLawyerData(results.data);
          if (validationErrors.length > 0) {
            setErrors(validationErrors);
          } else {
            const transformedData = transformData(results.data);
            setImportData(transformedData);
          }
          setIsProcessing(false);
        },
        error: (error) => {
          setErrors([{ row: 0, field: 'file', message: `CSV parsing error: ${error.message}` }]);
          setIsProcessing(false);
        }
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

          const validationErrors = validateLawyerData(jsonData);
          if (validationErrors.length > 0) {
            setErrors(validationErrors);
          } else {
            const transformedData = transformData(jsonData);
            setImportData(transformedData);
          }
        } catch (error) {
          setErrors([{ row: 0, field: 'file', message: `Excel parsing error: ${error}` }]);
        }
        setIsProcessing(false);
      };
      reader.readAsArrayBuffer(file);
    } else {
      setErrors([{ row: 0, field: 'file', message: 'Please upload a CSV or Excel file (.csv, .xlsx, .xls)' }]);
      setIsProcessing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (importData.length > 0) {
      onImportLawyers(importData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Import Lawyers from Excel/CSV</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Download Templates */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <FileSpreadsheet className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-blue-900">Sample Template (3 lawyers)</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Perfect for testing and understanding the format.
                  </p>
                  <button
                    onClick={downloadTemplate}
                    className="mt-2 flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Sample Template</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <FileSpreadsheet className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-green-900">Bulk Template (50 lawyers)</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Ready-to-use template with 50 sample lawyers for bulk import.
                  </p>
                  <button
                    onClick={downloadBulkTemplate}
                    className="mt-2 flex items-center space-x-2 text-green-600 hover:text-green-800 font-medium"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Bulk Template</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload your Excel or CSV file
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your file here, or click to browse
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Choose File'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
            />
            <p className="text-sm text-gray-500 mt-2">
              Supports CSV, XLSX, and XLS files • Up to 10,000 lawyers
            </p>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-900">
                    Validation Errors ({errors.length})
                  </h3>
                  <div className="mt-2 max-h-40 overflow-y-auto">
                    {errors.slice(0, 10).map((error, index) => (
                      <p key={index} className="text-sm text-red-700">
                        Row {error.row}, {error.field}: {error.message}
                      </p>
                    ))}
                    {errors.length > 10 && (
                      <p className="text-sm text-red-700 font-medium">
                        ... and {errors.length - 10} more errors
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Preview */}
          {importData.length > 0 && errors.length === 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-green-900">
                    Ready to Import ({importData.length} lawyers)
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    All data has been validated successfully. Click "Import Lawyers" to add them to your directory.
                  </p>
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-green-900 mb-2">Preview:</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {importData.slice(0, 5).map((lawyer, index) => (
                        <div key={index} className="text-sm text-green-700 bg-white p-2 rounded border">
                          <strong>{lawyer.name}</strong> - {lawyer.practiceAreas.join(', ')} - {lawyer.location}
                        </div>
                      ))}
                      {importData.length > 5 && (
                        <p className="text-sm text-green-700 font-medium">
                          ... and {importData.length - 5} more lawyers
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Required Fields Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Required Fields</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>• name</div>
              <div>• practiceAreas (comma-separated)</div>
              <div>• experience (number)</div>
              <div>• location</div>
              <div>• phone</div>
              <div>• email</div>
              <div>• education</div>
              <div>• bio</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Optional fields: image, rating, reviews, specializations, website, barNumber, languages, hourlyRate, availability, verified
            </p>
          </div>

          {/* GitHub Integration Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-yellow-900 mb-2">GitHub Integration</h3>
            <p className="text-sm text-yellow-700">
              After importing, use the "GitHub Sync" feature to upload your lawyers data to GitHub. 
              This enables automatic deployment to your live website whenever you make changes.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={importData.length === 0 || errors.length > 0}
              className="flex items-center gap-2 px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Upload className="h-4 w-4" />
              Import {importData.length > 0 ? `${importData.length} ` : ''}Lawyers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};