// components/AuthStatus.tsx
'use client';
import useAuth from '@/hooks/useAuthTokens';

const AuthStatus = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading authentication status...</div>;
  }

  return (
    <div>
      {isLoggedIn ? (
        <p>You are logged in!</p>
      ) : (
        <p>Please log in to continue</p>
      )}
    </div>
  );
};