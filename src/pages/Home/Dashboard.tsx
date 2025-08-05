import React, { useState, useEffect } from "react";
import { LuPlus, LuSearch, LuFilter, LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/Cards/SummaryCard";
import StatsChart from "../../components/Charts/StatsChart";
import moment from "moment";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";

interface Session {
  _id: string;
  role: string;
  topicToFocus?: string;
  experience: string | number;
  questions: { question: string; answer: string }[];
  description: string;
  updatedAt: string;
}

interface DeleteAlertState {
  open: boolean;
  data: Session | null;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState<DeleteAlertState>({
    open: false,
    data: null,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get<{ sessions: Session[] }>(
        API_PATHS.SESSION.GET_ALL
      );
      setSessions(response.data.sessions);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  const deleteSession = async (sessionData: Session | null) => {
    if (!sessionData?._id) return;
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData._id));
      toast.success("Session Deleted Successfully");

      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data:", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  useEffect(() => {
    const filtered = sessions.filter(session =>
      session.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.topicToFocus?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSessions(filtered);
  }, [sessions, searchTerm]);

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="glass-card rounded-3xl p-8 mb-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  Welcome Back! 👋
                </h1>
                <p className="text-gray-600 text-lg">
                  Ready to ace your next interview? Let's prepare together.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{sessions.length}</div>
                  <div className="text-sm text-gray-500">Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">
                    {sessions.reduce((total, session) => total + session.questions.length, 0)}
                  </div>
                  <div className="text-sm text-gray-500">Questions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Chart */}
          <div className="mb-8">
            <StatsChart
              data={{
                totalSessions: sessions.length,
                totalQuestions: sessions.reduce((total, session) => total + session.questions.length, 0),
                averageExperience: sessions.length > 0 
                  ? Math.round(sessions.reduce((total, session) => total + Number(session.experience), 0) / sessions.length) 
                  : 0,
                completionRate: 85, // This could be calculated based on actual completion data
              }}
            />
          </div>

          {/* Search and Filter Bar */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 lg:max-w-md">
                <div className="relative">
                  <LuSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Search sessions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-modern pl-12 w-full"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="btn-secondary flex items-center space-x-2">
                  <LuFilter className="text-lg" />
                  <span>Filter</span>
                </button>
                
                <div className="flex items-center space-x-2 glass-effect rounded-xl p-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'grid'
                        ? 'bg-red-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <LuLayoutGrid className="text-lg" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'list'
                        ? 'bg-red-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <LuLayoutList className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Grid */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredSessions.map((data) => (
            <SummaryCard
              key={data._id}
              role={data.role}
              topicToFocus={data.topicToFocus || ""}
              experience={data.experience}
              questions={data.questions.length}
              description={data.description}
              lastUpdated={
                data.updatedAt
                  ? moment(data.updatedAt).format("Do MMM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/interview-prep/${data._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredSessions.length === 0 && (
          <div className="text-center py-16">
            <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <LuPlus className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {searchTerm ? 'No sessions found' : 'Start Your Journey'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Create your first interview preparation session and begin practicing today!'
                }
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setOpenCreateModal(true)}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <LuPlus className="text-lg" />
                  <span>Create Session</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <button
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 animate-glow z-50"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl" />
        </button>
      </div>

      <Modal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} hideHeader={true}>
        <CreateSessionForm />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Alert"
      >
        <div className="w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this session detail?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;