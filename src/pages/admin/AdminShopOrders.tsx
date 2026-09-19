import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/shipping';

const PAYMENT_STATUSES = ['pending', 'paid', 'failed', 'refunded'] as const;
const FULFILLMENT_STATUSES = ['new', 'processing', 'shipped', 'delivered', 'cancelled'] as const;

export default function AdminShopOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [items, setItems] = useState<Record<string, any[]>>({});
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('shop_orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) console.error(error);
      setOrders(data || []);
      setLoading(false);
    })();
  }, []);

  const loadItems = async (orderId: string) => {
    if (items[orderId]) return;
    const { data } = await supabase.from('shop_order_items').select('*').eq('order_id', orderId);
    setItems((prev) => ({ ...prev, [orderId]: data || [] }));
  };

  const updateField = async (orderId: string, field: string, value: string) => {
    const { error } = await supabase
      .from('shop_orders')
      .update({ [field]: value } as any)
      .eq('id', orderId);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Order updated' });
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, [field]: value } : o)));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Shop Orders</h1>
          <p className="text-muted-foreground mt-1">Online store orders and payment status</p>
        </div>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : orders.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No shop orders yet.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Fulfillment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <>
                      <TableRow
                        key={order.id}
                        className="cursor-pointer"
                        onClick={() => {
                          setExpanded(expanded === order.id ? null : order.id);
                          loadItems(order.id);
                        }}
                      >
                        <TableCell className="text-sm font-medium">{order.order_number}</TableCell>
                        <TableCell className="text-sm">
                          {new Date(order.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-sm">
                          {order.first_name} {order.last_name}
                          <span className="block text-xs text-muted-foreground">{order.email}</span>
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {formatPrice(Number(order.total))}
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Select
                            value={order.payment_status}
                            onValueChange={(v) => updateField(order.id, 'payment_status', v)}
                          >
                            <SelectTrigger className="w-[130px] h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {PAYMENT_STATUSES.map((s) => (
                                <SelectItem key={s} value={s} className="text-xs capitalize">
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Select
                            value={order.fulfillment_status}
                            onValueChange={(v) => updateField(order.id, 'fulfillment_status', v)}
                          >
                            <SelectTrigger className="w-[140px] h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {FULFILLMENT_STATUSES.map((s) => (
                                <SelectItem key={s} value={s} className="text-xs capitalize">
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                      {expanded === order.id && (
                        <TableRow key={`${order.id}-detail`}>
                          <TableCell colSpan={6} className="bg-muted/50">
                            <div className="p-2 space-y-3">
                              <div className="text-sm">
                                <Badge variant="secondary" className="mr-2 capitalize">
                                  {order.shipping_method}
                                </Badge>
                                {[
                                  order.address_line1,
                                  order.address_line2,
                                  order.city,
                                  order.state,
                                  order.postal_code,
                                  order.country,
                                ]
                                  .filter(Boolean)
                                  .join(', ')}
                              </div>
                              {order.notes && (
                                <p className="text-sm text-muted-foreground">Notes: {order.notes}</p>
                              )}
                              <div className="space-y-1">
                                {(items[order.id] || []).map((item) => (
                                  <div key={item.id} className="flex justify-between text-sm">
                                    <span>
                                      {item.name}
                                      {item.size ? ` · ${item.size}` : ''} × {item.quantity}
                                    </span>
                                    <span>{formatPrice(Number(item.line_total))}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
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
