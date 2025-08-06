import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

// Debug login function to help troubleshoot the 400 error
export const debugLogin = async (email: string, password: string) => {
  console.log('🐛 DEBUG LOGIN ATTEMPT');
  console.log('Email:', email);
  console.log('Password length:', password?.length);
  console.log('API URL:', `${import.meta.env.VITE_API_BASE_URL}${API_PATHS.AUTH.LOGIN}`);
  
  try {
    // Log the request payload
    const payload = { email, password };
    console.log('📤 Request payload:', payload);
    
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, payload);
    
    console.log('✅ Response received:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    
    return response;
  } catch (error: any) {
    console.error('❌ Login error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
        headers: error.config?.headers
      }
    });
    
    throw error;
  }
};

// Test function to check if backend is reachable
export const testBackendConnection = async () => {
  try {
    const healthUrl = `${import.meta.env.VITE_API_BASE_URL}/api/health`;
    console.log('🔍 Testing backend connection to:', healthUrl);
    
    const response = await fetch(healthUrl);
    const data = await response.json();
    
    console.log('✅ Backend health check:', {
      status: response.status,
      data
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    return { success: false, error };
  }
};
