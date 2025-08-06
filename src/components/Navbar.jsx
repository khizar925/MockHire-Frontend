
import HelperNavbar from "./ui/Helper-Navbar";
import { Link } from "react-router-dom";
import { ShimmerButton } from "./ui/shimmer-button";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function Navbar() {

    return (
        <div>
            <div className="flex items-center justify-between px-6 flex-wrap gap-4">
                {/* Logo */}
                <Link to='/'>
                    <div className="flex items-center space-x-2 py-4">
                        <img src="/logo.svg" alt="MockHire Logo" className="h-8 w-auto" />
                        <span className="text-xl font-bold text-gray-800">MockHire</span>
                    </div>
                </Link>

                {/* Navbar links - center aligned on sm and above */}
                <div className="hidden sm:flex flex-1 justify-center">
                    <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                        <HelperNavbar />
                    </div>
                </div>

                {/* Auth Buttons */}
                <div className="w-[100px] min-h-[40px] flex justify-end items-center">
                    <SignedOut>
                        <Link to="/sign-in" className="w-full">
                            <ShimmerButton className="w-full sm:w-auto shadow-2xl">
                                <span className="whitespace-nowrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                                    Login
                                </span>
                            </ShimmerButton>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <div className="w-full flex justify-end">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SignedIn>
                </div>
            </div>
        </div>
    );
}