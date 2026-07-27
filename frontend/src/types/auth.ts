export interface UserLogin {
  email: string;
  password: string;
}

export interface UserCreate {
  email: string;
  password: string;
  full_name: string;
  role?: string;
}

export interface UserRead {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
}

export interface Token {
  access_token: string;
  token_type: string;
  refresh_token: string;
}
