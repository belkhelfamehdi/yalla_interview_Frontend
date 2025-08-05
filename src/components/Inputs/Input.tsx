import React, { useState, type ChangeEvent } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, label, type, placeholder }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      <div className="relative flex items-center bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200 transition-all duration-200">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
          value={value}
          onChange={onChange}
        />

        {type === 'password' && (
          <button type="button" onClick={toggleShowPassword} className="ml-2 text-gray-400 hover:text-gray-600 transition-colors">
            {showPassword ? (
              <FaRegEyeSlash className="text-lg" />
            ) : (
              <FaRegEye className="text-lg" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
