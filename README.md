# Sleeping Guard - Frontend

**Enterprise-Grade Password Management Platform**

**Live Application**: [https://sleeping-guard.netlify.app](https://sleeping-guard.netlify.app)

---

## About

Sleeping Guard is a corporate security password manager designed to help organizations securely manage and store credentials. Built with security-first principles and enterprise-scale requirements in mind.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- **Deployment**: [Netlify](https://www.netlify.com/) - Automated deployments
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anchovy-team/SleepingGuard-Frontend.git
   cd SleepingGuard-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## Project Structure

```
SleepingGuard-Frontend/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── EmailSignup.tsx    # Email signup component
│   ├── Hero.tsx           # Hero section
│   ├── Navigation.tsx     # Navigation component
│   └── ProductShowcase.tsx # Product showcase
├── lib/                   # Utility functions & API
│   └── api.ts            # API integration
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Deployment

The application is automatically deployed to Netlify on every push to the main branch.

**Production URL**: [https://sleeping-guard.netlify.app](https://sleeping-guard.netlify.app)

### Manual Deployment

```bash
npm run build
# Deploy the .next folder to your hosting provider
```
