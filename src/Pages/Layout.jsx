import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const handshakeParams = [
            "__clerk_handshake",
            "__clerk_redirect_url",
            "__clerk_session_id"
        ];
        let changed = false;

        handshakeParams.forEach((p) => {
            if (params.has(p)) {
                params.delete(p);
                changed = true;
            }
        });

        if (changed) {
            navigate(location.pathname, { replace: true });
        }
    }, [location, navigate]);

    return (
        <div
            className="min-h-screen bg-cover bg-no-repeat bg-center"
            style={{
                backgroundImage: "linear-gradient(to bottom, white, #dbeafe, white)",
            }}
        >
            <Navbar />
            <Outlet />
        </div>
    );
}
