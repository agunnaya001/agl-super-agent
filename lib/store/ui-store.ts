import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';
export type ModalType = 'connect-wallet' | 'transfer' | 'burn-credits' | 'settings' | null;

interface UIStore {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Modals
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    duration?: number;
  }>;
  addNotification: (notification: Omit<typeof notifications[0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingMessage: string | null;
  setLoadingMessage: (message: string | null) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      // Theme
      theme: 'system',
      setTheme: (theme) => set({ theme }),

      // Modals
      activeModal: null,
      openModal: (modal) => set({ activeModal: modal }),
      closeModal: () => set({ activeModal: null }),

      // Sidebar
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Notifications
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            {
              ...notification,
              id: Date.now().toString(),
            },
          ],
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      clearNotifications: () => set({ notifications: [] }),

      // Loading
      isLoading: false,
      setLoading: (isLoading) => set({ isLoading }),
      loadingMessage: null,
      setLoadingMessage: (loadingMessage) => set({ loadingMessage }),
    }),
    {
      name: 'ui-store',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
