import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { ShoppingCart, Users, DollarSign, TrendingUp } from 'lucide-react';

interface Stats {
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalOrders: 0, totalUsers: 0, totalRevenue: 0, pendingOrders: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [ordersRes, usersRes, pendingRes] = await Promise.all([
        supabase.from('team_orders').select('id, total_amount, status'),
        supabase.from('profiles').select('id'),
        supabase.from('team_orders').select('id').in('status', ['submitted', 'proof_sent', 'changes_requested']),
      ]);

      const orders = ordersRes.data || [];
      const revenue = orders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);

      setStats({
        totalOrders: orders.length,
        totalUsers: usersRes.data?.length || 0,
        totalRevenue: revenue,
        pendingOrders: pendingRes.data?.length || 0,
      });
    };

    const fetchRecent = async () => {
      const { data } = await supabase
        .from('team_orders')
        .select('id, sport, product_type, status, total_amount, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      setRecentOrders(data || []);
    };

    fetchStats();
    fetchRecent();
  }, []);

  const statCards = [
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'text-foreground' },
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-foreground' },
    { label: 'Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-foreground' },
    { label: 'Pending', value: stats.pendingOrders, icon: TrendingUp, color: 'text-destructive' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => (
            <Card key={card.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-muted-foreground text-sm">No orders yet.</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium text-sm">{order.sport} — {order.product_type}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-muted font-medium capitalize">
                        {order.status?.replace(/_/g, ' ')}
                      </span>
                      {order.total_amount && (
                        <p className="text-sm font-semibold mt-1">${Number(order.total_amount).toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
