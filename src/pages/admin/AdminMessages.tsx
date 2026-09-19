import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) console.error(error);
      setMessages(data || []);
      setLoading(false);
    })();
  }, []);

  const markRead = async (id: string, isRead: boolean) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: isRead })
      .eq('id', id);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
      return;
    }
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: isRead } : m)));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground mt-1">Enquiries submitted through the contact form</p>
        </div>

        {loading ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">Loading...</CardContent>
          </Card>
        ) : messages.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No messages yet.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <Card key={m.id}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">
                        {m.name}
                        {!m.is_read && (
                          <Badge className="ml-2" variant="secondary">
                            New
                          </Badge>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {m.email}
                        {m.phone ? ` · ${m.phone}` : ''}
                        {m.organization ? ` · ${m.organization}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(m.created_at).toLocaleString()}
                      </span>
                      <Button size="sm" variant="outline" onClick={() => markRead(m.id, !m.is_read)}>
                        {m.is_read ? 'Mark unread' : 'Mark read'}
                      </Button>
                    </div>
                  </div>
                  {m.subject && <p className="text-sm font-medium">{m.subject}</p>}
                  <p className="text-sm whitespace-pre-wrap">{m.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
