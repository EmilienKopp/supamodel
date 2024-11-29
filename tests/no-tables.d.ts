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
  public: {
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
};

type PublicSchema = Database[Extract<keyof Database, "public">];
