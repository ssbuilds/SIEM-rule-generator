# SIEM Rule Generator

An open-source web application that converts plain English descriptions of SIEM use cases into Sigma rules and KQL queries using multiple AI providers.

## Features

- **Multi-AI Provider Support**: Anthropic Claude, OpenAI GPT-4o, Azure OpenAI, and Groq (Llama 4 Scout)
- **Dual Output Format**: Generates both Sigma rules (universal SIEM format) and KQL queries (Microsoft Sentinel)
- **User-Provided API Keys**: Secure, client-controlled AI service integration
- **Template System**: Pre-built templates for common cybersecurity use cases
- **Professional UI**: Dark theme optimized for cybersecurity professionals
- **Persistent Storage**: PostgreSQL database with automatic fallback to in-memory storage

## Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (optional - uses in-memory storage as fallback)
- API key from at least one supported provider

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/siem-rule-generator.git
cd siem-rule-generator

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL (optional)

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5000`

### AI Provider Setup

1. **Anthropic Claude**: Get API key from https://console.anthropic.com
2. **OpenAI**: Get API key from https://platform.openai.com
3. **Azure OpenAI**: Configure through Azure portal
4. **Groq**: Get API key from https://console.groq.com

## Usage

1. **Configure AI Provider**: Click the settings icon to add your API key
2. **Describe Use Case**: Enter a natural language description of your detection scenario
3. **Select Template** (optional): Choose from pre-built cybersecurity scenarios
4. **Generate Rules**: Click generate to create both Sigma and KQL rules
5. **Copy & Deploy**: Use the copy buttons to integrate rules into your SIEM

## Example Use Cases

- **Lateral Movement Detection**: "Detect suspicious SMB connections to multiple hosts"
- **Credential Dumping**: "Identify LSASS process access attempts"
- **PowerShell Attacks**: "Monitor for encoded PowerShell commands"
- **Privilege Escalation**: "Detect unusual service creation events"

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL + Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui
- **AI Integration**: Multiple provider SDK support

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Application pages
│   │   └── hooks/          # Custom React hooks
├── server/                 # Express backend
│   ├── services/           # Business logic
│   └── routes.ts          # API endpoints
├── shared/                 # Shared types and schemas
└── package.json
```

## Development

```bash
# Start development server
npm run dev

# Database operations (if using PostgreSQL)
npm run db:push    # Push schema changes
npm run db:studio  # Open Drizzle Studio

# Build for production
npm run build
```

## Environment Variables

```env
# Database (optional)
DATABASE_URL=postgresql://user:password@host:port/db

# AI Provider Keys (configure via UI)
# ANTHROPIC_API_KEY=your_key_here
# OPENAI_API_KEY=your_key_here
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and test thoroughly
4. Commit with clear messages: `git commit -m "Add feature description"`
5. Push to your fork: `git push origin feature-name`
6. Create a Pull Request

## Security

- API keys are stored locally in browser storage only
- No API keys are transmitted to or stored on the server
- All AI requests are made client-side through secure endpoints
- Input validation and sanitization implemented throughout

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- Create an issue for bug reports or feature requests
- Check existing issues before creating new ones
- Provide detailed information including error messages and steps to reproduce

## Acknowledgments

- Built with modern web technologies and security best practices
- Supports the open-source cybersecurity community
- Integrates with leading AI providers for maximum flexibility

---

**Made for cybersecurity professionals by cybersecurity professionals**
