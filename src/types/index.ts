export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'user' | 'vip_user' | 'admin';
  status: 'active' | 'inactive';
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export interface RegisterFormErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: string;
  general: string;
} 