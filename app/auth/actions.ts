// app/actions/auth.ts
'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { API_ENDPOINTS } from '@/config/apiEndpoints'
import { postRequest } from '@/utils/apiClient'
import type { ApiResponse, AuthResponseData, LoginResponse } from '@/types/api'
import type { AuthFormState } from '@/types/api'
import { setAuthToken } from '@/utils/authToken'

export async function login(prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const response = await postRequest<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.login, 
      { email, password }
    )
  
    console.log("response?.status",response)
    if (response?.status !== 'success' || !response?.userToken) {
      return { status: 'error', error: 'Invalid credentials' };
    }
    return { 
      status: 'success',
      token: response.userToken,
      user: response.data 
    };
  } catch (error) {
    console.error('Login error:', error)
     return { status: 'error', error: 'Login failed' };
  }
}

export async function signup(prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return { status: 'error', error: 'passwords_dont_match' };

  }

  try {
    const response = await postRequest<ApiResponse<AuthResponseData>>(
      API_ENDPOINTS.signup,
      {
        name: `${firstName} ${lastName}`,
        email,
        password,
      }
    )

    if (!response?.success) {
       return { status: 'error', error: 'signup_failed' };
      
    }
    return { 
      status: 'success'
    };
  } catch (error) {
    console.error('Signup error:', error)
    return { status: 'error', error: 'signup_failed' };
    
  }
}