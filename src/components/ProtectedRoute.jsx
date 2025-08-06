import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { LoaderOne } from "@/components/ui/loader";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"80vh"}}><LoaderOne /></div>;

  return isSignedIn ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
