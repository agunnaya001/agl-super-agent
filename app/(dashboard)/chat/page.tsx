'use client';

import RootLayout from '@/components/layout/root-layout';
import { useWallet } from '@/lib/hooks/useWallet';
import { useUIStore } from '@/lib/store/ui-store';
import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export default function ChatPage() {
  const { isConnected } = useWallet();
  const { addNotification } = useUIStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isConnected) {
    return (
      <RootLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-muted-foreground">Connect wallet to use AI Chat</p>
        </div>
      </RootLayout>
    );
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Placeholder for AI response
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            'I am the AGL Super Agent AI. I can help you manage your tokens, understand blockchain transactions, and provide insights about the platform. How can I assist you?',
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to get response',
      });
      setLoading(false);
    }
  };

  return (
    <RootLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <MessageCircle size={32} className="text-primary" />
          <h2 className="text-3xl font-bold">AGL Super Agent AI</h2>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-card rounded-lg border border-border p-6 mb-6 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <MessageCircle size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Start a conversation with the AGL Super Agent AI
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-foreground px-4 py-2 rounded-lg">
                    <p className="text-sm">Thinking...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask me anything about AGL..."
            className="flex-1 px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
          >
            <Send size={20} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </RootLayout>
  );
}
