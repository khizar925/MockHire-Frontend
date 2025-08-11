// Dashboard.jsx
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserButton } from "@clerk/clerk-react";
import pdfToText from "react-pdftotext";

import { Button } from '../components/ui/button';
import { Input } from "../components/ui/input";
import { Combobox } from "../components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../components/ui/dialog";
import { LoaderOne } from "../components/ui/loader";

import InterviewCard from "../components/InterviewCard";

const SERVER_ORIGIN = import.meta.env.VITE_SERVER_ORIGIN;

// InterviewForm Component
function InterviewForm({ onClose, interviewData = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const roles = [...new Set(interviewData.map((i) => i.title))];
  const durations = ["1 min", "2 min", "3 min"];
  const difficulty = ["Easy", "Medium", "Hard"];

  const [resume, setResume] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [message, setMessage] = useState("");

  function extractText(event) {
    const file = event.target.files[0];
    if (!file) return;
    setResume(file);
    pdfToText(file)
      .then((text) => setResumeText(text))
      .catch(() => console.error("Failed to extract text from pdf"));
  }

  const handleSubmit = async () => {
    if (!resumeText || !selectedRole || !selectedDifficulty || !selectedDuration) {
      setMessage("Fill All Fields!");
      return;
    }

    navigate("/interview", {
      state: {
        role: selectedRole,
        difficulty: selectedDifficulty,
        duration: selectedDuration,
        resumeText,
      },
    });
    onClose?.();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogDescription>Please fill in the details below.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Combobox
            label="Role"
            options={roles}
            value={selectedRole}
            onChange={setSelectedRole}
          />
          <Combobox
            label="Difficulty Level"
            options={difficulty}
            value={selectedDifficulty}
            onChange={setSelectedDifficulty}
          />
          <Combobox
            label="Interview Duration"
            options={durations}
            value={selectedDuration}
            onChange={setSelectedDuration}
          />

          <div>
            <label className="block text-sm font-medium mb-1">Upload Resume (.pdf)</label>
            <Input
              type="file"
              accept=".pdf"
              onChange={extractText}
            />
          </div>
        </div>
        {message && (
          <div className={"justify-center align-center"}>
            <p className="text-red-500 text-sm mt-2">
              {message}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <DialogClose asChild>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Dashboard Component
export default function Dashboard() {
  const [interviews, setInterviews] = useState([]);
  const [modalshow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${SERVER_ORIGIN}/api/interviews`);
        setInterviews(response.data.data);
      } catch (error) {
        console.log(error);
        setInterviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <div
      className="px-2 sm:px-4 py-4"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, white 0%, #dbeafe 50%, white 100%)",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% 1000px",
      }}
    >
      {/* Hero Section */}
      <div className="w-full max-w-[1140px] mx-auto mt-1 rounded-[20px] p-4 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <div className="text-center md:text-left flex-1">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-black leading-tight">
            Get Interview-Ready with AI-
            <br />
            Powered Practice & Feedback
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base md:text-lg">
            Practice real interview questions & get instant feedback.
          </p>
          <div onClick={() => setModalShow(true)}>
            <Button className="mt-4 px-4 py-2 text-sm sm:text-base font-medium rounded-full bg-blue-500 hover:bg-blue-400 text-white">
              Start an Interview
            </Button>
          </div>
        </div>

        {/* Interview form */}
        {modalshow && (
          <InterviewForm
            onClose={() => setModalShow(false)}
            interviewData={interviews}
          />
        )}

        {/* Right */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[250px] sm:max-w-[300px]">
            <img
              src="/robot.png"
              alt="Robot Interview"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Pick Your Interview */}
      <section id="interviews">
        <div className="w-full max-w-[1140px] mx-auto mt-8 rounded-[20px] p-4 sm:p-6">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4">
            Pick Your Interview
          </h2>
          <br />

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <LoaderOne />
              </div>
            </div>
          ) : interviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No interviews available at the moment.</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-full"
              >
                Refresh
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-start">
              {interviews.map((interview) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
