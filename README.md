## 🚀 Getting Started

Follow these steps to set up the project locally:

### Prerequisites
- Node.js 18.x or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/meetpro-app.git
cd meetpro-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Set up environment variables:
Create a \`.env.local\` file in the root directory with the following variables:
\`\`\`env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stream Video SDK
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key

# Application URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Environment Setup

#### Clerk Authentication Setup
1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable and secret keys
4. Configure sign-in/sign-up URLs in your Clerk dashboard

#### Stream Video SDK Setup
1. Create a Stream account at [getstream.io](https://getstream.io)
2. Create a new video application
3. Copy your API key and secret
4. Configure your application settings

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute to the project:

### Creating Issues
1. Go to the [Issues](https://github.com/yourusername/meetpro-app/issues) tab on GitHub
2. Click on "New Issue"
3. Choose the appropriate issue template
4. Fill in the required information
5. Submit the issue

### Solving Issues
1. Find an issue you'd like to work on
2. Comment on the issue to express your interest
3. Fork the repository
4. Create a new branch:
\`\`\`bash
git checkout -b feature/your-feature-name
\`\`\`
5. Make your changes
6. Commit your changes:
\`\`\`bash
git commit -m "feat: add your feature description"
\`\`\`
7. Push to your branch:
\`\`\`bash
git push origin feature/your-feature-name
\`\`\`
8. Create a Pull Request

### Pull Request Guidelines
- Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification
- Ensure your code passes all tests
- Update documentation if necessary
- Add screenshots for UI changes
- Test on multiple devices and browsers

### Current Issues & Improvements
1. **Mobile Navigation Enhancement** - Improve mobile bottom navigation animations
2. **Meeting Room Controls** - Add advanced meeting controls and settings
3. **Performance Optimization** - Optimize video streaming performance
4. **Accessibility Improvements** - Enhance keyboard navigation and screen reader support
5. **Dark/Light Theme Toggle** - Add theme switching capability
6. **Meeting Templates** - Create reusable meeting templates
7. **Integration APIs** - Add calendar integration (Google, Outlook)
8. **Advanced Analytics** - Detailed meeting analytics and reporting

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing component structure
- Implement proper error handling
- Add loading states for async operations
- Ensure responsive design
- Write meaningful commit messages
- Test across different browsers and devices

## 📞 Contact

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://github.com/yourusername.png" alt="Developer Avatar" width="100" height="100" style="border-radius: 50%;" />
        <br />
        <h3>Your Name</h3>
        <p>Full Stack Developer</p>
        <p>
          <a href="https://github.com/yourusername" target="_blank">
            <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
          </a>
          <br />
          <a href="https://linkedin.com/in/yourprofile" target="_blank">
            <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
          </a>
          <br />
          <a href="https://twitter.com/yourusername" target="_blank">
            <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />
          </a>
        </p>
        <p>
          <a href="mailto:your.email@example.com">
            📧 Email Me
          </a>
        </p>
      </td>
    </tr>
  </table>
</div>

---

<div align="center">
  <p>Made with ❤️ by [Your Name]</p>
  <p>© 2025 MeetPro. All rights reserved.</p>
</div>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Stream](https://getstream.io/) for the excellent video SDK
- [Clerk](https://clerk.com/) for seamless authentication
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Vercel](https://vercel.com/) for hosting and deployment
- The open-source community for inspiration and support

---

<div align="center">
  <p><strong>⭐ Star this repository if you found it helpful!</strong></p>
</div>
