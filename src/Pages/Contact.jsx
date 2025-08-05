import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        query: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contact Form Submitted:", formData);
        // TODO: send to backend or email service
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-neutral-50 px-4">
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
                            <Label htmlFor="query">Your Query</Label>
                            <Textarea
                                id="query"
                                name="query"
                                placeholder="Type your message here..."
                                value={formData.query}
                                onChange={handleChange}
                                className="focus:outline-none focus:ring-0 focus:border-none"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full focus:outline-none focus:ring-0 focus:border-none"
                        >
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
