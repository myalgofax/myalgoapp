// utils/auth.ts

// Decode URL-encoded cookie value
const decodeCookie = (value: string): any => {
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
};

// Client-side token handling
export const getClientAuthToken = (): string | null => {
  
  if (typeof window !== 'undefined') {
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('userToken='))
      ?.split('=')[1];
    return cookieToken || sessionStorage.getItem('userToken');
  }
  return null;
};

// Client-side user info
export const getClientUserInfo = (): any => {

  if (typeof window !== 'undefined') {
    const userInfoCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('userInfo='))
      ?.split('=')[1];
    return userInfoCookie ? decodeCookie(userInfoCookie) : null;
  }
  return null;
};

// Server-side token handling
export const getServerAuthToken = async (): Promise<string | null> => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    
    return cookieStore.get('userToken')?.value || null;
  }
  return null;
};

// Server-side user info
export const getServerUserInfo = async (): Promise<any> => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const userInfo = cookieStore.get('userInfo')?.value;
    return userInfo ? decodeCookie(userInfo) : null;
  }
  return null;
};

// Universal getters
export const getAuthToken = async (): Promise<string | null> => {
  return typeof window === 'undefined' 
    ? await getServerAuthToken() 
    : getClientAuthToken();
};

export const getUserInfo = async (): Promise<any> => {
  return typeof window === 'undefined'
    ? await getServerUserInfo()
    : getClientUserInfo();
};

// Token setter
export const setAuthToken = (token: string, httpOnly: boolean = false): void => {
  
  if (typeof window !== 'undefined') {
    if (httpOnly) {
      fetch('/api/auth/set-token', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=lax`;
      sessionStorage.setItem('userToken', token);
    }
  }
};

// User info setter
export const setUserInfo = (userInfo: any, httpOnly: boolean = false): void => {
  if (typeof window !== 'undefined') {
    const encodedValue = encodeURIComponent(JSON.stringify(userInfo));
    if (httpOnly) {
      fetch('/api/auth/set-user-info', {
        method: 'POST',
        body: JSON.stringify({ userInfo: encodedValue }),
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      document.cookie = `userInfo=${encodedValue}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=lax`;
    }
  }
};

// Token removal
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    document.cookie = 'userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    sessionStorage.removeItem('userToken');
    fetch('/api/auth/clear-token');
  }
};

// User info removal
export const removeUserInfo = (): void => {
  if (typeof window !== 'undefined') {
    document.cookie = 'userInfo=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    fetch('/api/auth/clear-user-info');
  }
};