import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
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
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicToFocus,
        numberOfQuestions: 10,
      });

      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      const sessionId = response.data?.session?._id;
      if (sessionId) {
        navigate(`/interview-prep/${sessionId}`);
      }
    } catch (error: unknown) {
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
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Start a New Interview Journey
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Fill out a few quick details and unlock your personalized set of interview questions!
      </p>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        <Input
          value={formData.role}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("role", e.target.value)}
          label="Target Role"
          placeholder="e.g., Frontend Developer, UI/UX Designer, etc."
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("experience", e.target.value)}
          label="Years of Experience"
          placeholder="e.g., 1 year, 3 years, 5+ years"
          type="number"
        />

        <Input
          value={formData.topicToFocus}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("topicToFocus", e.target.value)}
          label="Topics to Focus"
          placeholder="e.g., React, CSS, Algorithms, etc."
          type="text"
        />

        <Input
          value={formData.description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("description", e.target.value)}
          label="Description"
          placeholder="e.g., I want to focus on React and CSS."
          type="text"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary w-full mt-2" disabled={isLoading}>
          {isLoading && <SpinnerLoader />} Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
