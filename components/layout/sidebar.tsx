'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/lib/store/ui-store';
import {
  Home,
  LayoutDashboard,
  Coins,
  Gift,
  MessageCircle,
  BarChart3,
} from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/token', icon: LayoutDashboard },
  { name: 'Portfolio', href: '/portfolio', icon: BarChart3 },
  { name: 'AGL Token', href: '/token', icon: Coins },
  { name: 'Credits', href: '/credits', icon: Gift },
  { name: 'Chat', href: '/chat', icon: MessageCircle },
  { name: 'History', href: '/history', icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen } = useUIStore();

  if (!sidebarOpen) return null;

  return (
    <aside className="fixed md:static inset-0 md:inset-auto top-16 md:top-0 w-64 bg-sidebar border-r border-sidebar-border z-30 md:z-0 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:bg-opacity-50'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
