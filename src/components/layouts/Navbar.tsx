import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import Image from "../../assets/yalla_interview.png";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 transition-opacity bg-gradient-to-r from-red-500 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-40"></div>
              <img
                className="relative w-auto h-12 transition-transform rounded-xl group-hover:scale-105"
                src={Image}
                alt="Yalla Interview"
              />
            </div>
            <span className="font-bold text-xl text-gray-800 drop-shadow-lg">
              YallaInterview
            </span>
          </Link>

          <ProfileInfoCard />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
