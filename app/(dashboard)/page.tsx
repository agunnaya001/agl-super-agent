import Link from 'next/link';

export default function DashboardHome() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Connect your wallet to access the full dashboard experience.
        </p>
        <Link href="/" className="text-primary hover:underline">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
