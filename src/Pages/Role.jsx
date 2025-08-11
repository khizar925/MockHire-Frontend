import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Users, Target, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

const SERVER_ORIGIN = import.meta.env.VITE_SERVER_ORIGIN;

export default function Role() {
  const { title } = useParams();
  const navigate = useNavigate();
  const [roleDetails, setRoleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`${SERVER_ORIGIN}/api/roles`, { params: { title } });
        const data = response?.data?.data;
        const role = Array.isArray(data) ? data[0] : data;
        setRoleDetails(role ?? null);
      } catch (error) {
        setError("Failed to load role details. Please try again.");
        setRoleDetails(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, [title]);

  const prettifyTitle = (rawTitle) =>
    (rawTitle || '')
      .split('_')
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ''))
      .join(' ');
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700"
              onClick={() => navigate(-1)}
            >
              ← Back
            </Button>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                Dashboard
              </Button>
            </Link>
          </div>

          {loading ? (
            <h1 className="text-2xl font-semibold text-gray-700">Loading role details…</h1>
          ) : error ? (
            <h1 className="text-2xl font-semibold text-red-600">{error}</h1>
          ) : !roleDetails ? (
            <h1 className="text-2xl font-semibold text-gray-700">No role found.</h1>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{prettifyTitle(roleDetails?.title)}</h1>
              <div className="flex flex-wrap gap-2">
                {roleDetails?.details?.interviewType && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    <Users className="w-4 h-4 mr-1" />
                    {roleDetails.details.interviewType}
                  </Badge>
                )}
              </div>
            </>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Tech Stack */}
            { roleDetails?.details?.techStack?.length > 0 && (<Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Tech Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {roleDetails?.details?.techStack?.map((tech, index) => (
                    <Badge
                      key={`${tech}-${index}`}
                      variant="outline"
                      className="bg-blue-50 border-blue-200 text-blue-700"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>)}

            {/* Expected Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Expected Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {roleDetails?.details?.expectedQuestions?.map((question, index) => (
                    <div
                      key={`${index}-${question.slice(0, 10)}`}
                      className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg"
                    >
                      <span className="text-orange-600 font-semibold text-sm min-w-[20px]">
                        {index + 1}
                      </span>
                      <p className="text-gray-700">{question}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {roleDetails?.details?.requirements?.map((req, index) => (
                    <li key={`${index}-${req.slice(0, 10)}`} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Preparation Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Preparation Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {roleDetails?.details?.preparationTips?.map((tip, index) => (
                    <div key={`${index}-${tip.slice(0, 10)}`} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <span className="text-purple-600 font-semibold text-sm min-w-[20px]">
                        {index + 1}
                      </span>
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Common Mistakes to Avoid */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Common Mistakes to Avoid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {roleDetails?.details?.commonMistakes?.map((mistake, index) => (
                    <div key={`${index}-${mistake.slice(0, 10)}`} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                      <span className="text-red-600 font-semibold text-sm min-w-[20px]">⚠️</span>
                      <p className="text-gray-700">{mistake}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resources & Learning Materials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  Resources & Learning Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roleDetails?.details?.resources?.map((resource, index) => (
                    <div key={`${index}-${resource.url}`} className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                      <h4 className="font-semibold text-indigo-800 mb-2">{resource.name}</h4>
                      <p className="text-gray-700 text-sm mb-3">{resource.description}</p>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm hover:underline"
                      >
                        Visit Documentation →
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}