# AGL Super Agent - Production-Ready BaaS Platform

A next-generation Blockchain-as-a-Service (BaaS) application built with Next.js, React, TypeScript, and ethers.js. Manage AGL tokens, earn credits, and interact with AI agents on Base Mainnet.

## Features

- **Wallet Integration**: Connect MetaMask and other Web3 wallets
- **Token Management**: View, transfer, and manage AGL tokens
- **Credits System**: Burn tokens to earn credits for platform features
- **AI Chat**: Interact with blockchain-aware AI agents
- **Portfolio Dashboard**: Real-time balance and transaction analytics
- **Transaction History**: Track all blockchain transactions
- **Dark Theme**: Beautiful light and dark mode interface
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Production-Ready**: Full error handling, validation, and security

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.7
- **UI/Styling**: Tailwind CSS 4.3 + shadcn/ui
- **State Management**: Zustand
- **Blockchain**: ethers.js 6.17
- **Network**: Base Mainnet (Chain ID: 8453)
- **Package Manager**: pnpm

## Live Contracts

- **AGL Token (ERC20)**: `0xea1221b4d80a89bd8c75248fae7c176bd1854698`
- **AGL Credits**: `0x13866F31c60822Ff70684213b9727915Ddf2c183`

## Quick Start

### Prerequisites
- Node.js 18 or higher
- pnpm (`npm install -g pnpm`)
- Web3 wallet (MetaMask recommended)

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Documentation

- **[Development Guide](./DEVELOPMENT.md)** - Architecture, patterns, and development workflow
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment and configuration
- **[Project Structure](./PROJECT_STRUCTURE.md)** - Complete folder reference
- **[Architecture](./ARCHITECTURE.md)** - System design and data flows

## Key Sections

### Home Page
- Hero section with project overview
- Quick links to main features
- Feature showcase grid

### Dashboard
- Real-time portfolio balances
- AGL Token and Credits displays
- Quick action buttons

### Token Management
- View AGL token balance
- Transfer tokens to other addresses
- View contract information
- Access BlockScan explorer

### Credits System
- View credits balance
- Burn tokens to earn credits
- Learn how to earn credits
- Use credits for features

### AI Chat
- Conversation with blockchain-aware AI
- Real-time messaging
- Blockchain transaction insights
- Smart recommendations

### Transaction History
- Complete transaction log
- Filter by status (pending, confirmed, failed)
- View on BlockScan
- Transaction details and costs

### Settings
- Theme toggle (light/dark/system)
- Wallet management
- Address copying
- Network information
- Disconnect wallet

## Environment Setup

Create `.env.local`:

```env
# Network Configuration (Base Mainnet)
NEXT_PUBLIC_NETWORK_NAME=base
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org

# Contract Addresses (Live on Base)
NEXT_PUBLIC_AGL_TOKEN_ADDRESS=0xea1221b4d80a89bd8c75248fae7c176bd1854698
NEXT_PUBLIC_AGL_CREDITS_ADDRESS=0x13866F31c60822Ff70684213b9727915Ddf2c183

# Application
NEXT_PUBLIC_APP_NAME=AGL Super Agent
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## Project Structure

```
app/                 # Next.js pages and API routes
components/          # Reusable React components
lib/
  ├── blockchain/    # Smart contract integration
  ├── hooks/         # Custom React hooks
  ├── store/         # Zustand state management
  ├── utils/         # Utility functions
  └── types/         # TypeScript definitions
public/              # Static assets
styles/              # Global styles
```

## Building and Deployment

### Development
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
pnpm start
```

### Deploy to Vercel
```bash
vercel
```

## Key Features Implementation

### Wallet Connection
- Auto-detect Web3 provider
- Support for MetaMask and WalletConnect
- Network validation (Base Mainnet)
- Persistent connection state

### Contract Integration
- Read methods (balances, allowances)
- Write methods (transfer, approve)
- Real-time balance updates
- Gas estimation and transaction tracking

### State Management
- Wallet state (address, balance, network)
- UI state (theme, modals, notifications)
- Transaction history and tracking
- Persistent localStorage caching

### User Interface
- Base Blue color scheme
- Light and dark modes
- Responsive grid layouts
- Smooth animations and transitions
- Loading states and skeletons
- Toast notifications

## Security Features

- Input validation and sanitization
- XSS prevention
- Signature verification
- Parameterized queries
- Safe browser provider detection
- Error boundaries
- Rate limiting ready

## Performance Optimizations

- Optimized Tailwind CSS bundle
- Image optimization with Next.js
- Caching strategies for RPC calls
- Code splitting and lazy loading
- Production-ready build optimization

## API Endpoints

### Wallet
- `POST /api/wallet/status` - Check wallet connection status

### Contracts
- `GET /api/contracts/balance` - Get token balance

### Transactions
- `GET /api/transactions/list` - Get transaction history

### Chat
- `POST /api/chat` - Send message to AI agent

## Contributing

1. Follow TypeScript strict mode
2. Use semantic component names
3. Add error handling to all async operations
4. Include loading states for UI
5. Test on mobile and desktop
6. Follow Tailwind CSS conventions

## Troubleshooting

### Wallet Connection Issues
- Ensure MetaMask is installed
- Verify network is Base Mainnet (8453)
- Clear browser cache if issues persist

### Missing Balances
- Confirm wallet has tokens on Base
- Check RPC endpoint connectivity
- Try refreshing balances manually

### Transaction Failures
- Verify sufficient Base for gas
- Check contract addresses in .env
- Review transaction parameters

## Support

For issues and questions:
1. Check the [Development Guide](./DEVELOPMENT.md)
2. Review error messages in browser console
3. Verify environment configuration
4. Check Base Mainnet connectivity

## License

This project is built as a demonstration of modern web3 development practices with Next.js.

## Resources

- [Base Documentation](https://base.org)
- [ethers.js Docs](https://docs.ethers.org)
- [Next.js Guide](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)

---

**Built with v0** - Production-ready blockchain application framework
