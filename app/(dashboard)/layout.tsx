import Sidebar from '@/components/layout/sidebar';
import Navbar from '@/components/layout/navbar';
import DashboardWrapper from '@/components/layout/dashboard-wrapper';
import Notifications from '@/components/common/notifications';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardWrapper>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
      <Notifications />
    </DashboardWrapper>
  );
}
