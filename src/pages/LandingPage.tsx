import { useNavigate } from 'react-router-dom';
import { APP_FEATURES } from '../utils/data';
import { useContext, useState } from 'react';
import { LuSparkles } from 'react-icons/lu';
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
      <div className='w-full min-h-full bg-[#ffefef]'>
        <div className='w-[500px] h-[500px] bg-red-200/30 blur-[65px] absolute top-0 left-0' />
        <div className='container mx-auto px-4 md:px-20 pt-6 pb-[200px] relative z-10'>
          {/* Header */}
          <header className='flex justify-between items-center mb-16'>
            <div className='text-xl text-black font-bold'>
              <img src={Logo} className='w-32 h-auto' alt="Yalla Interview Logo" />
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className='bg-linear-to-l from-[#ff2424] to-[#e94b4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer'
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Section */}
          <div className='flex flex-col md:flex-row items-center'>
            <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
              <div className='flex items-center justify-left mb-2'>
                <div className='flex items-center gap-2 text-[13px] text-red-600 font-semibold bg-red-100 px-3 py-1 rounded-full border border-red-300'>
                  <LuSparkles /> AI POWERED
                </div>
              </div>

              <h1 className='text-5xl text-black font-medium mb-6 leading-tight'>
                Ace Your Next Interview with <br />
                <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#1A1A1A_0%,_#D0021B_100%)] bg-[length:200%_200%] animate-text-shine font-semibold'>
                  AI-Powered Prep
                </span>{' '}
                Learning
              </h1>
            </div>

            <div className='w-full md:w-1/2'>
              <p className='text-[17px] text-gray-900 mr-0 md:mr-20 mb-6'>
                Get personalized interview questions and model answers tailored to your role and experience level.
              </p>
              <button
                className='bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-red-100 hover:text-black border border-red-50 hover:border-red-300 transition-colors cursor-pointer'
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className='w-full min-h-full relative z-10'>
        <section className='flex items-center justify-center -mt-36'>
          <img className='w-[80vw] rounded-lg' src={heroImage} alt="Hero" />
        </section>
      </div>

{/* Features Section */}
<div className="w-full bg-[#f9fafb] py-20">
  <div className="container mx-auto px-4 md:px-20">
    <section>
      <h2 className="text-3xl font-semibold text-center mb-6 text-black">
        Smart Features. Real Results.
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-16">
        Discover the tools that help you prep faster, smarter, and more effectively.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {APP_FEATURES.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 border border-[#d9182e]/20 rounded-xl shadow-sm hover:shadow-md transition group"
          >
            <h3 className="text-lg font-semibold text-black group-hover:text-[#d9182e] mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  </div>
</div>


      {/* Footer */}
      <div className='text-sm bg-gray-50 text-secondary text-center p-5 mt-5'>
        made with ❤️ by Sparky
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
