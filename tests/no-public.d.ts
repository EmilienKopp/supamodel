export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  Tables: {
    books: {
      Row: {
        author: string | null;
        description: string | null;
        id: number;
        title: string | null;
      };
      Insert: {
        author?: string | null;
        description?: string | null;
        id?: number;
        title?: string | null;
      };
      Update: {
        author?: string | null;
        description?: string | null;
        id?: number;
        title?: string | null;
      };
      Relationships: [];
    };
    companies: {
      Row: {
        address: string | null;
        code: string | null;
        contact_email: string;
        contact_phone: string | null;
        corporate_number: string | null;
        created_at: string | null;
        employees_count: number | null;
        id: number;
        is_active: boolean;
        is_public: boolean;
        name: string;
        representative_id: number;
        updated_at: string | null;
      };
      Insert: {
        address?: string | null;
        code?: string | null;
        contact_email: string;
        contact_phone?: string | null;
        corporate_number?: string | null;
        created_at?: string | null;
        employees_count?: number | null;
        id?: number;
        is_active?: boolean;
        is_public?: boolean;
        name: string;
        representative_id: number;
        updated_at?: string | null;
      };
      Update: {
        address?: string | null;
        code?: string | null;
        contact_email?: string;
        contact_phone?: string | null;
        corporate_number?: string | null;
        created_at?: string | null;
        employees_count?: number | null;
        id?: number;
        is_active?: boolean;
        is_public?: boolean;
        name?: string;
        representative_id?: number;
        updated_at?: string | null;
      };
      Relationships: [
        {
          foreignKeyName: "companies_representative_id_foreign";
          columns: ["representative_id"];
          isOneToOne: false;
          referencedRelation: "users";
          referencedColumns: ["id"];
        }
      ];
    };
    users: {
      Row: {
        avatar: string | null;
        created_at: string | null;
        email: string;
        email_verified_at: string | null;
        id: number;
        last_login: string | null;
        name: string;
        password: string | null;
        remember_token: string | null;
        timezone: string | null;
        updated_at: string | null;
      };
      Insert: {
        avatar?: string | null;
        created_at?: string | null;
        email: string;
        email_verified_at?: string | null;
        id?: number;
        last_login?: string | null;
        name: string;
        password?: string | null;
        remember_token?: string | null;
        timezone?: string | null;
        updated_at?: string | null;
      };
      Update: {
        avatar?: string | null;
        created_at?: string | null;
        email?: string;
        email_verified_at?: string | null;
        id?: number;
        last_login?: string | null;
        name?: string;
        password?: string | null;
        remember_token?: string | null;
        timezone?: string | null;
        updated_at?: string | null;
      };
      Relationships: [];
    };
  };
  Views: {
    daily_logs: {
      Row: {
        date: string | null;
        is_running: boolean | null;
        project_id: number | null;
        project_name: string | null;
        total_minutes: number | null;
        total_seconds: number | null;
        user_id: number | null;
        user_name: string | null;
      };
      Relationships: [
        {
          foreignKeyName: "time_logs_project_id_foreign";
          columns: ["project_id"];
          isOneToOne: false;
          referencedRelation: "projects";
          referencedColumns: ["id"];
        },
        {
          foreignKeyName: "time_logs_user_id_foreign";
          columns: ["user_id"];
          isOneToOne: false;
          referencedRelation: "users";
          referencedColumns: ["id"];
        }
      ];
    };
  };
  Enums: {
    oauth_providers:
      | "google"
      | "line"
      | "discord"
      | "github"
      | "gitlab"
      | "facebook"
      | "slack";
  };
  CompositeTypes: {
    [_ in never]: never;
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];