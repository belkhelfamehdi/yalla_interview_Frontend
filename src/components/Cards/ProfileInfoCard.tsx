import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

// Should be imported from your types
interface User {
  name?: string;
  profileImageUrl?: string;
  token: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  updateUser: (userData: User) => void;
  clearUser: () => void;
}

const ProfileInfoCard: React.FC = () => {
  const context = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  if (!context || !context.user) return null;

  const { user, clearUser } = context;

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    <div className="flex items-center">
      <img
        src={user.profileImageUrl}
        alt="Profile"
        className="w-11 h-11 bg-gray-300 rounded-full mr-3"
      />
      <div>
        <div className="text-[15px] text-black font-bold leading-3">
          {user.name || ""}
        </div>
        <button
          className="text-[#d9182e] text-sm font-semibold cursor-pointer hover:underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
