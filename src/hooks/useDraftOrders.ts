import { useState } from 'react';
import { supabase } from '@/lib/localBackend';
import { useAuth } from './useAuth';
import { TeamBuilderState } from '@/context/TeamBuilderContext';
import { useToast } from './use-toast';

export interface DraftOrder {
  id: string;
  name: string;
  state: TeamBuilderState;
  created_at: string;
  updated_at: string;
}

export function useDraftOrders() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [drafts, setDrafts] = useState<DraftOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDrafts = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('draft_orders')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching drafts:', error);
    } else {
      setDrafts((data || []).map(d => ({
        ...d,
        state: d.state as unknown as TeamBuilderState,
      })));
    }
    setLoading(false);
  };

  const saveDraft = async (state: TeamBuilderState, draftId?: string, name?: string) => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to save your progress.',
        variant: 'destructive',
      });
      return null;
    }

    const draftName = name || `${state.sport || 'Draft'} - ${state.product?.name || 'Untitled'}`;
    
    if (draftId) {
      const { error } = await supabase
        .from('draft_orders')
        .update({ state: JSON.parse(JSON.stringify(state)), name: draftName })
        .eq('id', draftId);

      if (error) {
        toast({ title: 'Error saving draft', description: error.message, variant: 'destructive' });
        return null;
      }
      toast({ title: 'Draft saved', description: 'Your progress has been saved.' });
      return draftId;
    } else {
      const { data, error } = await supabase
        .from('draft_orders')
        .insert([{ user_id: user.id, state: JSON.parse(JSON.stringify(state)), name: draftName }])
        .select('id')
        .single();

      if (error) {
        toast({ title: 'Error saving draft', description: error.message, variant: 'destructive' });
        return null;
      }
      toast({ title: 'Draft saved', description: 'Your progress has been saved.' });
      return data?.id || null;
    }
  };

  const deleteDraft = async (draftId: string) => {
    const { error } = await supabase
      .from('draft_orders')
      .delete()
      .eq('id', draftId);

    if (error) {
      toast({ title: 'Error deleting draft', description: error.message, variant: 'destructive' });
    } else {
      setDrafts(prev => prev.filter(d => d.id !== draftId));
      toast({ title: 'Draft deleted' });
    }
  };

  return { drafts, loading, fetchDrafts, saveDraft, deleteDraft };
}
