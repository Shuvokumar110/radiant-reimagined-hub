export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      design_templates: {
        Row: {
          created_at: string
          design_config: Json
          id: string
          is_public: boolean | null
          name: string
          product_type: string
          share_code: string | null
          sport: Database["public"]["Enums"]["sport_type"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          design_config: Json
          id?: string
          is_public?: boolean | null
          name: string
          product_type: string
          share_code?: string | null
          sport: Database["public"]["Enums"]["sport_type"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          design_config?: Json
          id?: string
          is_public?: boolean | null
          name?: string
          product_type?: string
          share_code?: string | null
          sport?: Database["public"]["Enums"]["sport_type"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      draft_orders: {
        Row: {
          created_at: string
          id: string
          name: string | null
          state: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          state?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          state?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      order_proofs: {
        Row: {
          corrected_logo_url: string | null
          created_at: string
          feedback: string | null
          id: string
          order_id: string
          proof_url: string | null
          reviewed_at: string | null
          status: Database["public"]["Enums"]["proof_status"]
          version: number
        }
        Insert: {
          corrected_logo_url?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          order_id: string
          proof_url?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["proof_status"]
          version?: number
        }
        Update: {
          corrected_logo_url?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          order_id?: string
          proof_url?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["proof_status"]
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_proofs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "team_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_roster: {
        Row: {
          created_at: string
          id: string
          jersey_number: string | null
          notes: string | null
          order_id: string
          player_name: string
          quantity: number
          size: string
        }
        Insert: {
          created_at?: string
          id?: string
          jersey_number?: string | null
          notes?: string | null
          order_id: string
          player_name: string
          quantity?: number
          size: string
        }
        Update: {
          created_at?: string
          id?: string
          jersey_number?: string | null
          notes?: string | null
          order_id?: string
          player_name?: string
          quantity?: number
          size?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_roster_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "team_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          organization_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          organization_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          organization_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      team_orders: {
        Row: {
          billing_address: Json | null
          bulk_discount: number | null
          collar_type: string | null
          created_at: string
          custom_patch: boolean | null
          customization_fees: number | null
          design_config: Json | null
          extra_logo_placement: boolean | null
          fabric_type: string | null
          fit: string | null
          gender: string | null
          id: string
          need_by_date: string | null
          player_name_addon: boolean | null
          product_sku: string | null
          product_type: string
          shipping_address: Json | null
          shipping_estimate: number | null
          sleeve_type: string | null
          special_instructions: string | null
          sponsor_placement: boolean | null
          sport: Database["public"]["Enums"]["sport_type"]
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number | null
          tax_estimate: number | null
          total_amount: number | null
          total_quantity: number | null
          unit_price: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          billing_address?: Json | null
          bulk_discount?: number | null
          collar_type?: string | null
          created_at?: string
          custom_patch?: boolean | null
          customization_fees?: number | null
          design_config?: Json | null
          extra_logo_placement?: boolean | null
          fabric_type?: string | null
          fit?: string | null
          gender?: string | null
          id?: string
          need_by_date?: string | null
          player_name_addon?: boolean | null
          product_sku?: string | null
          product_type: string
          shipping_address?: Json | null
          shipping_estimate?: number | null
          sleeve_type?: string | null
          special_instructions?: string | null
          sponsor_placement?: boolean | null
          sport: Database["public"]["Enums"]["sport_type"]
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number | null
          tax_estimate?: number | null
          total_amount?: number | null
          total_quantity?: number | null
          unit_price?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          billing_address?: Json | null
          bulk_discount?: number | null
          collar_type?: string | null
          created_at?: string
          custom_patch?: boolean | null
          customization_fees?: number | null
          design_config?: Json | null
          extra_logo_placement?: boolean | null
          fabric_type?: string | null
          fit?: string | null
          gender?: string | null
          id?: string
          need_by_date?: string | null
          player_name_addon?: boolean | null
          product_sku?: string | null
          product_type?: string
          shipping_address?: Json | null
          shipping_estimate?: number | null
          sleeve_type?: string | null
          special_instructions?: string | null
          sponsor_placement?: boolean | null
          sport?: Database["public"]["Enums"]["sport_type"]
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number | null
          tax_estimate?: number | null
          total_amount?: number | null
          total_quantity?: number | null
          unit_price?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      order_status:
        | "draft"
        | "submitted"
        | "proof_sent"
        | "changes_requested"
        | "approved"
        | "in_production"
        | "shipped"
        | "delivered"
      proof_status: "pending" | "approved" | "revision_requested"
      sport_type:
        | "soccer"
        | "basketball"
        | "american_football"
        | "baseball_softball"
        | "track_field"
        | "cricket"
        | "business"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      order_status: [
        "draft",
        "submitted",
        "proof_sent",
        "changes_requested",
        "approved",
        "in_production",
        "shipped",
        "delivered",
      ],
      proof_status: ["pending", "approved", "revision_requested"],
      sport_type: [
        "soccer",
        "basketball",
        "american_football",
        "baseball_softball",
        "track_field",
        "cricket",
        "business",
      ],
    },
  },
} as const
