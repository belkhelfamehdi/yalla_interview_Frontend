import { useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/UploadImage";

interface SignUpProps {
  setCurrentPage: (page: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { updateUser } = useContext(UserContext);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let profileImageUrl = "";

    if (!fullName) {
      setError("Full name must be provided");
      return;
    }

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
      // Upload image if present
if (profilePic) {
  const imgUploadRes = await uploadImage(profilePic);
  console.log("Image upload response:", imgUploadRes);
  profileImageUrl = imgUploadRes.imageUrl ?? "";
}

const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
  name: fullName,
  email,
  password,
  profileImageUrl,
});

const { token } = response.data;

if (token) {
  localStorage.setItem("token", token);
  updateUser(response.data);
  navigate("/dashboard");
}

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
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below
      </p>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className="grid grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFullName(e.target.value)
            }
            label="Full Name"
            type="text"
            placeholder="John Doe"
          />
          <Input
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            label="Email Address"
            type="text"
            placeholder=""
          />
          <Input
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            label="Password"
            type="password"
            placeholder="********"
          />
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          SIGN UP
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Already have an account?{" "}
          <button
            className="font-medium text-red-700 underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

