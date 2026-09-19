import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/localBackend';
import { useToast } from '@/hooks/use-toast';

type OrderStatus =
  | 'draft'
  | 'submitted'
  | 'proof_sent'
  | 'changes_requested'
  | 'approved'
  | 'in_production'
  | 'shipped'
  | 'delivered';

const STATUS_OPTIONS: OrderStatus[] = [
  'draft', 'submitted', 'proof_sent', 'changes_requested', 'approved', 'in_production', 'shipped', 'delivered',
];

const statusColors: Record<string, string> = {
  draft: 'bg-muted text-muted-foreground',
  submitted: 'bg-primary/10 text-primary',
  proof_sent: 'bg-accent text-accent-foreground',
  changes_requested: 'bg-destructive/10 text-destructive',
  approved: 'bg-primary/20 text-primary',
  in_production: 'bg-primary/30 text-primary',
  shipped: 'bg-primary/40 text-primary',
  delivered: 'bg-primary/50 text-primary-foreground',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('team_orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    const { error } = await supabase
      .from('team_orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast({ title: 'Error updating status', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Status updated' });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground mt-1">Manage all team orders</p>
        </div>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : orders.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No orders found.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Sport</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="text-sm">{new Date(order.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="capitalize text-sm">{order.sport?.replace(/_/g, ' ')}</TableCell>
                      <TableCell className="text-sm">{order.product_type}</TableCell>
                      <TableCell className="text-sm">{order.total_quantity || '—'}</TableCell>
                      <TableCell className="text-sm font-medium">
                        {order.total_amount ? `$${Number(order.total_amount).toFixed(2)}` : '—'}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(val) => updateStatus(order.id, val as OrderStatus)}
                        >
                          <SelectTrigger className="w-[160px] h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((s) => (
                              <SelectItem key={s} value={s} className="text-xs capitalize">
                                {s.replace(/_/g, ' ')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
