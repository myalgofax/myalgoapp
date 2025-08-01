// types/api.d.ts or anywhere in your types
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
  userToken?: string // ← Add this
  status: 'idle' | 'loading' | 'success' | 'error' |'success' | 'error';
  success?: boolean;
  error?: string;
  userToken?: string | "";
  message?: string;
  token?: string;
  user?: any;
  error?: string;
}

export type AuthFormState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  success?: boolean;
  error?: string;
  userToken?: string | "";
  message?: string;
  token?: string;
  user?: any;
  error?: string;
};


// Define API response shape
export interface LoginResponse {
  data: {
    userId: string
    name: string
    email: string
  }
  userToken: string
}

export interface AuthResponseData {
  token: string
  status: 'success' | 'error'
  user: {
    id: string
    email: string
    name: string
  }
}