import React, { useState } from 'react';
import { Download, Globe, Search, FileText, X, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { Lawyer } from '../types/lawyer';
import { generateSitemap, downloadSitemap, downloadRobotsTxt } from '../utils/sitemapGenerator';

interface SitemapManagerProps {
  lawyers: Lawyer[];
  onClose: () => void;
}

export const SitemapManager: React.FC<SitemapManagerProps> = ({ lawyers, onClose }) => {
  const [baseUrl, setBaseUrl] = useState('https://precious-sherbet-ca08de.netlify.app');
  const [sitemapPreview, setSitemapPreview] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const generatePreview = () => {
    const sitemap = generateSitemap(lawyers, baseUrl);
    setSitemapPreview(sitemap);
    setShowPreview(true);
  };

  const handleDownloadSitemap = () => {
    downloadSitemap(lawyers, 'sitemap.xml');
  };

  const handleDownloadRobots = () => {
    downloadRobotsTxt('robots.txt');
  };

  const totalUrls = lawyers.length + 
    [...new Set(lawyers.flatMap(lawyer => lawyer.practiceAreas))].length +
    [...new Set(lawyers.map(lawyer => lawyer.location))].length +
    5; // Static pages

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <Globe className="h-6 w-6" />
            <h2 className="text-2xl font-bold">SEO Sitemap Manager</h2>
            <span className="bg-green-700 px-3 py-1 rounded-full text-sm">
              {totalUrls.toLocaleString()} URLs
            </span>
          </div>
          <button onClick={onClose} className="text-green-200 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{lawyers.length}</div>
              <div className="text-sm text-blue-800">Lawyer Profiles</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {[...new Set(lawyers.flatMap(lawyer => lawyer.practiceAreas))].length}
              </div>
              <div className="text-sm text-green-800">Practice Areas</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {[...new Set(lawyers.map(lawyer => lawyer.location))].length}
              </div>
              <div className="text-sm text-purple-800">Locations</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{totalUrls}</div>
              <div className="text-sm text-orange-800">Total URLs</div>
            </div>
          </div>

          {/* Configuration */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sitemap Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website Base URL
                </label>
                <input
                  type="url"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://yourdomain.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Enter your custom domain URL. This will be used for all sitemap URLs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={generatePreview}
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <Search className="h-4 w-4" />
                  <span>Preview Sitemap</span>
                </button>
                <button
                  onClick={handleDownloadSitemap}
                  className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <Download className="h-4 w-4" />
                  <span>Download sitemap.xml</span>
                </button>
              </div>
            </div>
          </div>

          {/* URL Structure Preview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">URL Structure</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Static Pages (5 URLs)</h4>
                <div className="bg-gray-50 p-3 rounded text-sm font-mono space-y-1">
                  <div>{baseUrl}/</div>
                  <div>{baseUrl}/lawyers</div>
                  <div>{baseUrl}/practice-areas</div>
                  <div>{baseUrl}/about</div>
                  <div>{baseUrl}/contact</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  Lawyer Profiles ({lawyers.length} URLs)
                </h4>
                <div className="bg-gray-50 p-3 rounded text-sm font-mono space-y-1">
                  {lawyers.slice(0, 3).map(lawyer => {
                    const slug = lawyer.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
                    return (
                      <div key={lawyer.id}>{baseUrl}/lawyer/{lawyer.id}/{slug}</div>
                    );
                  })}
                  {lawyers.length > 3 && <div className="text-gray-600">... and {lawyers.length - 3} more</div>}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  Practice Area Pages ({[...new Set(lawyers.flatMap(lawyer => lawyer.practiceAreas))].length} URLs)
                </h4>
                <div className="bg-gray-50 p-3 rounded text-sm font-mono space-y-1">
                  {[...new Set(lawyers.flatMap(lawyer => lawyer.practiceAreas))].slice(0, 3).map(area => {
                    const slug = area.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
                    return (
                      <div key={area}>{baseUrl}/practice-area/{slug}</div>
                    );
                  })}
                  <div className="text-gray-600">... and more</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  Location Pages ({[...new Set(lawyers.map(lawyer => lawyer.location))].length} URLs)
                </h4>
                <div className="bg-gray-50 p-3 rounded text-sm font-mono space-y-1">
                  {[...new Set(lawyers.map(lawyer => lawyer.location))].slice(0, 3).map(location => {
                    const slug = location.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
                    return (
                      <div key={location}>{baseUrl}/lawyers-in/{slug}</div>
                    );
                  })}
                  <div className="text-gray-600">... and more</div>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Tools */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">SEO Tools</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">robots.txt</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Download a robots.txt file that references your sitemap and sets crawl rules.
                </p>
                <button
                  onClick={handleDownloadRobots}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <FileText className="h-4 w-4" />
                  <span>Download robots.txt</span>
                </button>
              </div>

              <div>
                <h4 className="font-medium text-blue-800 mb-2">Search Console</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Submit your sitemap to Google Search Console for better indexing.
                </p>
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-flex"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open Search Console</span>
                </a>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">How to Use</h3>
                <ol className="list-decimal list-inside space-y-2 text-green-800">
                  <li>Update the base URL to your custom domain</li>
                  <li>Download the sitemap.xml file</li>
                  <li>Upload sitemap.xml to your website's root directory</li>
                  <li>Download and upload robots.txt to your root directory</li>
                  <li>Submit sitemap to Google Search Console</li>
                  <li>Re-generate sitemap whenever you add new lawyers</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Auto-Update Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900">Auto-Update Recommendation</h4>
                <p className="text-sm text-yellow-800 mt-1">
                  Remember to regenerate and re-upload your sitemap whenever you add new lawyers through the bulk import feature. 
                  This ensures search engines can discover all your new content.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sitemap Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Sitemap Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                <pre className="text-xs bg-gray-50 p-4 rounded overflow-x-auto">
                  {sitemapPreview}
                </pre>
              </div>
              <div className="p-4 border-t flex justify-end">
                <button
                  onClick={handleDownloadSitemap}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Download This Sitemap
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};