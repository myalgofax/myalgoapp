// hooks/useAuthTokens.ts
import { useEffect, useState } from 'react';
import { getAuthToken } from '../utils/authToken';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    setIsLoggedIn(!!token);
    setIsLoading(false);
  }, []);

  return { isLoggedIn, isLoading };
};

export default useAuth;