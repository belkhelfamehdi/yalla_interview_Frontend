import {
  useContext,
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";
import Input from "../../components/Inputs/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { updateUser } = useContext(UserContext)!;
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setIsLoading(false);
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setIsLoading(false);
      setError("Password must be provided");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { data } = response.data;
      setIsLoading(false);
      if (data?.token) {
        localStorage.setItem("token", data.token);
        updateUser(data);
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message: string }>;
      if (axiosError.response?.data?.message) {
        setError(axiosError.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[420px] p-8 flex flex-col justify-center">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h3>
        <p className="text-gray-600">
          Login to your account
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-1">
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

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="pt-4">
          {isLoading ? (
            <button type="submit" className="w-full btn-primary flex items-center justify-center py-3" disabled>
              <SpinnerLoader />
            </button>
          ) : (
            <button type="submit" className="w-full btn-primary py-3 text-lg font-semibold">
              LOGIN
            </button>
          )}
        </div>

        <div className="text-center pt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              className="font-semibold text-red-600 hover:text-red-700 underline transition-colors"
              onClick={() => setCurrentPage("signup")}
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
