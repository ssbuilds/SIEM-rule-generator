# Deployment Guide

## GitHub Upload Instructions

### 1. Create a New GitHub Repository

1. Go to https://github.com/new
2. Repository name: `siem-rule-generator`
3. Description: `Open-source SIEM rule generator that converts natural language to Sigma rules and KQL queries`
4. Set to **Public** (for open source)
5. **Do NOT** initialize with README, .gitignore, or license (we have our own)
6. Click "Create repository"

### 2. Upload Code to GitHub

**Option A: Using Git Command Line**
```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: SIEM Rule Generator with multi-AI provider support"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/siem-rule-generator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Option B: Using GitHub Web Interface**
1. Download all files from this Replit
2. Go to your new GitHub repository
3. Click "uploading an existing file"
4. Drag and drop all project files
5. Commit with message: "Initial commit: SIEM Rule Generator"

### 3. Repository Settings

After uploading, configure these GitHub settings:

**Topics/Tags** (in repository settings):
- `siem`
- `cybersecurity`
- `sigma-rules`
- `kql`
- `ai`
- `security-tools`
- `typescript`
- `react`

**Description**: 
`Open-source tool that converts plain English SIEM use cases into Sigma rules and KQL queries using multiple AI providers`

**Website**: Your deployed URL (when you deploy)

## Deployment Options

### Option 1: Replit Deployment
1. Click "Deploy" in Replit interface
2. Configure environment variables if needed
3. Your app will be available at `your-repl-name.your-username.repl.co`

### Option 2: Vercel (Recommended for production)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables in Vercel dashboard
5. Deploy automatically on GitHub pushes

### Option 3: Railway
1. Connect GitHub repository to Railway
2. Set start command: `npm run dev`
3. Configure environment variables
4. Deploy with PostgreSQL add-on

### Option 4: Render
1. Connect GitHub repository
2. Set build command: `npm install && npm run build`
3. Set start command: `npm start`
4. Add PostgreSQL database

## Environment Variables for Production

```env
DATABASE_URL=your_production_database_url
NODE_ENV=production
PORT=5000
```

## Database Setup for Production

### PostgreSQL Setup
```sql
-- Create database
CREATE DATABASE siem_rules;

-- Run Drizzle migrations
npm run db:push
```

### Neon Database (Serverless PostgreSQL)
1. Create account at https://neon.tech
2. Create new project
3. Copy connection string to DATABASE_URL
4. Run `npm run db:push`

## Post-Deployment Checklist

- [ ] Repository is public and accessible
- [ ] README.md displays correctly
- [ ] All dependencies install successfully
- [ ] Application starts without errors
- [ ] Database connections work (or fallback to memory)
- [ ] AI provider integrations functional
- [ ] Environment variables configured
- [ ] HTTPS enabled for production
- [ ] Error monitoring set up (optional)

## Maintenance

### Regular Updates
- Keep dependencies updated: `npm audit && npm update`
- Monitor AI provider API changes
- Update security patches promptly
- Backup database regularly

### Monitoring
- Track API usage and costs
- Monitor error rates
- Check database performance
- Review user feedback and issues

---

Your SIEM Rule Generator is now ready for the open-source community!