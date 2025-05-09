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
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>

      <div className="input-box">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={onChange}
        />

        {type === 'password' && (
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? (
              <FaRegEyeSlash className="text-slate-400 cursor-pointer" />
            ) : (
              <FaRegEye className="text-primary cursor-pointer" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
