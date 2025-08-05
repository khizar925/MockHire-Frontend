import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button"
import {
    CircleCheckIcon,
    CircleHelpIcon,
    CircleIcon
} from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

const features = [
    {
        title: "Real-Time AI",
        href: "/features/real-time-ai",
        description: "Simulate live interviews with intelligent voice-powered agents.",
    },
    {
        title: "Feedback System",
        href: "/features/feedback",
        description: "Get instant insights to improve your communication and responses.",
    },
    {
        title: "Practice Modes",
        href: "/features/practice-modes",
        description: "Choose from different interview modes tailored to job types.",
    },
    {
        title: "Voice Recognition",
        href: "/features/voice-recognition",
        description: "Evaluate answers using AI-powered voice analysis.",
    },
];

export default function Navbar() {
    return (
        <div className="flex flex-col justify-between items-center p-4">
            <NavigationMenu viewport={false}>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-base py-2 px-4">Overview</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                            href="/"
                                        >
                                            <div className="mt-4 mb-2 text-lg font-medium">MockHire</div>
                                            <p className="text-muted-foreground text-sm leading-tight">
                                                Real-time AI voice interview simulator for job seekers and students.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/about" title="About MockHire">
                                    Learn how MockHire helps you prepare with confidence.
                                </ListItem>
                                <ListItem href="/get-started" title="Getting Started">
                                    Start your first mock interview in minutes.
                                </ListItem>
                                <ListItem href="/faq" title="FAQs">
                                    Common questions about MockHire and its features.
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-base py-2 px-4">Features</NavigationMenuTrigger>
                        <NavigationMenuContent>
                        <ul className="grid gap-2 w-[90vw] sm:w-[350px] md:grid-cols-1 lg:grid-cols-2">
                                {features.map((feature) => (
                                    <ListItem
                                        key={feature.title}
                                        title={feature.title}
                                        href={feature.href}
                                    >
                                        {feature.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-base py-2 px-4">Quick Links</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link to="/start">Start Interview</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link to="/profile">My Profile</Link>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

function ListItem({ title, children, href, ...props }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link to={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}
