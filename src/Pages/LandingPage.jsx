import Navbar from "../components/Navbar";
import { ShimmerButton } from "../components/ui/shimmer-button";

export default function LandingPage() {
    return (
        <div className="flex items-center justify-between px-6 flex-wrap gap-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <img src="/logo.svg" alt="MockHire Logo" className="h-8 w-auto" />
                <span className="text-xl font-bold text-gray-800">MockHire</span>
            </div>

            {/* Navbar visible only on lg and above */}
            <div className="hidden sm:flex flex-1 justify-center">
                <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                    <Navbar />
                </div>
            </div>


            {/* Get Started Button */}
            <div>
                <ShimmerButton className="shadow-2xl">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                        Login
                    </span>
                </ShimmerButton>
            </div>
        </div>
    );
}
