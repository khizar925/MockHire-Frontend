import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Results() {
    const location = useLocation();
    const navigate = useNavigate();
    const { analysis, transcript } = location.state || {};

    if (!analysis) {
        return (
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">No interview results found.</h1>
                <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-3xl mx-auto" style={{
            backgroundImage:
              "linear-gradient(to bottom, white 0%, #dbeafe 50%, white 100%)",
            backgroundRepeat: "repeat-y",
            backgroundSize: "100% 1000px",
          }}>
            <h1 className="text-2xl font-bold mb-6">Interview Analysis Results</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Overall Score: {analysis.totalScore}</h2>
                <p className="mb-4">{analysis.finalAssessment}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Category Scores</h2>
                <ul>
                    {analysis.categoryScores.map((cat) => (
                        <li key={cat.name} className="mb-3">
                            <strong>{cat.name}: {cat.score}</strong>
                            <p>{cat.comment}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Strengths</h2>
                <ul className="list-disc list-inside">
                    {analysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Areas For Improvement</h2>
                <ul className="list-disc list-inside">
                    {analysis.areasForImprovement.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
            </section>

            <div className="mt-6">
                <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
            </div>
        </div>
    );
}
