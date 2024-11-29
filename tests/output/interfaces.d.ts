export interface Book {
  author: string | null;
  description: string | null;
  id: number;
  title: string | null;
}
export interface BookInsert {
  author: string | null | undefined;
  description: string | null | undefined;
  id: number | undefined;
  title: string | null | undefined;
}
export interface BookUpdate {
  author: string | null | undefined;
  description: string | null | undefined;
  id: number | undefined;
  title: string | null | undefined;
}
export interface Company {
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
}
export interface CompanyInsert {
  address: string | null | undefined;
  code: string | null | undefined;
  contact_email: string;
  contact_phone: string | null | undefined;
  corporate_number: string | null | undefined;
  created_at: string | null | undefined;
  employees_count: number | null | undefined;
  id: number | undefined;
  is_active: boolean | undefined;
  is_public: boolean | undefined;
  name: string;
  representative_id: number;
  updated_at: string | null | undefined;
}
export interface CompanyUpdate {
  address: string | null | undefined;
  code: string | null | undefined;
  contact_email: string | undefined;
  contact_phone: string | null | undefined;
  corporate_number: string | null | undefined;
  created_at: string | null | undefined;
  employees_count: number | null | undefined;
  id: number | undefined;
  is_active: boolean | undefined;
  is_public: boolean | undefined;
  name: string | undefined;
  representative_id: number | undefined;
  updated_at: string | null | undefined;
}
export interface User {
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
}
export interface UserInsert {
  avatar: string | null | undefined;
  created_at: string | null | undefined;
  email: string;
  email_verified_at: string | null | undefined;
  id: number | undefined;
  last_login: string | null | undefined;
  name: string;
  password: string | null | undefined;
  remember_token: string | null | undefined;
  timezone: string | null | undefined;
  updated_at: string | null | undefined;
}
export interface UserUpdate {
  avatar: string | null | undefined;
  created_at: string | null | undefined;
  email: string | undefined;
  email_verified_at: string | null | undefined;
  id: number | undefined;
  last_login: string | null | undefined;
  name: string | undefined;
  password: string | null | undefined;
  remember_token: string | null | undefined;
  timezone: string | null | undefined;
  updated_at: string | null | undefined;
}
