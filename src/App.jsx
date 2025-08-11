import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";

import LandingPage from "./Pages/LandingPage";
import Layout from "./Pages/Layout";
import About from "./Pages/About";
import AuthPageWrapper from "./components/AuthPageWrapper";
import DashBoard from "./Pages/Dashboard";
import FAQ from "./Pages/FAQ";
import Feedback from "./Pages/Feedback";
import Contact from "./Pages/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import Interview from "./Pages/Interview";
import ErrorPage from "./Pages/ErrorPage" 
import Result from "./Pages/Results"
import Role from "./Pages/Role";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
      </Route>
      <Route path="/interview" element={<ProtectedRoute><Interview /></ProtectedRoute>} />
      <Route path="/role/:title" element={<ProtectedRoute><Role /></ProtectedRoute>} />
      <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />

      <Route
        path="/sign-in/*"
        element={
          <AuthPageWrapper>
            <SignIn routing="path" path="/sign-in" afterSignInUrl="/dashboard" redirectUrl="/dashboard" />
          </AuthPageWrapper>
        }
      />
      <Route
        path="/sign-up/*"
        element={
          <AuthPageWrapper>
            <SignUp routing="path" path="/sign-up" afterSignInUrl="/dashboard" redirectUrl="/dashboard" />
          </AuthPageWrapper>
        }
      />
    </Routes>
  );
}

export default App;
