import {
  useContext,
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";
import Input from "../../components/Inputs/Input";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import type { AxiosError } from "axios";

interface LoginProps {
  setCurrentPage: (page: "login" | "signup") => void;
}

const validateEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

const Login: React.FC<LoginProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { updateUser } = useContext(UserContext)!;
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Password must be provided");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message) {
        setError(axiosError.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Login to your account
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          label="Email Address"
          type="text"
          placeholder="john@example.com"
        />
        <Input
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          label="Password"
          type="password"
          placeholder="********"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          LOGIN
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-medium text-red-700 underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
