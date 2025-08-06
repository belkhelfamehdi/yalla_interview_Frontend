import React, { useState } from 'react';

const DebugPanel: React.FC = () => {
  const [email, setEmail] = useState('test@yalla.com');
  const [password, setPassword] = useState('password123');
  const [results, setResults] = useState<string>('');

  const testDirectFetch = async () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const url = `${baseUrl}api/auth/login`;
    
    const payload = { email, password };
    
    console.log('🔍 Direct fetch test:');
    console.log('URL:', url);
    console.log('Payload:', payload);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const responseData = await response.json();
      
      const result = {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: responseData,
      };
      
      console.log('📥 Response:', result);
      setResults(JSON.stringify(result, null, 2));
      
    } catch (error) {
      console.error('💥 Fetch error:', error);
      setResults(`Error: ${error}`);
    }
  };

  const testAxios = async () => {
    try {
      const axiosInstance = (await import('../../utils/axiosInstance')).default;
      const { API_PATHS } = await import('../../utils/apiPaths');
      
      console.log('🔍 Axios test:');
      console.log('URL:', `${import.meta.env.VITE_API_BASE_URL}${API_PATHS.AUTH.LOGIN}`);
      console.log('Payload:', { email, password });
      
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      
      const result = {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
      };
      
      console.log('📥 Axios Response:', result);
      setResults(JSON.stringify(result, null, 2));
      
    } catch (error: any) {
      console.error('💥 Axios error:', error);
      const errorResult = {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data,
        }
      };
      setResults(JSON.stringify(errorResult, null, 2));
    }
  };

  const testBackendHealth = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}api/health`);
      const data = await response.json();
      
      const result = {
        status: response.status,
        data,
        timestamp: new Date().toISOString()
      };
      
      console.log('💚 Health check:', result);
      setResults(JSON.stringify(result, null, 2));
      
    } catch (error) {
      console.error('💥 Health check failed:', error);
      setResults(`Health check failed: ${error}`);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg mt-4">
      <h3 className="text-lg font-bold mb-4">🔧 Debug Panel</h3>
      
      <div className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={testBackendHealth}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Test Health
        </button>
        <button
          onClick={testDirectFetch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test Direct Fetch
        </button>
        <button
          onClick={testAxios}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Test Axios
        </button>
      </div>
      
      <div className="bg-black text-green-400 p-3 rounded overflow-auto max-h-96">
        <pre className="text-xs whitespace-pre-wrap">{results || 'Click a test button to see results...'}</pre>
      </div>
      
      <div className="mt-2 text-xs text-gray-600">
        Base URL: {import.meta.env.VITE_API_BASE_URL}
      </div>
    </div>
  );
};

export default DebugPanel;
