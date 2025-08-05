import { useNavigate } from 'react-router-dom';
import { APP_FEATURES } from '../utils/data';
import { useContext, useState } from 'react';
import { LuSparkles, LuArrowRight } from 'react-icons/lu';
import heroImage from '../assets/imageHero.png';
import Logo from '../assets/yalla_interview.png';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Modal from '../components/Modal';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const LandingPage: React.FC = () => {
  const { user } = useContext(UserContext)!; // assume not null, cast as non-undefined
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<'login' | 'signup'>('login');

  const handleCTA = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      setOpenAuthModal(true);
    }
  };

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 relative overflow-hidden'>
        {/* Animated background elements */}
        <div className='absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-red-400/20 to-pink-600/20 rounded-full blur-3xl animate-float' />
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-rose-600/20 rounded-full blur-3xl animate-float' style={{ animationDelay: '2s' }} />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-red-400/10 to-pink-600/10 rounded-full blur-3xl animate-float' style={{ animationDelay: '4s' }} />
        
        <div className='container mx-auto px-6 lg:px-20 pt-6 pb-20 relative z-10'>
          {/* Header */}
          <header className='flex justify-between items-center mb-20'>
            <div className='flex items-center space-x-3'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl blur opacity-20'></div>
                <img src={Logo} className='relative w-32 h-auto rounded-xl' alt="Yalla Interview Logo" />
              </div>
              <span className='font-bold text-xl bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent'>
                YallaInterview
              </span>
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className='btn-primary flex items-center space-x-2'
                onClick={() => setOpenAuthModal(true)}
              >
                <span>Get Started</span>
                <LuArrowRight className='text-lg' />
              </button>
            )}
          </header>

          {/* Hero Section */}
          <div className='flex flex-col lg:flex-row items-center mb-32'>
            <div className='w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0'>
              <div className='flex items-center justify-start mb-6'>
                <div className='flex items-center gap-2 text-sm text-red-600 font-semibold bg-red-50 px-4 py-2 rounded-full border border-red-200'>
                  <LuSparkles className='text-lg' /> AI POWERED
                </div>
              </div>

              <h1 className='text-5xl lg:text-6xl font-bold mb-8 leading-tight'>
                Ace Your Next Interview with{' '}
                <span className='bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text text-transparent'>
                  AI-Powered
                </span>{' '}
                Preparation
              </h1>

              <p className='text-xl text-gray-600 mb-8 leading-relaxed'>
                Get personalized interview questions and model answers tailored to your role and experience level. Practice with confidence.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 mb-8'>
                <button
                  className='btn-primary flex items-center justify-center space-x-3 px-8 py-4 text-lg'
                  onClick={handleCTA}
                >
                  <span>Start Preparing</span>
                  <LuArrowRight className='text-xl' />
                </button>
                <button className='btn-secondary flex items-center justify-center space-x-3 px-8 py-4 text-lg'>
                  <span>View Demo</span>
                </button>
              </div>

              {/* Stats */}
              <div className='flex flex-wrap gap-8 text-sm text-gray-600'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-red-400 rounded-full'></div>
                  <span>1000+ Questions</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-pink-400 rounded-full'></div>
                  <span>AI Generated</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-rose-400 rounded-full'></div>
                  <span>Role Specific</span>
                </div>
              </div>
            </div>

            <div className='w-full lg:w-1/2 relative'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl blur-2xl opacity-20 transform rotate-6'></div>
                <img 
                  className='relative w-full rounded-3xl shadow-2xl animate-float' 
                  src={heroImage} 
                  alt="Interview preparation dashboard" 
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Smart Features. Real Results.
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the tools that help you prep faster, smarter, and more effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {APP_FEATURES.map((feature) => (
                <div
                  key={feature.id}
                  className="card-modern group relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {feature.id}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-600 mb-4 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className='glass-effect border-t border-white/20 text-center py-8'>
          <div className='container mx-auto px-6'>
            <p className='text-white/80'>
              Made with ❤️ by Sparky • © 2025 YallaInterview
            </p>
          </div>
        </footer>
      </div>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        {currentPage === "login" ? (
          <Login setCurrentPage={setCurrentPage} />
        ) : (
          <SignUp setCurrentPage={setCurrentPage} />
        )}
      </Modal>
    </>
  );
};

export default LandingPage;
