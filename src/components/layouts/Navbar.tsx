import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import Image from "../../assets/yalla_interview.png";

const Navbar = () => {
  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img 
                className="relative h-12 w-auto rounded-xl transition-transform group-hover:scale-105" 
                src={Image} 
                alt="Yalla Interview" 
              />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
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
