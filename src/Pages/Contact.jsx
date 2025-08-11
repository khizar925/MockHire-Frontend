import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SERVER_ORIGIN = import.meta.env.VITE_SERVER_ORIGIN;

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        query: "",
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.query) {
            setMessage("Fill All Fields!");
            setTimeout(() => setMessage(""), 3000);
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(`${SERVER_ORIGIN}/api/contact`, formData);

            if (response.status === 200 || response.status === 201) {
                setMessage("✅ Feedback submitted successfully!");
                setFormData({ name: "", email: "", query: "" });
            } else {
                setMessage("❌ Failed to submit feedback.");
            }
        } catch (error) {
            setMessage("❌ Error submitting feedback.");
            console.error(error);
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (
        <div className="flex justify-center items-center h-[92vh] px-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-neutral-800">Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="query">Your Query</Label>
                            <Textarea
                                id="query"
                                name="query"
                                placeholder="Type your message here..."
                                value={formData.query}
                                onChange={handleChange}
                            />
                        </div>
                        {message && <div className="text-sm text-red-500">{message}</div>}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 hover:bg-blue-400"
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
