import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LuRocket, LuBriefcase, LuClock, LuTarget, LuFileText } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

interface FormData {
  role: string;
  experience: string;
  topicToFocus: string;
  description: string;
}

const CreateSessionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    role: "",
    experience: "",
    topicToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { role, experience, topicToFocus } = formData;

    if (!role || !experience || !topicToFocus) {
      setError("Please fill in all required fields.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      console.log('Step 1: Generating questions with AI...');
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicToFocus,
        numberOfQuestions: 10,
      });

      console.log('Step 1 Success: AI Response received:', aiResponse.data);
      const generatedQuestions = aiResponse.data.data;
      
      console.log('Step 2: Creating session with questions:', generatedQuestions);
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      console.log('Step 2 Success: Session created:', response.data);
      const sessionId = response.data?.session?._id;
      if (sessionId) {
        navigate(`/interview-prep/${sessionId}`);
      }
    } catch (error: unknown) {
      console.error('Detailed error:', error);
      if (error instanceof Error) {
        setError("An error occurred while creating the session: " + error.message);
      } else {
        setError("An unknown error occurred while creating the session.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[95vw] md:w-[40vw] max-w-2xl">
      <div className="glass-card rounded-3xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LuRocket className="text-white text-2xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Create Your Interview Session
          </h3>
          <p className="text-gray-600">
            Set up a personalized interview preparation session tailored to your needs
          </p>
        </div>

        <form onSubmit={handleCreateSession} className="space-y-6">
          {/* Role Input */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <LuBriefcase className="text-red-500" />
              <span>Target Role *</span>
            </label>
            <input
              value={formData.role}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("role", e.target.value)}
              placeholder="e.g., Frontend Developer, UI/UX Designer, etc."
              type="text"
              className="input-modern w-full"
            />
          </div>

          {/* Experience Input */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <LuClock className="text-pink-500" />
              <span>Years of Experience *</span>
            </label>
            <input
              value={formData.experience}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("experience", e.target.value)}
              placeholder="e.g., 1, 3, 5, or 'Junior', 'Senior'"
              type="text"
              className="input-modern w-full"
            />
          </div>

          {/* Topics Input */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <LuTarget className="text-red-600" />
              <span>Topics to Focus *</span>
            </label>
            <input
              value={formData.topicToFocus}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("topicToFocus", e.target.value)}
              placeholder="e.g., React, CSS, Algorithms, etc."
              type="text"
              className="input-modern w-full"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <LuFileText className="text-rose-500" />
              <span>Description</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange("description", e.target.value)}
              placeholder="e.g., I want to focus on React and CSS."
              className="input-modern w-full h-24 resize-none"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full btn-primary flex items-center justify-center space-x-3 py-4 text-lg" 
            disabled={isLoading}
          >
            {isLoading && <SpinnerLoader />}
            {!isLoading && <LuRocket className="text-xl" />}
            <span>{isLoading ? 'Creating Session...' : 'Create Session'}</span>
          </button>
        </form>

        {/* Required fields note */}
        <p className="text-xs text-gray-500 text-center mt-6">
          * Required fields
        </p>
      </div>
    </div>
  );
};

export default CreateSessionForm;
