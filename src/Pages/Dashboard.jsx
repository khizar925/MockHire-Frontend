import { UserButton } from "@clerk/clerk-react";
import { Button } from '../components/ui/button';
import { Link } from "react-router-dom";
import PastInterviewCard from "../components/PastInterviewCard";
import InterviewCard from "../components/InterviewCard";

export default function Dashboard() {
  return (
    <div className="px-2 sm:px-4 py-4" style={{backgroundImage: "linear-gradient(to bottom, white 0%, #dbeafe 50%, white 100%)",backgroundRepeat: "repeat-y",backgroundSize: "100% 1000px",}}>
      
      {/* Header */}
      <header>
        <div className="flex items-center justify-between px-2 sm:px-6 flex-wrap gap-2 sm:gap-4">
          <Link to="/">
            <div className="flex items-center space-x-2 py-4">
              <img src="/logo.svg" alt="MockHire Logo" className="h-10 sm:h-12 w-auto" />
              <span className="text-lg sm:text-xl font-bold text-gray-800">MockHire</span>
            </div>
          </Link>

          <div className="min-h-[40px] flex justify-end items-center">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "40px",
                    height: "40px",
                  },
                },
              }}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="w-full max-w-[1140px] mx-auto mt-1 rounded-[20px] p-4 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <div className="text-center md:text-left flex-1">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-black leading-tight">
            Get Interview-Ready with AI-<br />
            Powered Practice & Feedback
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base md:text-lg">
            Practice real interview questions & get instant feedback.
          </p>
          <Button className="mt-4 px-4 py-2 text-sm sm:text-base font-medium rounded-full bg-blue-500 hover:bg-blue-400 text-white">
            Start an Interview
          </Button>
        </div>

        {/* Right */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[250px] sm:max-w-[300px]">
            <img src="/robot.png" alt="Robot Interview" className="w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Past Interviews Section */}
      <div className="w-full max-w-[1140px] mx-auto mt-8 rounded-[20px] p-4 sm:p-6">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4">
          Your Past Interviews
        </h2>
        <br />
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-start">
          <PastInterviewCard />
          <PastInterviewCard />
          <PastInterviewCard />
        </div>
      </div>

      {/* Pick Your Interview */}
      <div className="w-full max-w-[1140px] mx-auto mt-8 rounded-[20px] p-4 sm:p-6">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4">
          Pick Your Interview
        </h2>
        <br />
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-start">
          <InterviewCard />
          <InterviewCard />
          <InterviewCard />
        </div>
      </div>
    </div>
  );
}
