import React, { useState } from 'react';
import { Plus, X, Save } from 'lucide-react';
import { Lawyer } from '../types/lawyer';

interface AddLawyerFormProps {
  onAddLawyer: (lawyer: Omit<Lawyer, 'id'>) => void;
  onClose: () => void;
}

const practiceAreaOptions = [
  "Personal Injury", "Criminal Defense", "Family Law", "DUI/DWI", 
  "Business Law", "Real Estate Law", "Immigration Law", "Employment Law",
  "Bankruptcy Law", "Estate Planning", "Tax Law", "Medical Malpractice",
  "Intellectual Property", "Corporate Law", "Workers' Compensation", 
  "Social Security Disability", "Environmental Law", "Healthcare Law",
  "Securities Law", "Construction Law", "Elder Law", "Insurance Law",
  "Education Law", "Aviation Law", "Entertainment Law", "Military Law",
  "Consumer Protection", "Civil Rights", "Nonprofit Law", "Energy Law",
  "Privacy Law", "Maritime Law", "Cybersecurity Law"
];

export const AddLawyerForm: React.FC<AddLawyerFormProps> = ({ onAddLawyer, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    practiceAreas: [] as string[],
    experience: 0,
    location: '',
    phone: '',
    email: '',
    rating: 5.0,
    reviews: 0,
    education: '',
    bio: '',
    specializations: [] as string[],
    website: '',
    barNumber: '',
    languages: [] as string[],
    hourlyRate: '',
    availability: 'Available' as 'Available' | 'Busy' | 'Limited',
    verified: false
  });

  const [newPracticeArea, setNewPracticeArea] = useState('');
  const [newSpecialization, setNewSpecialization] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLawyer(formData);
    onClose();
  };

  const addPracticeArea = () => {
    if (newPracticeArea && !formData.practiceAreas.includes(newPracticeArea)) {
      setFormData(prev => ({
        ...prev,
        practiceAreas: [...prev.practiceAreas, newPracticeArea]
      }));
      setNewPracticeArea('');
    }
  };

  const removePracticeArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      practiceAreas: prev.practiceAreas.filter(a => a !== area)
    }));
  };

  const addSpecialization = () => {
    if (newSpecialization && !formData.specializations.includes(newSpecialization)) {
      setFormData(prev => ({
        ...prev,
        specializations: [...prev.specializations, newSpecialization]
      }));
      setNewSpecialization('');
    }
  };

  const removeSpecialization = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.filter(s => s !== spec)
    }));
  };

  const addLanguage = () => {
    if (newLanguage && !formData.languages.includes(newLanguage)) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (lang: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== lang)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Add New Lawyer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/firm-logo.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Enter the URL for your law firm's logo or professional image
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education *</label>
                <input
                  type="text"
                  required
                  value={formData.education}
                  onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                  placeholder="Law School, Degree"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://lawfirm.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bar Number</label>
                <input
                  type="text"
                  value={formData.barNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, barNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate</label>
                <input
                  type="text"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                  placeholder="$300-500"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Available">Available</option>
                  <option value="Limited">Limited</option>
                  <option value="Busy">Busy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio *</label>
            <textarea
              required
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Practice Areas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Practice Areas *</label>
            <div className="flex gap-2 mb-2">
              <select
                value={newPracticeArea}
                onChange={(e) => setNewPracticeArea(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a practice area</option>
                {practiceAreaOptions.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={addPracticeArea}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.practiceAreas.map(area => (
                <span key={area} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {area}
                  <button type="button" onClick={() => removePracticeArea(area)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Specializations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specializations</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSpecialization}
                onChange={(e) => setNewSpecialization(e.target.value)}
                placeholder="Add specialization"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addSpecialization}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specializations.map(spec => (
                <span key={spec} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {spec}
                  <button type="button" onClick={() => removeSpecialization(spec)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Add language"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addLanguage}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.languages.map(lang => (
                <span key={lang} className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {lang}
                  <button type="button" onClick={() => removeLanguage(lang)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Verification */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="verified"
              checked={formData.verified}
              onChange={(e) => setFormData(prev => ({ ...prev, verified: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="verified" className="ml-2 block text-sm text-gray-900">
              Verified Attorney
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
            >
              <Save className="h-4 w-4" />
              Add Lawyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};