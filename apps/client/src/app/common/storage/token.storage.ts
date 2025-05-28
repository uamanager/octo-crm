import { useCallback, useEffect, useState } from 'react';

export const ACCESS_TOKEN_STORAGE_KEY = 'access_token';
export const ACCESS_TOKEN_STORAGE_CHANGED_EVENT = 'access_token_changed';

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

export const setAccessToken = (token: string | null) => {
  if (token) localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  else localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);

  window.dispatchEvent(new CustomEvent(ACCESS_TOKEN_STORAGE_CHANGED_EVENT));
};

export function useAccessToken() {
  const [token, setTokenState] = useState(() => getAccessToken());

  const setToken = useCallback((newToken: string | null) => {
    setAccessToken(newToken);
    setTokenState(newToken);
  }, []);

  const removeToken = useCallback(() => {
    setAccessToken(null);
    setTokenState(null);
  }, []);

  useEffect(() => {
    const handleStorageCrossWindow = (e: StorageEvent) => {
      if (e.key === ACCESS_TOKEN_STORAGE_KEY) {
        setTokenState(getAccessToken());
      }
    };

    const handleStorageLocalWindow = () => {
      setTokenState(getAccessToken());
    };

    window.addEventListener('storage', handleStorageCrossWindow);
    window.addEventListener(ACCESS_TOKEN_STORAGE_CHANGED_EVENT, handleStorageLocalWindow);
    return () => {
      window.removeEventListener('storage', handleStorageCrossWindow);
      window.removeEventListener(
        ACCESS_TOKEN_STORAGE_CHANGED_EVENT,
        handleStorageLocalWindow,
      );
    };
  }, []);

  return { token, setToken, removeToken };
}
