'use client';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-muted rounded ${className}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-card rounded-lg p-6 border border-border space-y-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}
