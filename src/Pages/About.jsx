import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import AnimatedButton from "../components/ui/animated-button";

function About() {
    const benefits = [
        "AI-powered interview simulations tailored to your industry",
        "Real-time feedback to improve your performance instantly",
        "Practice with realistic scenarios from top companies",
        "Track your progress with detailed analytics"
    ];

    return (
        <div className="w-full">
            <div className="container mx-auto">
                <div className="flex gap-8 py-24 lg:py-44 items-center justify-center flex-col">
                    <div>
                        <AnimatedButton>
                            About MockHire
                        </AnimatedButton>

                    </div>

                    <div className="flex gap-4 flex-col">
                        <motion.h1
                            className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                        </motion.h1>

                        <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                            MockHire democratizes interview preparation with cutting-edge AI technology.
                            We help job seekers build confidence and land their dream jobs through
                            personalized, data-driven feedback and comprehensive practice sessions.
                        </p>
                    </div>

                    <motion.div
                        className="max-w-4xl w-full space-y-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Why MockHire */}
                        <div className="text-center">
                            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-500">Why MockHire?</h2>
                            <div className="grid md:grid-cols-2 gap-4 text-left">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/20">
                                        <Zap className="w-5 h-5 text-spektr-cyan-50 flex-shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default About;