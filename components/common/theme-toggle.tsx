'use client';

import { useEffect, useState } from 'react';
import { useUIStore } from '@/lib/store/ui-store';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <button
      onClick={() => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
      }}
      className="p-2 hover:bg-secondary rounded transition"
      title="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
