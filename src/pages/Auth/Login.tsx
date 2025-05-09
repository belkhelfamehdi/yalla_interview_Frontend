import { useState, type FormEvent } from "react";
import Input from "../../components/Inputs/Input";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setCurrentPage: (page: string) => void;
}

const validateEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};

const Login: React.FC<LoginProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
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
  // TODO: Implement login logic
} catch (err: unknown) {
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as { response?: unknown }).response === "object" &&
    (err as { response?: { data?: { message?: string } } }).response?.data?.message
  ) {
    const errorMessage = (err as { response: { data: { message: string } } }).response.data.message;
    setError(errorMessage);
  } else {
    setError("An error occurred. Please try again later.");
  }
}

  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">Login to your account</p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          label="Email Adress"
          type="text"
          placeholder="john@exapmle.com"
        />
        <Input
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          label="Password"
          type="password"
          placeholder="********"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          LOGIN
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account? {" "}
          <button
            className="font-medium text-red-700 underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
