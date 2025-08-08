import React, { useEffect, useState } from "react";
import { getRandomInterviewCover } from "../utils"; // Adjust as needed
import { CalendarDays, Star } from "lucide-react"; // Optional: replace with your icon set
import { Link } from "react-router-dom";


export default function InterviewCard({ interview }) {
    const [cover, setCover] = useState("");
    const techIcons = {
        // 💻 Technical (updated for dark background)
        "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg",
        "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg",
        "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg",
        "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg",
        "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg",
        "Express": "https://img.icons8.com/?size=100&id=24895&format=png&color=000000",
        "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain.svg",
        "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "Pandas": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
        "Scikit-learn": "https://raw.githubusercontent.com/scikit-learn/scikit-learn/main/doc/logos/scikit-learn-logo-notext.png", // solid PNG
        "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        "Agile": "https://img.icons8.com/?size=100&id=UKz3dHdlTEyP&format=png&color=000000",

        // 🧠 Non-technical fallback (recolored or white icons)
        "Communication": "https://img.icons8.com/ios-filled/50/ffffff/chat--v1.png",
        "Leadership": "https://img.icons8.com/ios-filled/50/ffffff/manager--v1.png",
        "Management": "https://img.icons8.com/ios-filled/50/ffffff/task.png",
    };


    const fallbackNonTechnicalIcons = ["Communication", "Leadership"];
    const isTechnical = interview.tech_stack.length > 0;
    const displayTechs = isTechnical ? interview.tech_stack : fallbackNonTechnicalIcons;


    useEffect(() => {
        const randomCover = getRandomInterviewCover();
        setCover(randomCover);
    }, []);

    return (
        <div className="relative w-full sm:w-full md:w-[48%] lg:w-[30%] bg-[#0f172a] text-white rounded-2xl p-5 shadow-md flex flex-col gap-4">

            {/* Top-right badge */}
            <div className="absolute top-3 right-3 bg-[#334155] text-white text-xs px-3 py-1 rounded-full">
                {interview.interview_type}
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
            <h3 className="text-lg font-semibold">{interview.title}</h3>

            {/* Feedback */}
            <p className="text-sm text-gray-400 leading-snug">
                {interview.description}
            </p>

            <div className="flex justify-between align-center">
                {/* Tech Stack Icons */}
                <div className="flex gap-2 flex-wrap items-center mt-2">
                    {displayTechs.map((tech, index) => (
                        <img
                            key={index}
                            src={techIcons[tech] || "https://img.icons8.com/ios-filled/50/code.png"}
                            alt={tech}
                            title={tech}
                            className="w-6 h-6"
                        />
                    ))}
                </div>

                {/* Button */}
                <div className="pt-2">
                    <Link to={"/interview"}>
                        <button className="bg-[#a78bfa] text-black text-sm font-medium px-4 py-2 rounded-full hover:bg-[#c4b5fd] transition">
                            View interview
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
}
