import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminRole } from '@/hooks/useAdminRole';
import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard, ShoppingCart, Users, FileText, LogOut, Shield, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Content', href: '/admin/content', icon: FileText },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { isAdmin, loading } = useAdminRole();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 p-8">
          <Shield className="h-16 w-16 mx-auto text-muted-foreground" />
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">You don't have admin privileges.</p>
          <Button onClick={() => navigate('/')} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Site
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-secondary">
      {/* Sidebar */}
      <aside className="w-64 bg-foreground text-background flex flex-col">
        <div className="p-6 border-b border-background/10">
          <h2 className="text-lg font-bold tracking-tight">TiDi Admin</h2>
          <p className="text-xs text-background/50 mt-1">{user.email}</p>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  isActive
                    ? 'bg-background/10 text-background font-medium'
                    : 'text-background/60 hover:text-background hover:bg-background/5'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-background/10 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-background/60 hover:text-background hover:bg-background/5"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Site
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-background/60 hover:text-background hover:bg-background/5"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
