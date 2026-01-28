-- Create enums for the team ordering system
CREATE TYPE public.sport_type AS ENUM ('soccer', 'basketball', 'american_football', 'baseball_softball', 'track_field', 'cricket', 'business');
CREATE TYPE public.order_status AS ENUM ('draft', 'submitted', 'proof_sent', 'changes_requested', 'approved', 'in_production', 'shipped', 'delivered');
CREATE TYPE public.proof_status AS ENUM ('pending', 'approved', 'revision_requested');

-- Team Orders table
CREATE TABLE public.team_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  sport public.sport_type NOT NULL,
  status public.order_status NOT NULL DEFAULT 'draft',
  
  -- Product selection
  product_type TEXT NOT NULL,
  product_sku TEXT,
  
  -- Style options
  gender TEXT,
  fit TEXT,
  sleeve_type TEXT,
  collar_type TEXT,
  fabric_type TEXT,
  
  -- Add-ons
  extra_logo_placement BOOLEAN DEFAULT false,
  sponsor_placement BOOLEAN DEFAULT false,
  custom_patch BOOLEAN DEFAULT false,
  player_name_addon BOOLEAN DEFAULT false,
  
  -- Design configuration (stored as JSON)
  design_config JSONB DEFAULT '{}',
  
  -- Pricing
  unit_price DECIMAL(10,2),
  total_quantity INTEGER DEFAULT 0,
  subtotal DECIMAL(10,2),
  bulk_discount DECIMAL(10,2) DEFAULT 0,
  customization_fees DECIMAL(10,2) DEFAULT 0,
  shipping_estimate DECIMAL(10,2),
  tax_estimate DECIMAL(10,2),
  total_amount DECIMAL(10,2),
  
  -- Shipping info
  shipping_address JSONB,
  billing_address JSONB,
  
  -- Order notes
  need_by_date DATE,
  special_instructions TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Roster entries table
CREATE TABLE public.order_roster (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.team_orders(id) ON DELETE CASCADE NOT NULL,
  player_name TEXT NOT NULL,
  jersey_number TEXT,
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Design templates table (for saved designs)
CREATE TABLE public.design_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sport public.sport_type NOT NULL,
  product_type TEXT NOT NULL,
  design_config JSONB NOT NULL,
  share_code TEXT UNIQUE,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Proof revisions table
CREATE TABLE public.order_proofs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.team_orders(id) ON DELETE CASCADE NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  proof_url TEXT,
  status public.proof_status NOT NULL DEFAULT 'pending',
  feedback TEXT,
  corrected_logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.team_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_roster ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_proofs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for team_orders
CREATE POLICY "Users can view their own orders"
  ON public.team_orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON public.team_orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders"
  ON public.team_orders FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own draft orders"
  ON public.team_orders FOR DELETE
  USING (auth.uid() = user_id AND status = 'draft');

-- RLS Policies for order_roster
CREATE POLICY "Users can view roster for their orders"
  ON public.order_roster FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.team_orders 
    WHERE team_orders.id = order_roster.order_id 
    AND team_orders.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage roster for their orders"
  ON public.order_roster FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.team_orders 
    WHERE team_orders.id = order_roster.order_id 
    AND team_orders.user_id = auth.uid()
  ));

CREATE POLICY "Users can update roster for their orders"
  ON public.order_roster FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.team_orders 
    WHERE team_orders.id = order_roster.order_id 
    AND team_orders.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete roster for their orders"
  ON public.order_roster FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.team_orders 
    WHERE team_orders.id = order_roster.order_id 
    AND team_orders.user_id = auth.uid()
  ));

-- RLS Policies for design_templates
CREATE POLICY "Users can view their own templates"
  ON public.design_templates FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can create their own templates"
  ON public.design_templates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates"
  ON public.design_templates FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates"
  ON public.design_templates FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for order_proofs
CREATE POLICY "Users can view proofs for their orders"
  ON public.order_proofs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.team_orders 
    WHERE team_orders.id = order_proofs.order_id 
    AND team_orders.user_id = auth.uid()
  ));

CREATE POLICY "Users can update proofs for their orders"
  ON public.order_proofs FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.team_orders 
    WHERE team_orders.id = order_proofs.order_id 
    AND team_orders.user_id = auth.uid()
  ));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_team_orders_updated_at
  BEFORE UPDATE ON public.team_orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_design_templates_updated_at
  BEFORE UPDATE ON public.design_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for design assets
INSERT INTO storage.buckets (id, name, public) VALUES ('design-assets', 'design-assets', true);

-- Storage policies for design assets
CREATE POLICY "Anyone can view design assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'design-assets');

CREATE POLICY "Authenticated users can upload design assets"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'design-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own design assets"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'design-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own design assets"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'design-assets' AND auth.uid()::text = (storage.foldername(name))[1]);