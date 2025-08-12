import { useEffect, useMemo, useRef, useState } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Vapi from "@vapi-ai/web";

const SERVER_ORIGIN = import.meta.env.VITE_SERVER_ORIGIN;

export default function Interview() {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const formState = (location && location.state) || {};

  if (!formState || Object.keys(formState).length === 0) {
    navigate("/dashboard");
  }

  const PUBLIC_VAPI_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;
  const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;
  const VAPI_WORKFLOW_ID = import.meta.env.VITE_VAPI_WORKFLOW_ID;

  // 🔊 Speaking state
  const [botSpeaking, setBotSpeaking] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [fullTranscript, setFullTranscript] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [micPermission, setMicPermission] = useState("unknown");
  const [loading, setLoading] = useState(false);

  const vapiRef = useRef(null);
  const timeoutRef = useRef(null);
  const transcriptRef = useRef([]);

  const assistantVariables = useMemo(() => {
    // Pass dashboard selections and user data as variables for the assistant
    const variables = {
      role: formState?.role || "",
      difficulty: formState?.difficulty || "",
      duration: formState?.duration || "",
      resumeText: formState?.resumeText || "",
      userName: user?.fullName || user?.firstName || "",
      userEmail: user?.primaryEmailAddress?.emailAddress || "",
      userId: user?.id || "",
    };
    return variables;
  }, [formState, user]);

  useEffect(() => {
    // When botSpeaking becomes true, stop loading and clear timeout
    if (botSpeaking && loading) {
      setLoading(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [botSpeaking, loading, navigate]);

  useEffect(() => {
    if (!PUBLIC_VAPI_KEY) {
      console.warn("VITE_VAPI_PUBLIC_KEY not set. Vapi will be disabled.");
      return;
    }
    vapiRef.current = new Vapi(PUBLIC_VAPI_KEY);

    const vapi = vapiRef.current;

    const handleCallStart = () => {
      setIsCalling(true);
      setErrorMsg("");
      transcriptRef.current = [];
      setFullTranscript("");
    };
    const handleCallEnd = () => {
      setIsCalling(false);
      setBotSpeaking(false);
      setUserSpeaking(false);
      const joined = (transcriptRef.current || []).join("\n");
      setFullTranscript(joined);
    };
    const handleSpeechStart = (e) => {
      if (e?.user) setUserSpeaking(true);
      else setBotSpeaking(true);
    };
    const handleSpeechEnd = (e) => {
      if (e?.user) setUserSpeaking(false);
      else setBotSpeaking(false);
    };
    const handleTranscript = (msg) => {
      const isFinal = msg?.transcriptType ? msg.transcriptType === "final" : msg?.type === "transcript";
      if (!isFinal) return;
      const speaker = msg?.speaker || msg?.role || (msg?.user ? "User" : "Interviewer");
      const text = msg?.transcript || msg?.text || "";
      if (text) transcriptRef.current.push(`${speaker}: ${text}`);
    };
    const handleMessage = (msg) => handleTranscript(msg);

    const handleError = (err) => {
      const message = (typeof err === 'string' ? err : err?.message) || 'Unknown Vapi error';
      // eslint-disable-next-line no-console
      console.error('Vapi error event:', err);
      setErrorMsg(message);
      navigate("/dashboard");
    };

    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("message", handleMessage);
    vapi.on("error", handleError);

    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("message", handleMessage);
      vapi.off("error", handleError);
      try { vapi.stop(); } catch (_) { }
    };
  }, [PUBLIC_VAPI_KEY]);

  // Request microphone access on page load so the browser prompts immediately
  useEffect(() => {
    const requestMic = async () => {
      if (!navigator?.mediaDevices?.getUserMedia) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicPermission("granted");
        stream.getTracks().forEach((t) => t.stop());
      } catch (_err) {
        setMicPermission("denied");
        setErrorMsg("Microphone permission is required to start the interview.");
      }
    };
    requestMic();
  }, []);

  const startInterview = async () => {
    if (!vapiRef.current) return;
    try {
      setErrorMsg("");
      setLoading(true);
      timeoutRef.current = setTimeout(() => {
        setLoading(false);
        if (!botSpeaking) {
          navigate("/dashboard");
        }
      }, 50000);
      // Prefer Assistant ID when available. If not, try Workflow ID with variableValues
      if (VAPI_ASSISTANT_ID) {
        try {
          await vapiRef.current.start(VAPI_ASSISTANT_ID, { variableValues: assistantVariables });
        } catch (errPrimary) {
          // Fallback to options-object signature (some SDK versions)
          await vapiRef.current.start({
            assistantId: VAPI_ASSISTANT_ID,
            assistantOverrides: { variableValues: assistantVariables },
          });
        }
      } else if (VAPI_WORKFLOW_ID) {
        try {
          await vapiRef.current.start(undefined, undefined, undefined, VAPI_WORKFLOW_ID, {
            variableValues: assistantVariables,
          });
        } catch (errPrimary) {
          await vapiRef.current.start({
            workflowId: VAPI_WORKFLOW_ID,
            variableValues: assistantVariables,
          });
        }
      } else {
        throw new Error("Missing VAPI assistant or workflow ID");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to start interview", error);
      setErrorMsg((error && error.message) || "Failed to start interview");
      setLoading(false); // stop loading on error
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  };

  const stopInterview = async () => {
    if (!vapiRef.current) return;

    try {
      // Step 1: Stop the interview
      await vapiRef.current.stop();

      // Step 2: Ensure transcript is fully joined after stop completes
      const joinedTranscript = (transcriptRef.current || []).join("\n");
      setFullTranscript(joinedTranscript);

      // Step 3: Ask backend for analysis
      console.log(JSON.stringify({ transcript: joinedTranscript }));
      const response = await fetch(`${SERVER_ORIGIN}/api/transcript`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: joinedTranscript }),
      });

      if (!response.ok) {
        throw new Error("Failed to get interview analysis");
      }

      const analysisResult = await response.json();

      // Step 4: Navigate ONLY after analysis is received
      navigate("/result", {
        state: {
          analysis: analysisResult,
          transcript: joinedTranscript
        }
      });

    } catch (error) {
      console.error("Failed to stop interview or fetch analysis", error);
      setErrorMsg("Failed to get interview analysis");

      // Wait 3 seconds so the user can see the error message before redirecting
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }

  };

  return (
    <div
      className="min-h-screen px-2 sm:px-4 py-4"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, white 0%, #dbeafe 50%, white 100%)",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% 1000px",
      }}
    >
      {/* Header */}
      <header>
        <div className="flex items-center justify-between px-2 sm:px-6 flex-wrap gap-2 sm:gap-4">
          <Link to="/">
            <div className="flex items-center space-x-2 py-4">
              <img
                src="/logo.svg"
                alt="MockHire Logo"
                className="h-10 sm:h-12 w-auto"
              />
              <span className="text-lg sm:text-xl font-bold text-gray-800">
                MockHire
              </span>
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

      {/* Interview Title and Type */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full max-w-[1140px] mx-auto mt-4 gap-4">
        <div className="flex items-center gap-2 font-semibold text-xl sm:text-2xl">
          <img src="/trial.png" alt="Logo" className="w-6 h-8 sm:w-9 sm:h-9" />
          <div>{formState.role} Interview</div>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-col gap-6 items-center w-full max-w-[600px] mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full">
          {/* AI Interviewer */}
          <div className="bg-[#f1f5f9] text-black rounded-2xl p-6 flex flex-col justify-center items-center shadow-lg relative">
            <div
              className={`w-24 h-24 [@media(min-width:320px)]:w-28 [@media(min-width:320px)]:h-28 [@media(min-width:375px)]:w-32 [@media(min-width:375px)]:h-32 [@media(min-width:425px)]:w-80 [@media(min-width:425px)]:h-80 rounded-full border-4 border-white ${botSpeaking ? "animate-pulse ring-4 ring-indigo-500" : ""}`}>
              <img
                src="data:image/png;base64,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"
                alt="AI"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <p className="mt-4 text-lg sm:text-xl font-medium">AI Interviewer</p>
          </div>
        </div>

        {/* Transcript will be collected silently and saved on end; no live subtitles */}
        {errorMsg ? (
          <div className="w-full max-w-[1140px] mx-auto text-center text-sm text-red-600">{errorMsg}</div>
        ) : null}
        {micPermission !== "granted" ? (
          <div className="w-full max-w-[1140px] mx-auto text-center text-sm text-amber-700">
            Please enable microphone access when prompted. If you dismissed it, click
            <button
              className="ml-1 underline"
              onClick={async () => {
                try {
                  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                  setMicPermission("granted");
                  stream.getTracks().forEach((t) => t.stop());
                  setErrorMsg("");
                } catch (_err) {
                  setMicPermission("denied");
                  setErrorMsg("Microphone permission is required to start the interview.");
                }
              }}
            >
              Enable Microphone
            </button>
          </div>
        ) : null}

        {/* Interview Control Buttons */}
        <div className="w-full sm:w-auto text-center">
          <Button
            className="w-full sm:w-48 m-4"
            onClick={startInterview}
            disabled={isCalling || !PUBLIC_VAPI_KEY || loading}
          >
            {loading ? "Loading..." : isCalling ? "Interview In Progress" : "Start Interview"}
          </Button>

          <Button variant="destructive" className="w-full sm:w-48" onClick={stopInterview} disabled={!isCalling}>
            Leave Interview
          </Button>
        </div>
      </div>
    </div>
  );
}