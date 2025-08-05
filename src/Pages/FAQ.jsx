import React from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../components/ui/animated-button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
    return (
        <div className="w-full">
            <div className="container mx-auto">
                <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">

                    {/* Header Button */}
                    <div>
                        <AnimatedButton>
                            FAQ - MockHire
                        </AnimatedButton>
                    </div>

                    {/* Heading and Description */}
                    <div className="flex gap-4 flex-col">
                        <p className="text-lg md:text-l leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                            Got questions? We've got answers. Below you'll find answers to the most common questions about MockHire — how it works, what it offers, and how it can help you prepare for your next big interview. Whether you're a first-time user or just curious, this section will guide you through everything you need to know.
                        </p>
                    </div>

                    {/* FAQ Items */}
                    <motion.div
                        className="max-w-2xl w-full space-y-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Accordion type="single" collapsible>
                            {/* FAQ 1 */}
                            <AccordionItem value="item-1">
                                <AccordionTrigger>What is MockHire and how does it help job seekers?</AccordionTrigger>
                                <AccordionContent>
                                    MockHire is an AI-powered interview preparation platform that helps job seekers build confidence and land their dream jobs. It offers personalized, data-driven feedback and realistic interview practice sessions tailored to different industries and roles.
                                </AccordionContent>
                            </AccordionItem>

                            {/* FAQ 2 */}
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Is MockHire accessible?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. MockHire is designed with accessibility in mind and follows the WAI-ARIA design pattern to ensure an inclusive experience for all users.
                                </AccordionContent>
                            </AccordionItem>

                            {/* FAQ 3 */}
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Do I need to create an account to use MockHire?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, creating an account allows MockHire to personalize your experience, track your progress, and provide tailored feedback based on your interview sessions.
                                </AccordionContent>
                            </AccordionItem>

                            {/* FAQ 4 */}
                            <AccordionItem value="item-4">
                                <AccordionTrigger>What industries or job roles does MockHire support?</AccordionTrigger>
                                <AccordionContent>
                                    MockHire supports a wide range of industries including tech, finance, healthcare, marketing, and more. You can select your desired role or industry to receive tailored practice interviews.
                                </AccordionContent>
                            </AccordionItem>

                            {/* FAQ 5 */}
                            <AccordionItem value="item-5">
                                <AccordionTrigger>Is there a free version of MockHire?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, MockHire offers a free version with limited features. For access to advanced simulations, analytics, and personalized coaching, you can upgrade to one of our premium plans.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
