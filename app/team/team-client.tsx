"use client";

import Image from "next/image";

import { Marquee } from "@/components/ui/marquee";
import FounderVision from "@/components/founder-vision";

const teamMembers = [
    {
        image: "/team/core_team/ayano.png",
        name: "Gagan",
        role: "Tech Lead",
    },
    {
        image: "/team/core_team/Pulkit.webp",
        name: "Pulkit",
        role: "Full Stack Developer",
    },
    {
        image: "/team/core_team/Sharad.webp",
        name: "Sharad",
        role: "Mobile Developer",
    },
    {
        image: "/team/core_team/Shiva.webp",
        name: "Shiva Yadav",
        role: "Full Stack Developer",
    },
    {
        image: "/team/core_team/Aham.webp",
        name: "Aham Gupta",
        role: "Graphics Designer",
    },
    {
        image: "/team/core_team/yash.png",
        name: "Yogendra Saini",
        role: "Mobile Developer",
    },
    {
        image: "/team/core_team/keshav gupta.png",
        name: "Keshav Gupta",
        role: "AI Engineer",
    },

    {
        image: "/team/core_team/sneha.jpeg",
        name: "Sneha Sahu",
        role: "Sale Executive",
    },
    // {
    //     image: "/team/core_team/Palak.webp",
    //     name: "Palak",
    //     role: "Mobile Developer",
    // },
    {
        image: "/team/core_team/nandini.jpeg",
        name: "Nandini",
        role: "Full Stack Developer",
    },
    {
        image: "/team/core_team/Nitesh.jpeg",
        name: "Nitesh",
        role: "Social Media Specialist",
    },
    {
        image: "/team/core_team/Nihal.JPG",
        name: "Nihal",
        role: "UI/UX Designer",
    },
    {
        image: "/team/core_team/ankit.png",
        name: "Ankit",
        role: "UX Designer",
    },

];

const associateMembers = [
    {
        image: "/team/advisor_team/co_founder.png",
        name: "Nimesh Tiwari",
        role: "Co-Founder | Indian school of business",

    },
    {
        image: "/team/advisor_team/finance_cnsultant.jpeg",
        name: "Rachit Agarwal",
        role: "Finance Consultant | Founder of Finwell growth Pvt Ltd",
    },
    {
        image: "/team/advisor_team/dvisor.png",
        name: "Parantap Sharma",
        role: "Advisor",
    },
    {
        image: "/team/advisor_team/tech_advisor.png",
        name: "Harshit Jha",
        role: "Technical Advisor | Founder of Jhansi Resonance ",
    },
    {
        image: "/team/advisor_team/tech_advisor_s.png",
        name: "Sehgal Yadav",
        role: "Technical Advisor | Founder of LessPay",
    },
    {
        image: "/team/advisor_team/distribution_ntw.png",
        name: "Pavneet Singh Chawla",
        role: "Distribution Network Advisor | Founder & CEO – Spzaora",
    },
    {
        image: "/team/advisor_team/ecoqube_founder.png",
        name: "Mohit Sharma",
        role: "B2G Deal Advisor | Founder - Ecoqube realstate",
    },
    {
        image: "/team/advisor_team/legal_advisor.png",
        name: "Vasudev Kaushik",
        role: "Chief Legal Advisor | Advocate at Supreme Court ",
    },
];

export default function TeamClient() {
    return (
        <div className="w-full bg-white">
            {/* Founder Vision Header */}
            <FounderVision />

            <section className="relative w-full overflow-hidden bg-white py-12 md:py-24">
                <div className="relative z-10 mx-auto max-w-7xl pt-16">
                {/* Advisor / Leadership Section — now first */}
                <div className="mx-auto mb-16 flex max-w-5xl flex-col items-center px-6 text-center lg:px-0">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z" /><polyline points="9 11 11 13 15 9" /></svg>
                    </div>

                    <h1 className="relative mb-4 font-medium text-4xl text-neutral-900 tracking-tight sm:text-5xl dark:text-neutral-100">
                        Our Leadership & Advisory Board
                        <svg
                            className="absolute -top-2 -right-8 -z-10 w-24 text-neutral-200 dark:text-neutral-700"
                            fill="currentColor"
                            height="86"
                            viewBox="0 0 108 86"
                            width="108"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="28"
                            />
                        </svg>
                    </h1>
                </div>

                <div className="relative w-full">
                    <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-linear-to-r from-white to-transparent dark:from-background" />
                    <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-linear-to-l from-white to-transparent dark:from-background" />
                    <Marquee className="[--gap:1.5rem]" reverse pauseOnHover>
                        {associateMembers.map((member, index) => (
                            <div
                                className="group flex w-64 shrink-0 flex-col"
                                key={index}
                            >
                                <div className="relative h-92 w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                                    <Image
                                        alt={member.name}
                                        className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
                                        fill
                                        src={member.image}
                                        sizes="256px"
                                    />
                                    <div className="absolute bottom-0 w-full rounded-lg bg-neutral-100/85 p-2 dark:bg-neutral-800/80">
                                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                                            {member.name}
                                        </h3>
                                        <p className="text-neutral-600 text-sm dark:text-neutral-400">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Marquee>
                </div>

                {/* Team Section — now second */}
                <div className="mx-auto mt-32 mb-16 flex max-w-5xl flex-col items-center px-6 text-center lg:px-0">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-star-icon lucide-user-star"><path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" /><path d="M8 15H7a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /></svg>
                    </div>

                    <h1 className="relative mb-4 font-medium text-4xl text-neutral-900 tracking-tight sm:text-5xl dark:text-neutral-100">
                        Meet the KavachX Team.
                        <svg
                            className="absolute -top-2 -right-8 -z-10 w-24 text-neutral-200 dark:text-neutral-700"
                            fill="currentColor"
                            height="86"
                            viewBox="0 0 108 86"
                            width="108"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="28"
                            />
                        </svg>
                    </h1>
                    <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
                        Passionate engineers, designers, and safety advocates - building India's most intelligent personal safety platform
                    </p>
                </div>

                <div className="relative w-full">
                    <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-linear-to-r from-white to-transparent dark:from-background" />
                    <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-linear-to-l from-white to-transparent dark:from-background" />

                    <Marquee className="[--gap:1.5rem]" pauseOnHover>
                        {teamMembers.map((member) => (
                            <div
                                className="group flex w-64 shrink-0 flex-col"
                                key={member.name}
                            >
                                <div className="relative h-92 w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                                    <Image
                                        alt={member.name}
                                        className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
                                        fill
                                        src={member.image}
                                        sizes="256px"
                                    />
                                    <div className="absolute bottom-0 w-full rounded-lg bg-neutral-100/85 p-2 dark:bg-neutral-800/80">
                                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                                            {member.name}
                                        </h3>
                                        <p className="text-neutral-600 text-sm dark:text-neutral-400">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Marquee>
                </div>

            </div>
        </section>

        <div className="w-full bg-white py-20">
            <div className="mx-auto mt-20 max-w-3xl px-6 text-center lg:px-0">
                <p className="mb-8 font-medium text-lg text-neutral-900 leading-relaxed md:text-xl dark:text-neutral-100">
                    &quot;The Kavachx team&apos;s dedication to safety innovation is extraordinary. They built a product that genuinely protects families across India they&apos;re just getting started&quot;
                </p>
                <div className="flex flex-col items-center gap-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full">
                        <Image
                            alt="Abhay Namdev — Founder &amp; CEO of KavachX"
                            className="h-full w-full object-cover object-top"
                            fill
                            src="/images/Abhay Namdev.png"
                            sizes="56px"
                        />
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                            Abhay Namdev
                        </p>
                        <p className="text-neutral-600 text-sm dark:text-neutral-400">
                            Founder · CEO · KavachX
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
