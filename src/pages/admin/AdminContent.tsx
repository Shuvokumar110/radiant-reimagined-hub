import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/localBackend';

export default function AdminContent() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const [templatesRes, draftsRes] = await Promise.all([
        supabase.from('design_templates').select('*').order('created_at', { ascending: false }),
        supabase.from('draft_orders').select('*').order('updated_at', { ascending: false }),
      ]);
      setTemplates(templatesRes.data || []);
      setDrafts(draftsRes.data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Content</h1>
          <p className="text-muted-foreground mt-1">Manage design templates and draft orders</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Design Templates ({templates.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : templates.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No templates yet.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Sport</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Public</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium text-sm">{t.name}</TableCell>
                      <TableCell className="text-sm capitalize">{t.sport?.replace(/_/g, ' ')}</TableCell>
                      <TableCell className="text-sm">{t.product_type}</TableCell>
                      <TableCell>
                        <Badge variant={t.is_public ? 'default' : 'secondary'} className="text-xs">
                          {t.is_public ? 'Public' : 'Private'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{new Date(t.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Draft Orders ({drafts.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {drafts.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No drafts.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="font-medium text-sm">{d.name || 'Untitled'}</TableCell>
                      <TableCell className="text-sm">{new Date(d.updated_at).toLocaleDateString()}</TableCell>
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
