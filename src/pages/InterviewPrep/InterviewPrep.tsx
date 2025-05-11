import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import AIResponsePreview from "./components/AiResponsePreview";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";

interface Question {
  _id: string;
  question: string;
  answer: string;
  isPinned: boolean;
}

interface SessionData {
  _id: string;
  role: string;
  topicToFocus: string;
  experience: string;
  description: string;
  updatedAt: string;
  questions: Question[];
}

interface Explanation {
  title: string;
  explanation: string;
}

interface RouteParams extends Record<string, string | undefined> {
  sessionId?: string;
}

const InterviewPrep: React.FC = () => {
  const { sessionId } = useParams<RouteParams>();

  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<Explanation | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState<boolean>(false);

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get<{ session: SessionData }>(
        API_PATHS.SESSION.GET_ONE(sessionId ?? "")
      );
      if (response.data?.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const generateConceptExplanation = async (question: string) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post<Explanation>(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error: unknown) {
      setExplanation(null);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setErrorMsg("Failed to generate explanation. Please try again. " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId: string) => {
    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));
      if (response.data?.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      const aiResponse = await axiosInstance.post<Question[]>(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicToFocus: sessionData?.topicToFocus,
          numberOfQuestions: 10,
        }
      );

      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: generatedQuestions,
      });

      if (response.data) {
        toast.success("Questions Added Successfully");
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add questions. Please try again.");
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicToFocus={sessionData?.topicToFocus || ""}
        experience={sessionData?.experience || "--"}
        questions={sessionData?.questions?.length || "--"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto py-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold text-black border-b border-[#d9182e] pb-1 inline-block">
          Interview Q & A
        </h2>
        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div className={`col-span-12 ${openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"}`}>
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => (
                <motion.div
                  key={data._id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    stiffness: 100,
                    delay: index * 0.1,
                    damping: 15,
                  }}
                  layout
                  layoutId={`question-${data._id}`}
                >
                  <QuestionCard
                    question={data.question}
                    answer={data.answer}
                    onLearnMore={() => generateConceptExplanation(data.question)}
                    isPinned={data.isPinned}
                    onTogglePin={() => toggleQuestionPinStatus(data._id)}
                  />

                  {!isLoading &&
                    sessionData.questions.length === index + 1 && (
                      <div className="flex items-center justify-center mt-5">
                        <button
                          className="flex items-center gap-3 text-sm text-white font-medium bg-[#d9182e] hover:bg-black px-5 py-2 rounded-full transition-colors"
                          disabled={isLoading || isUpdateLoader}
                          onClick={uploadMoreQuestions}
                        >
                          {isUpdateLoader ? <SpinnerLoader /> : <LuListCollapse className="text-lg" />}
                          Load More
                        </button>
                      </div>
                    )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={!isLoading && explanation?.title}
        >
          {errorMsg && (
            <p className="flex gap-2 text-sm text-[#d9182e] font-medium">
              <LuCircleAlert className="mt-1" />
              {errorMsg}
            </p>
          )}
          {isLoading && <SkeletonLoader />}
          {!isLoading && explanation && (
            <AIResponsePreview content={explanation.explanation} />
          )}
        </Drawer>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;