import React, { useState } from 'react';
import { Upload, Download, Github, FolderSync as Sync, AlertCircle, CheckCircle, X, Database } from 'lucide-react';
import { Lawyer } from '../types/lawyer';

interface GitHubSyncProps {
  lawyers: Lawyer[];
  onSyncFromGitHub: (lawyers: Lawyer[]) => void;
  onClose: () => void;
}

export const GitHubSync: React.FC<GitHubSyncProps> = ({ lawyers, onSyncFromGitHub, onClose }) => {
  const [githubToken, setGithubToken] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Parse GitHub repo URL to get owner and repo name
  const parseRepoUrl = (url: string) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match) {
      return { owner: match[1], repo: match[2].replace('.git', '') };
    }
    return null;
  };

  // Sync lawyers TO GitHub
  const syncToGitHub = async () => {
    if (!githubToken || !repoUrl) {
      setMessage('Please provide GitHub token and repository URL');
      setSyncStatus('error');
      return;
    }

    setIsLoading(true);
    setSyncStatus('idle');

    try {
      const repoInfo = parseRepoUrl(repoUrl);
      if (!repoInfo) {
        throw new Error('Invalid GitHub repository URL');
      }

      // Convert lawyers to JSON format for GitHub
      const lawyersData = {
        lawyers: lawyers,
        lastUpdated: new Date().toISOString(),
        totalCount: lawyers.length,
        syncedFromBolt: true,
        autoDeployTrigger: Date.now(),
        excelCompatible: true,
        instructions: {
          howToEdit: "You can edit this file directly in GitHub or upload Excel files in Bolt",
          excelFormat: "Use the Excel templates from Bolt for bulk uploads",
          autoDeployment: "Any changes to this file will automatically deploy to your website"
        }
      };

      // GitHub API call to update lawyers data
      const response = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents/src/data/lawyers-sync.json`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `🔄 Bolt Sync: Update ${lawyers.length} lawyers - Excel compatible format - Auto-deploy triggered`,
          content: btoa(JSON.stringify(lawyersData, null, 2)),
          sha: await getFileSha(repoInfo, 'src/data/lawyers-sync.json')
        })
      });

      if (response.ok) {
        setSyncStatus('success');
        setMessage(`✅ Successfully synced ${lawyers.length} lawyers to GitHub! 🚀 Excel format preserved. Auto-deployment started - your website will update in 2-3 minutes.`);
      } else {
        throw new Error('Failed to sync to GitHub');
      }
    } catch (error) {
      setSyncStatus('error');
      setMessage(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Get file SHA for updating existing file
  const getFileSha = async (repoInfo: any, path: string) => {
    try {
      const response = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents/${path}`, {
        headers: {
          'Authorization': `token ${githubToken}`,
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.sha;
      }
    } catch (error) {
      // File doesn't exist, return null for new file creation
    }
    return null;
  };

  // Sync lawyers FROM GitHub
  const syncFromGitHub = async () => {
    if (!githubToken || !repoUrl) {
      setMessage('Please provide GitHub token and repository URL');
      setSyncStatus('error');
      return;
    }

    setIsLoading(true);
    setSyncStatus('idle');

    try {
      const repoInfo = parseRepoUrl(repoUrl);
      if (!repoInfo) {
        throw new Error('Invalid GitHub repository URL');
      }

      // Fetch lawyers data from GitHub
      const response = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents/src/data/lawyers-sync.json`, {
        headers: {
          'Authorization': `token ${githubToken}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        const content = JSON.parse(atob(data.content));
        
        if (content.lawyers && Array.isArray(content.lawyers)) {
          onSyncFromGitHub(content.lawyers);
          setSyncStatus('success');
          setMessage(`Successfully loaded ${content.lawyers.length} lawyers from GitHub!`);
        } else {
          throw new Error('Invalid lawyers data format in GitHub');
        }
      } else {
        throw new Error('Failed to fetch data from GitHub');
      }
    } catch (error) {
      setSyncStatus('error');
      setMessage(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate GitHub template files
  const generateGitHubTemplate = () => {
    const template = {
      lawyers: lawyers.slice(0, 5), // Sample data
      lastUpdated: new Date().toISOString(),
      totalCount: lawyers.length,
      instructions: {
        howToAdd: "Add new lawyer objects to the 'lawyers' array",
        requiredFields: ["name", "email", "practiceAreas", "location", "phone", "education", "bio"],
        optionalFields: ["image", "website", "barNumber", "languages", "hourlyRate", "availability", "verified"]
      }
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lawyers-sync.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <Github className="h-6 w-6" />
            <h2 className="text-2xl font-bold">GitHub Sync Manager</h2>
            <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
              {lawyers.length} lawyers
            </span>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Configuration */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">GitHub Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Personal Access Token
                </label>
                <input
                  type="password"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Create at: GitHub Settings → Developer settings → Personal access tokens
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repository URL
                </label>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/lawyers-directory"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Sync Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Upload to GitHub */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Upload className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Upload to GitHub</h3>
              </div>
              <p className="text-blue-700 mb-4">
                Sync current lawyers database ({lawyers.length} lawyers) to your GitHub repository.
              </p>
              <button
                onClick={syncToGitHub}
                disabled={isLoading || !githubToken || !repoUrl}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Sync className="h-4 w-4 animate-spin" />
                    <span>Syncing...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Sync to GitHub</span>
                  </>
                )}
              </button>
            </div>

            {/* Download from GitHub */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Download className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-900">Load from GitHub</h3>
              </div>
              <p className="text-green-700 mb-4">
                Load lawyers database from your GitHub repository and merge with current data.
              </p>
              <button
                onClick={syncFromGitHub}
                disabled={isLoading || !githubToken || !repoUrl}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Sync className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Load from GitHub</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Status Messages */}
          {message && (
            <div className={`rounded-lg p-4 ${
              syncStatus === 'success' ? 'bg-green-50 border border-green-200' :
              syncStatus === 'error' ? 'bg-red-50 border border-red-200' :
              'bg-blue-50 border border-blue-200'
            }`}>
              <div className="flex items-start space-x-3">
                {syncStatus === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                ) : syncStatus === 'error' ? (
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                ) : (
                  <Database className="h-5 w-5 text-blue-600 mt-0.5" />
                )}
                <p className={`text-sm ${
                  syncStatus === 'success' ? 'text-green-800' :
                  syncStatus === 'error' ? 'text-red-800' :
                  'text-blue-800'
                }`}>
                  {message}
                </p>
              </div>
            </div>
          )}

          {/* Template Download */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Database className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-900">GitHub Template</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Download a template JSON file to add to your GitHub repository for easy lawyer management.
                </p>
                <button
                  onClick={generateGitHubTemplate}
                  className="mt-2 flex items-center space-x-2 text-yellow-600 hover:text-yellow-800 font-medium"
                >
                  <Download className="h-4 w-4" />
                  <span>Download lawyers-sync.json Template</span>
                </button>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use GitHub Sync</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">📤 Upload Workflow:</h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
                  <li>Add/edit lawyers here in Bolt</li>
                  <li>Click "Sync to GitHub" to upload changes</li>
                  <li>Your GitHub repository gets updated automatically</li>
                  <li>Deploy from GitHub to your live website</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">📥 Download Workflow:</h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
                  <li>Edit lawyers-sync.json directly in GitHub</li>
                  <li>Click "Load from GitHub" to import changes</li>
                  <li>Review and merge with existing data</li>
                  <li>Continue editing in Bolt as needed</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">🔄 Best Practices:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Always sync to GitHub before major changes</li>
                  <li>Use descriptive commit messages</li>
                  <li>Keep your GitHub token secure</li>
                  <li>Test changes in Bolt before syncing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};