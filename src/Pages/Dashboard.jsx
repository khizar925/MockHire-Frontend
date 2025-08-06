import { UserButton } from "@clerk/clerk-react";
import { Button } from '../components/ui/button'
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="px-4 py-4">
      <header >
        <div className="flex items-center justify-between px-6 flex-wrap gap-4">
          {/* Logo */}
          <Link to='/'>
            <div className="flex items-center space-x-2 py-4">
              <img src="/logo.svg" alt="MockHire Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-gray-800">MockHire</span>
            </div>
          </Link>

          {/* Auth Buttons */}
          <div className="w-[100px] min-h-[40px] flex justify-end items-center">
            <div className="w-full flex justify-end">
              <UserButton  />
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto mt-8 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Left content */}
        <div className="text-center md:text-left flex-1">
          <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-4xl font-bold text-white leading-tight">
            Get Interview-Ready with AI-<br />
            Powered Practice & Feedback
          </h2>
          <p className="mt-4 text-gray-400 text-sm md:text-base">
            Practice real interview questions & get instant feedback.
          </p>
          <Button className="mt-6 px-6 py-3 text-sm font-medium rounded-full bg-white text-black">
            Start an Interview
          </Button>
        </div>

        {/* Right image */}
        <div className="flex-1 flex justify-center">
          <div className="w-sm sm:texwt-base md:text-xl lg:text-2xl xl:text-4xl">
            <img
              src="/robot.png"
              alt="Robot Interview"
              className="w-full max-w-[420px] h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
