import React, { useEffect, useState } from "react";
import { getRandomInterviewCover } from "../utils"; // Adjust as needed
import { CalendarDays, Star } from "lucide-react"; // Optional: replace with your icon set
import { Link } from "react-router-dom";

export default function InterviewCard() {
    const [cover, setCover] = useState("");

    useEffect(() => {
        const randomCover = getRandomInterviewCover();
        setCover(randomCover);
    }, []);

    return (
        <div className="relative w-full sm:w-full md:w-[48%] lg:w-[30%] bg-[#0f172a] text-white rounded-2xl p-5 shadow-md flex flex-col gap-4">

            {/* Top-right badge */}
            <div className="absolute top-3 right-3 bg-[#334155] text-white text-xs px-3 py-1 rounded-full">
                Technical
            </div>

            {/* Icon / Logo */}
            {cover && (
                <img
                    src={cover}
                    alt="Interview Cover"
                    className="w-10 h-10 rounded-full"
                />
            )}

            {/* Title */}
            <h3 className="text-lg font-semibold">Frontend Dev Interview</h3>

            {/* Date & Score */}
            <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    <span>Feb 28, 2025</span>
                </div>
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>12/100</span>
                </div>
            </div>

            {/* Feedback */}
            <p className="text-sm text-gray-400 leading-snug line-clamp-2">
                This interview does not reflect serious interest or engagement from the candidate. Their responses are dismissiv...
            </p>

            {/* Button */}
            <div className="pt-2">
                <Link to={"/interview"}>
                <button className="bg-[#a78bfa] text-black text-sm font-medium px-4 py-2 rounded-full hover:bg-[#c4b5fd] transition">
                    View interview
                </button>
                </Link>
            </div>
        </div>
    );
}
