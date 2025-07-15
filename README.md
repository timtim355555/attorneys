# 🏛️ Attorneys-deets - Professional Lawyers Directory

A modern, responsive lawyers directory built with React, TypeScript, and Tailwind CSS. Features advanced search, bulk data management, GitHub integration, and SEO optimization.

## ✨ Features

### 🔍 **Advanced Search & Filtering**
- Search by lawyer name, practice area, and location
- Filter by availability, rating, and verification status
- Real-time search results with instant filtering

### 👨‍💼 **Comprehensive Lawyer Profiles**
- Detailed lawyer information with photos
- Practice areas and specializations
- Contact information and ratings
- Education and experience details
- Verification badges for trusted attorneys

### 📊 **Bulk Data Management**
- Excel/CSV import for up to 10,000 lawyers
- Bulk edit and delete operations
- Data validation and error reporting
- Export functionality for backup

### 🔄 **GitHub Integration**
- Two-way sync between Bolt and GitHub
- Version control for all lawyer data
- Automatic deployment on changes
- Team collaboration support

### 🌐 **SEO Optimized**
- Dynamic sitemap generation
- Schema markup for better search visibility
- SEO-friendly URLs for lawyer profiles
- Meta tags optimization

### 📱 **Mobile Responsive**
- Fully responsive design
- Touch-friendly interface
- Optimized for all screen sizes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/lawyers-directory.git

# Navigate to project directory
cd lawyers-directory

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Processing**: XLSX, Papa Parse
- **Deployment**: GitHub Actions + Hostinger VPS

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AddLawyerForm.tsx
│   ├── BulkDataManager.tsx
│   ├── ExcelImport.tsx
│   ├── GitHubSync.tsx
│   ├── SchemaMarkup.tsx
│   ├── SEOHead.tsx
│   └── SitemapManager.tsx
├── data/               # Data management
│   ├── lawyers.ts
│   └── lawyers-github-template.json
├── types/              # TypeScript definitions
│   └── lawyer.ts
├── utils/              # Utility functions
│   ├── seoHelpers.ts
│   └── sitemapGenerator.ts
└── App.tsx            # Main application component
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_GITHUB_TOKEN=your_github_token_here
VITE_GITHUB_REPO=your_repo_url_here
```

### GitHub Secrets (for deployment)
Add these secrets to your GitHub repository:
- `VPS_HOST` - Your Hostinger VPS IP
- `VPS_USERNAME` - VPS username (usually 'root')
- `VPS_PASSWORD` - VPS password
- `VPS_PORT` - SSH port (usually 22)

## 📊 Data Management

### Adding Lawyers
1. **Manual Entry**: Use the "Add Lawyer" form
2. **Excel Import**: Upload Excel/CSV files with lawyer data
3. **GitHub Direct**: Edit `lawyers-sync.json` directly
4. **Bulk Manager**: Manage large datasets efficiently

### Excel Format
Required columns:
- name, practiceAreas, experience, location, phone, email, education, bio

Optional columns:
- image, rating, reviews, specializations, website, barNumber, languages, hourlyRate, availability, verified

### GitHub Sync
1. Get GitHub Personal Access Token
2. Configure repository URL
3. Use "GitHub Sync" to upload/download data
4. Changes auto-deploy to live website

## 🌐 SEO Features

### Sitemap Generation
- Automatic sitemap.xml generation
- SEO-friendly URLs for all lawyer profiles
- Practice area and location pages
- Google Search Console integration

### Schema Markup
- Lawyer profile structured data
- Local business schema
- FAQ schema for better search results
- Organization markup

## 🚀 Deployment

### Automatic Deployment
The project includes GitHub Actions for automatic deployment:
1. Push changes to main branch
2. GitHub Actions builds the project
3. Deploys to Hostinger VPS automatically
4. Website updates in 2-3 minutes

### Manual Deployment
Follow the detailed guide in `hostinger-setup.md`

## 📖 Documentation

- `hostinger-setup.md` - Complete VPS setup guide
- `github-integration-guide.md` - GitHub sync instructions
- `excel-github-integration.md` - Excel upload workflow
- `auto-sync-workflow.md` - Automated deployment guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation files
- Review the troubleshooting sections
- Open an issue on GitHub

## 🎯 Features Roadmap

- [ ] Advanced filtering options
- [ ] Lawyer reviews and ratings system
- [ ] Payment integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

---

**Built with ❤️ for the legal community**