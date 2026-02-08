# MotionVerse | Motion That Matters

A cinematic motion design portfolio experience built with Next.js, React Three Fiber, and AI-powered suggestions.

![MotionVerse Portfolio](./docs/screenshot-placeholder.png)

## 🚀 Features

- **Immersive 3D Experience**: Dynamic Three.js scene with floating geometric objects that react to scroll and mouse movement
- **Smooth Animations**: Advanced scroll-linked animations using Framer Motion
- **AI-Powered Portfolio Consultant**: Get personalized suggestions and SEO optimization using Google's Genkit AI
- **Responsive Design**: Optimized for all screen sizes and devices
- **Accessibility**: Support for `prefers-reduced-motion` and keyboard navigation
- **Type-Safe**: Built with TypeScript for robust type checking
- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Three Fiber** - Three.js React renderer
- **Radix UI** - Accessible component primitives

### AI Integration
- **Genkit AI** - AI orchestration framework
- **Google Generative AI** - LLM for portfolio suggestions

### Development
- **Vitest** - Unit testing framework
- **ESLint** - Code linting
- **GitHub Actions** - CI/CD pipeline

## 📋 Prerequisites

- **Node.js** 20.x or higher
- **npm** or **yarn** package manager
- **Google API Key** for AI features (get one at [https://ai.google.dev/](https://ai.google.dev/))

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/danielsolo707/studio.git
cd studio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Google API key:

```
GOOGLE_API_KEY=your_actual_google_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

### 5. Run Genkit AI development (optional)

To test the AI features in isolation:

```bash
npm run genkit:dev
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

## 🏗️ Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
studio/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
├── docs/                       # Documentation assets
├── public/                     # Static assets
│   └── robots.txt              # SEO robots file
├── src/
│   ├── __tests__/              # Test files
│   │   ├── LoadingScreen.test.tsx
│   │   ├── portfolio-improvement.test.ts
│   │   └── setup.ts
│   ├── ai/                     # AI integration
│   │   ├── flows/
│   │   │   └── portfolio-improvement-suggestions.ts
│   │   ├── dev.ts
│   │   └── genkit.ts
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Global styles
│   │   └── sitemap.ts          # Dynamic sitemap generation
│   ├── components/             # React components
│   │   ├── ErrorBoundary.tsx   # Error boundary for Three.js
│   │   ├── LoadingScreen.tsx   # Initial loading animation
│   │   ├── MotionSphere.tsx    # 3D scene with Three.js
│   │   ├── PortfolioAI.tsx     # AI suggestion interface
│   │   ├── ProjectList.tsx     # Project portfolio list
│   │   ├── ProjectOverlay.tsx  # Project detail overlay
│   │   ├── TypographicHero.tsx # Hero section
│   │   └── ui/                 # Reusable UI components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   └── types/                  # TypeScript type definitions
│       └── project.ts
├── .env.example                # Environment variables template
├── .eslintrc.json              # ESLint configuration
├── LICENSE                     # MIT License
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── vitest.config.ts            # Vitest configuration
```

## 🧑‍💻 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm test` - Run tests with Vitest
- `npm run genkit:dev` - Start Genkit AI development server
- `npm run genkit:watch` - Start Genkit with hot reload

## 🎨 Key Features Explained

### 3D Motion Scene

The portfolio features an immersive 3D background built with React Three Fiber. Geometric objects (octahedrons, torus knots, icosahedrons) float and react to:
- Mouse position (parallax camera rotation)
- Scroll progress (dispersal and fly-away effects)
- Performance-optimized with pre-allocated vectors

### AI Portfolio Consultant

The PortfolioAI component uses Google's Generative AI to provide:
- Actionable suggestions for portfolio improvement
- SEO keyword recommendations
- Personalized insights based on portfolio description

### Accessibility

- Full keyboard navigation support
- `prefers-reduced-motion` media query support
- ARIA labels on interactive elements
- Error boundaries for graceful degradation

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/danielsolo707/studio)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/danielsolo707/studio)

### Environment Variables

Make sure to set the following environment variable in your deployment platform:

```
GOOGLE_API_KEY=your_google_api_key_here
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

Daniel - [@danielsolo707](https://github.com/danielsolo707)

Project Link: [https://github.com/danielsolo707/studio](https://github.com/danielsolo707/studio)

---

**Built with ❤️ using Next.js and React Three Fiber**
