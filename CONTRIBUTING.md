# Contributing to SIEM Rule Generator

Thank you for your interest in contributing to the SIEM Rule Generator! This document provides guidelines for contributing to the project.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and professional in all interactions.

## How to Contribute

### Reporting Issues

1. **Search existing issues** first to avoid duplicates
2. **Use descriptive titles** that clearly explain the problem
3. **Provide detailed information**:
   - Steps to reproduce the issue
   - Expected vs actual behavior
   - Browser and OS information
   - AI provider being used
   - Error messages or screenshots

### Suggesting Features

1. **Check existing feature requests** to avoid duplicates
2. **Clearly describe the feature** and its benefits
3. **Explain the use case** for cybersecurity professionals
4. **Consider implementation complexity** and provide suggestions

### Contributing Code

#### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/siem-rule-generator.git
cd siem-rule-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Run in another terminal for database operations
npm run db:push
```

#### Pull Request Process

1. **Fork the repository** and create a feature branch
2. **Make your changes** following our coding standards
3. **Test thoroughly** across different scenarios
4. **Update documentation** if needed
5. **Commit with clear messages** following conventional commits
6. **Submit a pull request** with detailed description

#### Coding Standards

**TypeScript/JavaScript:**
- Use TypeScript for all new code
- Follow existing code style and patterns
- Use meaningful variable and function names
- Add type annotations where helpful
- Handle errors appropriately

**React Components:**
- Use functional components with hooks
- Follow existing component structure
- Implement proper prop typing
- Handle loading and error states
- Use existing UI components when possible

**API Development:**
- Validate all inputs using Zod schemas
- Implement proper error handling
- Use consistent response formats
- Add appropriate logging
- Follow RESTful conventions

**Database:**
- Use Drizzle ORM for all database operations
- Add proper indexes for performance
- Validate data integrity
- Handle migration scripts properly

#### Testing

- Test all AI providers (Anthropic, OpenAI, Azure, Groq)
- Verify rule generation accuracy
- Test error handling scenarios
- Check responsive design
- Validate database operations
- Test with and without database connection

## Areas for Contribution

### High Priority
- **Additional AI Providers**: Integration with other AI services
- **Rule Validation**: Sigma rule syntax validation
- **Export Formats**: Support for additional SIEM formats
- **Template Library**: More cybersecurity use case templates
- **Performance**: Optimize rule generation speed

### Medium Priority
- **Rule History**: Better rule management and versioning
- **Batch Processing**: Generate multiple rules at once
- **Custom Prompts**: Allow custom AI prompts
- **Analytics**: Usage statistics and insights
- **Documentation**: Improved user guides

### Lower Priority
- **Themes**: Additional UI themes
- **Internationalization**: Multi-language support
- **Mobile**: Mobile-optimized interface
- **Integrations**: Direct SIEM platform integrations

## AI Provider Guidelines

When adding new AI providers:

1. **Follow existing patterns** in `server/services/ai-service.ts`
2. **Handle response parsing** for different output formats
3. **Implement connection testing** in the service
4. **Add provider to schemas** in `shared/schema.ts`
5. **Update frontend** configuration options
6. **Test thoroughly** with real API keys
7. **Document** provider-specific requirements

## Security Considerations

- **Never commit API keys** or sensitive data
- **Validate all inputs** to prevent injection attacks
- **Use secure communication** for all external APIs
- **Handle errors** without exposing sensitive information
- **Keep dependencies updated** to address security vulnerabilities

## Documentation

- **Update README.md** for significant changes
- **Add code comments** for complex logic
- **Update deployment guides** if infrastructure changes
- **Document breaking changes** clearly
- **Provide examples** for new features

## Community

- **Be helpful** to other contributors
- **Share knowledge** about cybersecurity and SIEM tools
- **Provide constructive feedback** on pull requests
- **Help with testing** and bug reports
- **Suggest improvements** to development processes

## Getting Help

- **Create an issue** for questions about contributing
- **Review existing code** to understand patterns
- **Check documentation** for setup and deployment
- **Ask specific questions** rather than general help requests

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- README acknowledgments
- Release notes for significant contributions
- Community discussions and presentations

---

**Together we can build better cybersecurity tools for everyone!**