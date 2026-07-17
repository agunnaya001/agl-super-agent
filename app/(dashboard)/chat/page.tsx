'use client';

import { MessageCircle } from 'lucide-react';

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">AI Chat Assistant</h1>
          <p className="text-lg text-muted-foreground">
            Coming soon - Interact with blockchain-aware AI agents
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <MessageCircle size={48} className="mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">Chat Feature Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The AI chat assistant is currently in development. This feature will allow you to interact with 
            blockchain-aware AI agents for transaction assistance and platform guidance.
          </p>
          
          <div className="mt-8 p-4 bg-secondary/30 rounded-lg border border-border inline-block">
            <p className="text-sm text-muted-foreground">
              In the meantime, you can use all other features:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-foreground text-left">
              <li>✓ Manage AGL tokens</li>
              <li>✓ Convert tokens to credits</li>
              <li>✓ Track portfolio performance</li>
              <li>✓ View transaction history</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
