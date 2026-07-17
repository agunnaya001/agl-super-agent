# AGL Super Agent - Development Guide

## Project Structure

```
app/                          # Next.js App Router
├── (auth)/                  # Authentication routes
├── (dashboard)/             # Main dashboard routes
│   ├── page.tsx            # Dashboard home
│   ├── token/              # Token management
│   ├── credits/            # Credits management
│   ├── chat/               # AI chat interface
│   ├── history/            # Transaction history
│   ├── portfolio/          # Portfolio analytics
│   └── settings/           # User settings
├── api/                     # API routes
│   ├── wallet/             # Wallet endpoints
│   ├── contracts/          # Contract endpoints
│   ├── transactions/       # Transaction endpoints
│   └── chat/               # Chat endpoints
├── layout.tsx              # Root layout
├── page.tsx                # Home page
└── globals.css             # Global styles

components/                  # React components
├── layout/                 # Layout components
│   ├── navbar.tsx          # Navigation bar
│   ├── sidebar.tsx         # Sidebar navigation
│   └── root-layout.tsx     # Root wrapper
├── wallet/                 # Wallet components
│   └── connect-modal.tsx   # Wallet connection modal
├── contract/               # Contract components
├── dashboard/              # Dashboard components
│   └── balance-card.tsx    # Balance display
├── chat/                   # Chat components
└── common/                 # Common utilities
    ├── theme-toggle.tsx    # Theme toggle button
    ├── skeleton.tsx        # Loading skeleton
    └── notifications.tsx   # Toast notifications

lib/                        # Core business logic
├── blockchain/             # Blockchain integration
│   ├── provider.ts         # ethers.js provider
│   ├── wallet.ts           # Wallet utilities
│   ├── abis/              # Smart contract ABIs
│   │   ├── agl-token.ts
│   │   └── agl-credits.ts
│   └── services/          # Contract services
│       ├── agl-token.ts
│       ├── agl-credits.ts
│       └── transaction.ts
├── hooks/                 # Custom React hooks
│   ├── useWallet.ts       # Wallet hook
│   ├── useTransaction.ts  # Transaction hook
│   └── useAGLBalance.ts   # Balance hooks
├── store/                 # Zustand stores
│   ├── wallet-store.ts    # Wallet state
│   ├── ui-store.ts        # UI state
│   └── transaction-store.ts # Transaction state
├── utils/                 # Utility functions
│   ├── formatting.ts      # Number, date formatting
│   ├── validation.ts      # Input validation
│   ├── errors.ts          # Error handling
│   ├── constants.ts       # Constants
│   └── theme.ts           # Theme utilities
├── types/                 # TypeScript types
└── config.ts              # Configuration

public/                     # Static assets
└── images/                # Image assets
```

## Development Workflow

### Adding a New Feature

1. **Create Components** in `components/`
2. **Add Types** to `lib/types/index.ts`
3. **Create Hooks** if needed in `lib/hooks/`
4. **Update Stores** in `lib/store/` for state management
5. **Create Pages** in `app/` following Next.js routing
6. **Add API Routes** in `app/api/` if backend needed

### Blockchain Integration

#### Reading Data (Non-state changing)
```typescript
import * as AGLTokenService from '@/lib/blockchain/services/agl-token';

// Get balance
const balance = await AGLTokenService.getBalance(address);
```

#### Writing Data (State changing - requires signer)
```typescript
// Transfer tokens
const txHash = await AGLTokenService.transfer(to, amount);

// Track transaction
const { track } = useTransaction();
await track(txHash, 'transfer', 'Transfer tokens');
```

### State Management

#### Using Zustand Stores
```typescript
import { useWalletStore } from '@/lib/store/wallet-store';

export function MyComponent() {
  const { address, setAddress } = useWalletStore();
  // ...
}
```

### Styling

- Use Tailwind CSS utilities in JSX
- Base Blue theme: `bg-primary`, `text-primary`
- Semantic color names: `bg-destructive`, `text-muted-foreground`
- Responsive: `md:grid-cols-2`, `lg:text-xl`

## Common Patterns

### Using Hooks
```typescript
export function MyComponent() {
  const { isConnected, address, aglBalance } = useWallet();

  if (!isConnected) {
    return <div>Connect wallet</div>;
  }

  return <div>Balance: {aglBalance}</div>;
}
```

### Showing Notifications
```typescript
const { addNotification } = useUIStore();

addNotification({
  type: 'success',
  message: 'Transaction confirmed',
  duration: 5000,
});
```

### Making API Calls
```typescript
const response = await fetch('/api/wallet/status', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ address }),
});

const data = await response.json();
```

## Testing

### Unit Tests
```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch
```

### Manual Testing
1. Start dev server: `pnpm dev`
2. Open http://localhost:3000
3. Connect wallet to MetaMask
4. Test features

## Debugging

### Enable Debug Logs
```typescript
console.log('[Feature Name] Message:', variable);
```

### Browser DevTools
- Redux DevTools: Check Zustand store state
- Network tab: Monitor API calls
- Console: Check for errors

## Best Practices

1. **Type Safety**: Use TypeScript for all code
2. **Error Handling**: Always wrap blockchain calls in try-catch
3. **Loading States**: Show loading UI during async operations
4. **Input Validation**: Validate all user inputs
5. **Comments**: Document complex logic
6. **Component Size**: Keep components under 300 lines
7. **Naming**: Use descriptive names for variables and functions

## Environment

- **Runtime**: Node.js 18+
- **Package Manager**: pnpm
- **Framework**: Next.js 15
- **UI**: React 19
- **Styling**: Tailwind CSS 4.3
- **State**: Zustand
- **Blockchain**: ethers.js 6.17
- **Type Safety**: TypeScript 5.7

## Useful Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run linter
pnpm type-check       # Check TypeScript
pnpm format           # Format code
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [ethers.js Documentation](https://docs.ethers.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Base Mainnet](https://base.org)
