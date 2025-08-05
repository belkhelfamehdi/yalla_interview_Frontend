import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { LuLogOut, LuUser } from "react-icons/lu";

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

  if (!context?.user) return null;

  const { user, clearUser } = context;

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3 glass-effect rounded-full px-4 py-2">
        <div className="relative">
          {user.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center">
              <LuUser className="text-white text-lg" />
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        
        <div className="text-white">
          <div className="font-semibold text-sm">
            {user.name || "User"}
          </div>
          <div className="text-xs text-white/60">
            Online
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="btn-secondary flex items-center space-x-2 px-3 py-2 text-sm group"
      >
        <LuLogOut className="text-lg group-hover:rotate-12 transition-transform" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default ProfileInfoCard;
