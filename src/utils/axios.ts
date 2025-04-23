import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const response = await axios.get('http://localhost:5000/api/auth/refresh-token', {
          withCredentials: true
        });
        console.log(response.data);
        if (response.data.success) {
          const { accessToken, user } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('user', JSON.stringify(user));
          
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token fails, just reject the error
        // The component will handle the redirect if needed
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api; 