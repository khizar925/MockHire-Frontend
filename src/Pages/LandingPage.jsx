import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { ShimmerButton } from "../components/ui/shimmer-button";
import Hero from "../components/ui/animated-hero";
import { Link } from "react-router-dom";

export default function LandingPage() {
    const { isSignedIn, isLoaded } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            navigate("/dashboard");
        }
    }, [isLoaded, isSignedIn, navigate]);

    if (!isLoaded) return null;

    return (
        <>
            <Hero />
        </>
    );
}
