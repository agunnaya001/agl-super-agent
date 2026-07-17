'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/lib/store/ui-store';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function Notifications() {
  const { notifications, removeNotification } = useUIStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => {
        const getIcon = () => {
          switch (notification.type) {
            case 'success':
              return <CheckCircle size={20} />;
            case 'error':
              return <AlertCircle size={20} />;
            case 'warning':
              return <AlertTriangle size={20} />;
            default:
              return <Info size={20} />;
          }
        };

        const getColor = () => {
          switch (notification.type) {
            case 'success':
              return 'bg-green-900 border-green-700 text-green-100';
            case 'error':
              return 'bg-red-900 border-red-700 text-red-100';
            case 'warning':
              return 'bg-yellow-900 border-yellow-700 text-yellow-100';
            default:
              return 'bg-blue-900 border-blue-700 text-blue-100';
          }
        };

        return (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
            icon={getIcon()}
            colorClass={getColor()}
          />
        );
      })}
    </div>
  );
}

function NotificationItem({
  notification,
  onClose,
  icon,
  colorClass,
}: {
  notification: any;
  onClose: () => void;
  icon: React.ReactNode;
  colorClass: string;
}) {
  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(onClose, notification.duration);
      return () => clearTimeout(timer);
    }
  }, [notification.duration, onClose]);

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border ${colorClass} animate-in fade-in slide-in-from-right-full`}
    >
      {icon}
      <p className="flex-1 text-sm">{notification.message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-75 transition"
      >
        <X size={16} />
      </button>
    </div>
  );
}
