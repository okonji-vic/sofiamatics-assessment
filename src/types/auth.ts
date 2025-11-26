export type User = {
  id: string;
  email: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  avatar?: string;
  role?: string;
  kyc_status?: string | null;
  createdAt: string;
  updatedAt: string;
  phone?: string;
  state?: string;
  city?: string;
  address?: string;
  amount?: number
};

export type AuthResponse = {
  user: User;
  token: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};