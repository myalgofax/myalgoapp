// utils/apiClient.ts

import { cookies } from 'next/headers'

import type { AuthResponseData } from '@/types/api'


export async function setAuthCookies(authData: AuthResponseData) {
 
    const setCookies = await  cookies()
    setCookies.set('authToken', authData.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })

  setCookies.set('user', JSON.stringify(authData.user), {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
}



export async function postRequest<T>(
  url: string,
  body: Record<string, any>,
  options: RequestInit = {}
): Promise<T | null> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(body),
      cache: "no-store",
      ...options,
    });
    if (!res.ok) {
      console.error(`API error at ${url}:`, res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Network error at ${url}:`, error);
    return null;
  }
}
