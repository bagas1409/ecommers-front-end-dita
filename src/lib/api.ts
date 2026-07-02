// src/lib/api.ts
import axios from 'axios';

// Konfigurasi baseURL dari environment variables
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create Axios instance
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Izinkan pengiriman credentials/cookie untuk refresh token
  withCredentials: true,
});

// Request Interceptor: Otomatis tambahkan Authorization header jika token ada
api.interceptors.request.use(
  (config) => {
    // Di sisi client, token biasanya disimpan di localStorage / Context / Zustand
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Otomatis handle 401 dan coba refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika error 401 (Unauthorized) dan request belum pernah di-retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Coba panggil endpoint refresh token
        // Refresh token otomatis dikirim via HttpOnly cookie
        const res = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });

        if (res.data.success && res.data.data.accessToken) {
          // Update token baru di localStorage & cookie
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', res.data.data.accessToken);
            const isSecure = window.location.protocol === 'https:';
            document.cookie = `token=${res.data.data.accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax${isSecure ? '; Secure' : ''}`;
          }

          // Retry request yang gagal dengan token baru
          originalRequest.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token gagal/expired -> paksa logout
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
