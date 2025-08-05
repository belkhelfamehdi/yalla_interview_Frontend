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
      <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-red-50 via-white to-pink-50'>
        {/* Animated background elements */}
        <div className='absolute rounded-full top-20 left-10 w-72 h-72 bg-gradient-to-br from-red-400/20 to-pink-600/20 blur-3xl animate-float' />
        <div className='absolute rounded-full bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-rose-600/20 blur-3xl animate-float' style={{ animationDelay: '2s' }} />
        <div className='absolute w-64 h-64 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-gradient-to-r from-red-400/10 to-pink-600/10 blur-3xl animate-float' style={{ animationDelay: '4s' }} />
        
        <div className='container relative z-10 px-6 pt-6 pb-20 mx-auto lg:px-20'>
          {/* Header */}
          <header className='flex items-center justify-between mb-20'>
            <div className='flex items-center space-x-3'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl blur opacity-20'></div>
                <img src={Logo} className='relative w-32 h-auto rounded-xl' alt="Yalla Interview Logo" />
              </div>
              <span className='text-xl font-bold text-transparent bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text'>
                YallaInterview
              </span>
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className='bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                onClick={() => setOpenAuthModal(true)}
              >
                <span>Get Started</span>
                <LuArrowRight className='text-lg' />
              </button>
            )}
          </header>

          {/* Hero Section */}
          <div className='flex flex-col items-center mb-32 lg:flex-row'>
            <div className='w-full mb-12 lg:w-1/2 lg:pr-12 lg:mb-0'>
              <div className='flex items-center justify-start mb-6'>
                <div className='flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-full bg-red-50'>
                  <LuSparkles className='text-lg' /> AI POWERED
                </div>
              </div>

              <h1 className='mb-8 text-5xl font-bold leading-tight lg:text-6xl'>
                Ace Your Next Interview with{' '}
                <span className='text-transparent bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text'>
                  AI-Powered
                </span>{' '}
                Preparation
              </h1>

              <p className='mb-8 text-xl leading-relaxed text-gray-600'>
                Get personalized interview questions and model answers tailored to your role and experience level. Practice with confidence.
              </p>

              <div className='flex flex-col gap-4 mb-8 sm:flex-row'>
                <button
                  className='flex items-center justify-center px-8 py-4 space-x-3 text-lg font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-red-500 to-pink-600 rounded-xl hover:from-red-600 hover:to-pink-700 hover:shadow-xl hover:-translate-y-1'
                  onClick={handleCTA}
                >
                  <span>Start Preparing</span>
                  <LuArrowRight className='text-xl' />
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
                  <div className='w-2 h-2 rounded-full bg-rose-400'></div>
                  <span>Role Specific</span>
                </div>
              </div>
            </div>

            <div className='relative w-full lg:w-1/2'>
              <div className='relative'>
                <div className='absolute inset-0 transform bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl blur-2xl opacity-20 rotate-6'></div>
                <img 
                  className='relative w-full shadow-2xl rounded-3xl animate-float' 
                  src={heroImage} 
                  alt="Interview preparation dashboard" 
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-32">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-gray-800">
                Smart Features. Real Results.
              </h2>
              <p className="max-w-2xl mx-auto text-xl text-gray-600">
                Discover the tools that help you prep faster, smarter, and more effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {APP_FEATURES.map((feature) => (
                <div
                  key={feature.id}
                  className="relative overflow-hidden card-modern group"
                >
                  <div className="absolute flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-lg top-4 right-4 bg-gradient-to-br from-red-500 to-pink-600">
                    {feature.id}
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-gray-800 transition-colors group-hover:text-red-600">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-1 transition-transform duration-300 origin-left transform scale-x-0 bg-gradient-to-r from-red-500 to-pink-600 group-hover:scale-x-100"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className='py-8 text-center border-t glass-effect border-white/20'>
          <div className='container px-6 mx-auto'>
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
