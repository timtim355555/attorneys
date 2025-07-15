# 🔄 GitHub Integration Guide

## 🎯 **Dual Upload System - GitHub & Bolt**

This system allows you to manage lawyers' data in **two ways**:
1. **📝 Edit in Bolt** → Sync to GitHub → Deploy to website
2. **💻 Edit in GitHub** → Load into Bolt → Continue editing

---

## 🚀 **Setup Instructions**

### **1️⃣ GitHub Personal Access Token**

1. Go to **GitHub.com** → Settings → Developer settings
2. Click **Personal access tokens** → Tokens (classic)
3. Click **Generate new token**
4. Select scopes: `repo` (full repository access)
5. **Copy the token** (starts with `ghp_`)

### **2️⃣ Repository Setup**

```bash
# Create new repository or use existing one
# Add the lawyers-sync.json file to: src/data/lawyers-sync.json
```

### **3️⃣ File Structure in GitHub**

```
your-repo/
├── src/
│   └── data/
│       └── lawyers-sync.json  ← Main lawyers database
├── README.md
└── package.json
```

---

## 📋 **How to Use**

### **🔄 Method 1: Bolt → GitHub → Website**

1. **Edit lawyers in Bolt** (add, remove, modify)
2. **Open GitHub Sync** in Bolt
3. **Enter GitHub token & repo URL**
4. **Click "Sync to GitHub"**
5. **GitHub gets updated automatically**
6. **Deploy from GitHub to live website**

### **🔄 Method 2: GitHub → Bolt → Website**

1. **Edit `lawyers-sync.json` directly in GitHub**
2. **Open GitHub Sync in Bolt**
3. **Click "Load from GitHub"**
4. **Review imported data**
5. **Make additional changes in Bolt if needed**
6. **Deploy to website**

---

## 📝 **JSON Format for GitHub**

### **Adding New Lawyer in GitHub:**

```json
{
  "lawyers": [
    {
      "name": "Jane Doe",
      "image": "https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg",
      "practiceAreas": ["Family Law", "Divorce"],
      "experience": 12,
      "location": "Los Angeles, CA",
      "phone": "(213) 555-0102",
      "email": "jane.doe@familylaw.com",
      "rating": 4.8,
      "reviews": 89,
      "education": "UCLA School of Law, JD",
      "bio": "Experienced family law attorney specializing in divorce and child custody cases.",
      "specializations": ["Divorce", "Child Custody", "Adoption"],
      "website": "https://janedoelaw.com",
      "barNumber": "CA789012",
      "languages": ["English", "Spanish"],
      "hourlyRate": "$400-550",
      "availability": "Available",
      "verified": true
    }
  ],
  "lastUpdated": "2024-12-19T00:00:00.000Z",
  "totalCount": 1
}
```

---

## ⚡ **Workflow Examples**

### **📱 Quick Updates (Bolt)**
```
Need to add 5 lawyers quickly?
→ Use Bolt interface
→ Sync to GitHub
→ Auto-deploy to website
```

### **💻 Bulk Updates (GitHub)**
```
Need to update 50+ lawyers?
→ Edit JSON directly in GitHub
→ Load into Bolt to verify
→ Deploy to website
```

### **🔄 Team Collaboration**
```
Multiple people editing?
→ Some use Bolt interface
→ Others edit GitHub directly  
→ Always sync before major changes
```

---

## 🛡️ **Security & Best Practices**

### **🔐 Token Security:**
- ✅ Never share your GitHub token
- ✅ Use environment variables in production
- ✅ Regenerate tokens periodically
- ✅ Limit token scope to specific repositories

### **📊 Data Management:**
- ✅ Always backup before bulk changes
- ✅ Test in Bolt before syncing to GitHub
- ✅ Use descriptive commit messages
- ✅ Keep JSON format consistent

### **🚀 Deployment:**
- ✅ Sync to GitHub before deploying
- ✅ Test website after each deployment
- ✅ Monitor for any data inconsistencies
- ✅ Keep local and GitHub data in sync

---

## 🔧 **Troubleshooting**

### **❌ Common Issues:**

**"Invalid GitHub token"**
- ✅ Check token has `repo` permissions
- ✅ Verify token hasn't expired
- ✅ Ensure correct repository access

**"Repository not found"**
- ✅ Check repository URL format
- ✅ Verify repository is public or token has access
- ✅ Ensure repository exists

**"JSON format error"**
- ✅ Validate JSON syntax
- ✅ Check all required fields are present
- ✅ Verify data types match expected format

---

## 🎯 **Perfect Workflow**

```
1. 📝 Make changes in Bolt (easy interface)
2. 🔄 Sync to GitHub (backup & version control)  
3. 🚀 Auto-deploy to website (live updates)
4. 💻 Edit directly in GitHub when needed
5. 📥 Load back into Bolt for further editing
```

**This gives you the best of both worlds - easy editing AND full control!** ✨