# AGL Super Agent - Deployment Guide

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm package manager
- Web3 wallet (MetaMask recommended)

### Local Development

```bash
# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Start development server
pnpm dev
```

Visit `http://localhost:3000`

## Environment Variables

### Required (.env.local)
```
NEXT_PUBLIC_NETWORK_NAME=base
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_AGL_TOKEN_ADDRESS=0xea1221b4d80a89bd8c75248fae7c176bd1854698
NEXT_PUBLIC_AGL_CREDITS_ADDRESS=0x13866F31c60822Ff70684213b9727915Ddf2c183
NEXT_PUBLIC_APP_NAME=AGL Super Agent
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## Network Configuration

### Base Mainnet (Live)
- **Network ID**: 8453
- **RPC Endpoint**: https://mainnet.base.org
- **Explorer**: https://basescan.org
- **Contracts**:
  - AGL Token: `0xea1221b4d80a89bd8c75248fae7c176bd1854698`
  - AGL Credits: `0x13866F31c60822Ff70684213b9727915Ddf2c183`

## Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## Deploying to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

## Testing

### Manual Testing Checklist
- [ ] Wallet connection (MetaMask, WalletConnect)
- [ ] View balances (AGL Token, Credits)
- [ ] Transfer tokens
- [ ] Burn tokens for credits
- [ ] View transaction history
- [ ] Dark/light theme toggle
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Chat interface
- [ ] Error handling

## Security Considerations

1. **Input Validation**: All blockchain addresses and amounts are validated
2. **XSS Prevention**: Input sanitization implemented
3. **RLS**: Ready for backend integration with Row-Level Security
4. **Environment Variables**: All sensitive config in environment files
5. **HTTPS**: Required for production deployment

## Troubleshooting

### Wallet Connection Issues
- Ensure MetaMask is installed
- Check network is set to Base Mainnet (8453)
- Clear browser cache if connection persists

### Balance Not Showing
- Verify wallet has AGL tokens on Base Mainnet
- Check RPC endpoint is responding
- Try refreshing balances

### Transaction Failed
- Ensure sufficient gas on Base
- Verify contract addresses are correct
- Check transaction parameters

## Performance

- **Optimized bundle**: Tailwind CSS purging enabled
- **Image optimization**: Next.js image components
- **Caching**: RPC calls cached via browser providers
- **Code splitting**: Automatic with Next.js

## Monitoring

For production, consider:
- Sentry for error tracking
- Vercel Analytics for performance
- Web3 event listeners for real-time updates
- Transaction status polling

## Future Enhancements

- [ ] WebSocket for real-time updates
- [ ] GraphQL API for efficiency
- [ ] Advanced analytics dashboard
- [ ] Multi-chain support
- [ ] Advanced AI features
- [ ] Mobile app (React Native)
