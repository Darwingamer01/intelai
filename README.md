<div align="center"><p>🚀 AI Chat App </p></div>
<div align="center">
  <p align="center">
    <b>A modern, responsive AI chat application with stunning animations and a sleek UI</b>
  </p><p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#implementation">Implementation</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#contributing">Contributing</a> •
    <a href="#contact">Contact</a>
  </p><div align="center">
    <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </div>
</div><br />

## 🌟 Introduction

Intel Ai is a cutting-edge conversational AI platform that combines the power of modern AI models with a beautiful, responsive user interface. The application features smooth animations, a dark-themed design, and a comprehensive set of features including authentication, real-time chat, and image analysis capabilities.

<div align="center">
  <a href="https://v0-replicate-ai-chat-app.vercel.app/">
    <img src="https://res.cloudinary.com/di4jbsdwo/image/upload/v1747508912/Screenshot_2025-05-18_003353_dbu9oc.png" alt="AI Chat App Demo" width="80" height="80" />
  </a>
  
</div>

<div id="features"></div>

## ✨ Features 


<div  class="features-grid">
  <div class="feature-card">
    <h3>🤖 Advanced AI Chat</h3>
    <p>Engage in natural conversations with a state-of-the-art AI assistant</p>
  </div> <div class="feature-card">
    <h3>🔒 Secure Authentication</h3>
    <p>Complete authentication flow with sign-up, sign-in, and password recovery</p>
  </div>  <div class="feature-card">
    <h3>🌓 Dark Mode</h3>
    <p>Sleek dark-themed UI for comfortable viewing in any environment</p>
  </div> <div class="feature-card">
    <h3>📱 Responsive Design</h3>
    <p>Fully responsive layout that works beautifully on desktop, tablet, and mobile</p>
  </div>  <div class="feature-card">
    <h3>🖼️ Image Analysis</h3>
    <p>Upload and analyze images with AI-powered insights</p>
  </div>  <div class="feature-card">
    <h3>✨ Smooth Animations</h3>
    <p>Beautiful GSAP-powered animations and transitions throughout the app</p>
  </div> <div class="feature-card">
    <h3>👤 User Profiles</h3>
    <p>Customizable user profiles with settings and preferences</p>
  </div>  <div class="feature-card">
    <h3>📊 Chat History</h3>
    <p>Access and manage your conversation history</p>
  </div>
</div>

<div id="tech-stack"></div>

## 🛠️ Tech Stack

<p align="center">
  <img src="https://imgs.search.brave.com/BjI0NRFCTlF2KZYQBJ7W7U9RW9ZdINwZR15cPgSdzHU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzMyLzEvbmV4dC1q/cy1sb2dvLXBuZ19z/ZWVrbG9nby0zMjE4/MDYucG5n" alt="Next.js" width="60" height="60" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" width="60" height="60" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" width="60" height="60" />
  <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="Tailwind CSS" width="60" height="60" />
  <img src="https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg" alt="GSAP" width="60" height="60" />
  <img src="https://avatars.githubusercontent.com/u/139895814?s=200&v=4" alt="shadcn/ui" width="60" height="60" />
  <img src="https://lucide.dev/logo.light.svg" alt="Lucide React" width="60" height="60" />
</p>

<div id="implementation"></div>

## 🔍 Implementation

The Intel Ai includes the following key implementations:

### 🔐 Authentication System

- Complete sign-up and sign-in flows
- Email verification process
- Password reset functionality
- Form validation and error handling
- Secure authentication state management


### 💬 Chat Interface

- Real-time chat with AI assistant
- Message history and conversation context
- Support for text and image inputs
- Typing indicators and loading states
- Chat history management


### 🎨 UI/UX Features

- GSAP-powered animations and transitions
- Responsive sidebar navigation
- Dark theme with custom color palette
- Loading screens and transitions between pages
- Custom animated components (Cosmic Loader, etc.)


### 📱 Responsive Design

- Adaptive layouts for different screen sizes
- Touch-friendly interface elements
- Optimized performance on mobile devices


### 🧩 Component Architecture

- Reusable UI components
- Server and client components separation
- Custom hooks for shared functionality
- Proper state management

<div id="getting-started"></div>

## 🚀 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git


### Installation

1. Clone the repository:

```shellscript
git clone https://github.com/yourusername/ai-chat-app.git
cd ai-chat-app
```


2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```plaintext
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_BACKEND_URL = your_backend_url  {check backend repo link in description}
NEXT_PUBLIC_GEMINI_API_KEY = gemini_api_key
NEXT_PUBLIC_SECRET_KEY = cloudinary secret key

```


4. Run the development server:

```shellscript
npm run dev
# or
yarn dev
```


5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

<div id="contributing"></div>

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute to the project:

### Creating Issues

1. Go to the [Issues](https://github.com/yourusername/ai-chat-app/issues) tab on GitHub
2. Click on "New Issue"
3. Choose the appropriate issue template
4. Fill in the required information
5. Submit the issue


### Solving Issues

1. Find an issue you'd like to work on
2. Comment on the issue to express your interest
3. Fork the repository
4. Create a new branch:

```shellscript
git checkout -b feature/your-feature-name
```


5. Make your changes
6. Commit your changes:

```shellscript
git commit -m "feat: add your feature description"
```


7. Push to your branch:

```shellscript
git push origin feature/your-feature-name
```


8. Create a Pull Request


### Pull Request Guidelines

- Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification
- Ensure your code passes all tests
- Update documentation if necessary
- Add screenshots for UI changes

### Current Issues 

 1. Navbar button animation
 2. Arrow Animation in learn more button
 3. Toast setup
 4. Loader at every page

<div id="contact"></div>

## 📞 Freelance Contact

<div class="contact-card">
  <img src="https://github.com/Siser-Pratap.png" alt="Developer Avatar" width="80" height="80" class="avatar" />
  <div class="contact-info">
    <h3>Siser Pratap</h3>
    <p>Full Stack Developer</p>
    <div class="social-links">
      <a href="https://github.com/Siser-Pratap" target="_blank">
        <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
      </a>
      <a href="https://linkedin.com/in/siser" target="_blank">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
      </a>
      <a href="https://twitter.com/pratapSiser" target="_blank">
        <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />
      </a>
    </div>
    <a href="mailto:siserinsevoc@gmail.com" >
      📧 Email Me
    </a>
  </div>
</div>

---

<div align="center">
  <p>Made with ❤️ by Your Name</p>
  <p>© 2023 AI Chat App. All rights reserved.</p>
</div>


