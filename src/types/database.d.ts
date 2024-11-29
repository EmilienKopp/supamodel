
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activities: {
        Row: {
          comment: string | null
          created_at: string | null
          date: string | null
          duration: number | null
          end_time: string | null
          id: number
          project_id: number
          rate: number | null
          start_time: string | null
          task_category_id: number
          task_id: number | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          date?: string | null
          duration?: number | null
          end_time?: string | null
          id?: number
          project_id: number
          rate?: number | null
          start_time?: string | null
          task_category_id: number
          task_id?: number | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          date?: string | null
          duration?: number | null
          end_time?: string | null
          id?: number
          project_id?: number
          rate?: number | null
          start_time?: string | null
          task_category_id?: number
          task_id?: number | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "activities_project_id_foreign"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_task_category_id_foreign"
            columns: ["task_category_id"]
            isOneToOne: false
            referencedRelation: "task_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_task_id_foreign"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_user_id_foreign"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          author: string | null
          description: string | null
          id: number
          title: string | null
        }
        Insert: {
          author?: string | null
          description?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          author?: string | null
          description?: string | null
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          address: string | null
          code: string | null
          contact_email: string
          contact_phone: string | null
          corporate_number: string | null
          created_at: string | null
          employees_count: number | null
          id: number
          is_active: boolean
          is_public: boolean
          name: string
          representative_id: number
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          code?: string | null
          contact_email: string
          contact_phone?: string | null
          corporate_number?: string | null
          created_at?: string | null
          employees_count?: number | null
          id?: number
          is_active?: boolean
          is_public?: boolean
          name: string
          representative_id: number
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          code?: string | null
          contact_email?: string
          contact_phone?: string | null
          corporate_number?: string | null
          created_at?: string | null
          employees_count?: number | null
          id?: number
          is_active?: boolean
          is_public?: boolean
          name?: string
          representative_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_representative_id_foreign"
            columns: ["representative_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      company_user: {
        Row: {
          company_id: number
          created_at: string | null
          role_id: number
          updated_at: string | null
          user_id: number
        }
        Insert: {
          company_id: number
          created_at?: string | null
          role_id: number
          updated_at?: string | null
          user_id: number
        }
        Update: {
          company_id?: number
          created_at?: string | null
          role_id?: number
          updated_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_user_company_id_foreign"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_user_role_id_foreign"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_user_user_id_foreign"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      connection_requests: {
        Row: {
          company_id: number | null
          created_at: string | null
          id: number
          receiver_id: number | null
          role_id: number
          sender_id: number
          status: string
          updated_at: string | null
        }
        Insert: {
          company_id?: number | null
          created_at?: string | null
          id?: number
          receiver_id?: number | null
          role_id: number
          sender_id: number
          status?: string
          updated_at?: string | null
        }
        Update: {
          company_id?: number | null
          created_at?: string | null
          id?: number
          receiver_id?: number | null
          role_id?: number
          sender_id?: number
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "connection_requests_company_id_foreign"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connection_requests_receiver_id_foreign"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connection_requests_role_id_foreign"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connection_requests_sender_id_foreign"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      diary_entries: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          mood_score: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
          mood_score?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
          mood_score?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      failed_jobs: {
        Row: {
          connection: string
          exception: string
          failed_at: string
          id: number
          payload: string
          queue: string
          uuid: string
        }
        Insert: {
          connection: string
          exception: string
          failed_at?: string
          id?: number
          payload: string
          queue: string
          uuid: string
        }
        Update: {
          connection?: string
          exception?: string
          failed_at?: string
          id?: number
          payload?: string
          queue?: string
          uuid?: string
        }
        Relationships: []
      }
      identities: {
        Row: {
          access_token: string | null
          created_at: string | null
          expires_in: string | null
          id: number
          oauth_id: string
          oauth_provider: Database["public"]["Enums"]["oauth_providers"] | null
          refresh_token: string | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          expires_in?: string | null
          id?: number
          oauth_id: string
          oauth_provider?: Database["public"]["Enums"]["oauth_providers"] | null
          refresh_token?: string | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          expires_in?: string | null
          id?: number
          oauth_id?: string
          oauth_provider?: Database["public"]["Enums"]["oauth_providers"] | null
          refresh_token?: string | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "identities_user_id_foreign"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      migrations: {
        Row: {
          batch: number
          id: number
          migration: string
        }
        Insert: {
          batch: number
          id?: number
          migration: string
        }
        Update: {
          batch?: number
          id?: number
          migration?: string
        }
        Relationships: []
      }
      password_reset_tokens: {
        Row: {
          created_at: string | null
          email: string
          token: string
        }
        Insert: {
          created_at?: string | null
          email: string
          token: string
        }
        Update: {
          created_at?: string | null
          email?: string
          token?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          ability: string
          created_at: string | null
          id: number
          model: string
          role_id: number
          updated_at: string | null
        }
        Insert: {
          ability: string
          created_at?: string | null
          id?: number
          model: string
          role_id: number
          updated_at?: string | null
        }
        Update: {
          ability?: string
          created_at?: string | null
          id?: number
          model?: string
          role_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permissions_role_id_foreign"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      personal_access_tokens: {
        Row: {
          abilities: string | null
          created_at: string | null
          expires_at: string | null
          id: number
          last_used_at: string | null
          name: string
          token: string
          tokenable_id: number
          tokenable_type: string
          updated_at: string | null
        }
        Insert: {
          abilities?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          name: string
          token: string
          tokenable_id: number
          tokenable_type: string
          updated_at?: string | null
        }
        Update: {
          abilities?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          name?: string
          token?: string
          tokenable_id?: number
          tokenable_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          balance_high: number | null
          balance_low: number | null
          balance_mid: number | null
          budget_high: number | null
          budget_low: number | null
          budget_mid: number | null
          company_id: number | null
          created_at: string | null
          currency: string
          description: string | null
          end_date: string | null
          id: number
          name: string
          spent: number | null
          start_date: string | null
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          balance_high?: number | null
          balance_low?: number | null
          balance_mid?: number | null
          budget_high?: number | null
          budget_low?: number | null
          budget_mid?: number | null
          company_id?: number | null
          created_at?: string | null
          currency?: string
          description?: string | null
          end_date?: string | null
          id?: number
          name: string
          spent?: number | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          balance_high?: number | null
          balance_low?: number | null
          balance_mid?: number | null
          budget_high?: number | null
          budget_low?: number | null
          budget_mid?: number | null
          company_id?: number | null
          created_at?: string | null
          currency?: string
          description?: string | null
          end_date?: string | null
          id?: number
          name?: string
          spent?: number | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_company_id_foreign"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_user_id_foreign"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rates: {
        Row: {
          created_at: string | null
          currency: string
          id: number
          project_id: number
          rate: number
          task_category_id: number
          updated_at: string | null
          user_id: number
          valid_from: string
          valid_to: string | null
        }
        Insert: {
          created_at?: string | null
          currency: string
          id?: number
          project_id: number
          rate: number
          task_category_id: number
          updated_at?: string | null
          user_id: number
          valid_from: string
          valid_to?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string
          id?: number
          project_id?: number
          rate?: number
          task_category_id?: number
          updated_at?: string | null
          user_id?: number
          valid_from?: string
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rates_project_id_foreign"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rates_task_category_id_foreign"
            columns: ["task_category_id"]
            isOneToOne: false
            referencedRelation: "task_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rates_user_id_foreign"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string | null
          id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      role_user: {
        Row: {
          created_at: string | null
          id: number
          role_id: number
          updated_at: string | null
          user_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          role_id: number
          updated_at?: string | null
          user_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          role_id?: number
          updated_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "role_user_role_id_foreign"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_user_user_id_foreign"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          is_default: boolean
          is_protected: boolean
          level: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          is_default?: boolean
          is_protected?: boolean
          level?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          is_default?: boolean
          is_protected?: boolean
          level?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      task_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          actual_time: string | null
          category_id: number
          created_at: string | null
          date: string | null
          description: string | null
          due_date: string | null
          end_time: string | null
          estimated_time: string | null
          id: number
          name: string
          project_id: number
          rate: number | null
          start_time: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          actual_time?: string | null
          category_id: number
          created_at?: string | null
          date?: string | null
          description?: string | null
          due_date?: string | null
          end_time?: string | null
          estimated_time?: string | null
          id?: number
          name: string
          project_id: number
          rate?: number | null
          start_time?: string | null
          status: string
          updated_at?: string | null
        }
        Update: {
          actual_time?: string | null
          category_id?: number
          created_at?: string | null
          date?: string | null
          description?: string | null
          due_date?: string | null
          end_time?: string | null
          estimated_time?: string | null
          id?: number
          name?: string
          project_id?: number
          rate?: number | null
          start_time?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_category_id_foreign"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "task_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_foreign"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      time_logs: {
        Row: {
          break_duration: number | null
          break_end: string | null
          break_start: string | null
          created_at: string | null
          date: string
          id: number
          in_time: string
          is_running: boolean
          notes: string | null
          out_time: string | null
          project_id: number
          timezone: string | null
          total_duration: number | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          break_duration?: number | null
          break_end?: string | null
          break_start?: string | null
          created_at?: string | null
          date?: string
          id?: number
          in_time: string
          is_running?: boolean
          notes?: string | null
          out_time?: string | null
          project_id: number
          timezone?: string | null
          total_duration?: number | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          break_duration?: number | null
          break_end?: string | null
          break_start?: string | null
          created_at?: string | null
          date?: string
          id?: number
          in_time?: string
          is_running?: boolean
          notes?: string | null
          out_time?: string | null
          project_id?: number
          timezone?: string | null
          total_duration?: number | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "time_logs_project_id_foreign"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_logs_user_id_foreign"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string | null
          email: string
          email_verified_at: string | null
          id: number
          last_login: string | null
          name: string
          password: string | null
          remember_token: string | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          email: string
          email_verified_at?: string | null
          id?: number
          last_login?: string | null
          name: string
          password?: string | null
          remember_token?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          email?: string
          email_verified_at?: string | null
          id?: number
          last_login?: string | null
          name?: string
          password?: string | null
          remember_token?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      daily_logs: {
        Row: {
          date: string | null
          is_running: boolean | null
          project_id: number | null
          project_name: string | null
          total_minutes: number | null
          total_seconds: number | null
          user_id: number | null
          user_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "time_logs_project_id_foreign"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_logs_user_id_foreign"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      describe_table: {
        Args: {
          tablename: string
        }
        Returns: {
          column_name: string
          is_nullable: string
          data_type: string
        }[]
      }
      search_books_by_title_prefix: {
        Args: {
          prefix: string
        }
        Returns: {
          author: string | null
          description: string | null
          id: number
          title: string | null
        }[]
      }
    }
    Enums: {
      oauth_providers:
        | "google"
        | "line"
        | "discord"
        | "github"
        | "gitlab"
        | "facebook"
        | "slack"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
