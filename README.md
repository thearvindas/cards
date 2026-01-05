# Card Game Finder

Find the perfect card game based on your cards and number of players. Discover hundreds of card games with detailed rules and descriptions.

## Features

- Filter card games by number of players, decks, and joker requirements
- Detailed descriptions for each game
- Quick access to Google search for rules
- Copy LLM prompts for detailed game explanations
- Retro pixel-art aesthetic using NES.css

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **NES.css** - Retro pixel-art styling
- **Tailwind CSS** - Utility-first CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
npm run build
npm start
```

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build

The app will be live at `https://your-project.vercel.app`

## Project Structure

```
├── app/              # Next.js app directory
│   ├── layout.tsx   # Root layout
│   └── page.tsx     # Home page
├── components/       # React components
│   ├── GameCard.tsx      # Individual game card
│   ├── GameFilter.tsx    # Filter form
│   ├── GameResults.tsx   # Results display
│   ├── Footer.tsx       # Footer component
│   └── PixelBackground.tsx # Background effect
├── data/            # Game data
│   └── games.json   # All card games data
└── lib/             # Utilities
    ├── filter.ts    # Game filtering logic
    └── types.ts     # TypeScript types
```

## License

MIT
