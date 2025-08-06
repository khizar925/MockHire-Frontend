import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Feedback() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        rating: 0,
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRating = (rating) => {
        setFormData((prev) => ({ ...prev, rating }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback Submitted:", formData);
        // TODO: send to backend or API
    };

    return (
        <div className="flex justify-center items-center h-[92vh] px-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-neutral-800">Feedback Form</CardTitle>
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
                                className="focus:outline-none focus:ring-0 focus:border-none"
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
                                className="focus:outline-none focus:ring-0 focus:border-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Your Feedback</Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Share your thoughts..."
                                value={formData.message}
                                onChange={handleChange}
                                className="focus:outline-none focus:ring-0 focus:border-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Rating</Label>
                            <div className="flex space-x-1 mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={24}
                                        className={`cursor-pointer transition-colors ${star <= formData.rating
                                                ? "text-yellow-500"
                                                : "text-neutral-400"
                                            }`}
                                        onClick={() => handleRating(star)}
                                        fill={star <= formData.rating ? "currentColor" : "none"}
                                    />
                                ))}
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full focus:outline-none focus:ring-0 focus:border-none bg-blue-500 hover:bg-blue-400"
                        >
                            Submit Feedback
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
