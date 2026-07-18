import Image from "next/image";

export default function FounderVision() {
    return (
        <section className="w-full bg-[#f5f5f5] py-20 md:py-28 px-6">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    {/* Left — Founder Image */}
                    <div className="w-full md:w-[45%] shrink-0">
                        <div className="w-full max-w-[400px] mx-auto rounded-[24px] overflow-hidden bg-[#f5f5f5] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] flex">
                            <Image
                                src="/images/Abhay Namdev.png"
                                alt="Abhay Namdev — Founder & CEO of KavachX"
                                width={1086}
                                height={1448}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Right — Content */}
                    <div className="w-full md:w-[55%] flex flex-col">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#e0e0e0] bg-white w-fit mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#111]">
                                <path d="M12 2L2 7l10 5 10-5-10-5Z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                            </svg>
                            <span className="text-[13px] font-medium text-[#111] tracking-wide">CEO & Founder</span>
                        </div>

                        {/* Heading */}
                        <h2 className="font-syne text-[clamp(32px,4.5vw,56px)] font-bold text-[#111] tracking-[-1px] leading-[1.1] mb-8">
                            The Vision<br />Behind KavachX
                        </h2>

                        {/* Divider */}
                        <div className="w-12 h-[2px] bg-[#111]/15 mb-8" />

                        {/* Quote */}
                        <blockquote className="text-[16px] md:text-[18px] leading-[1.8] text-[#444] italic font-light mb-10 max-w-lg">
                            &ldquo;Safety isn&apos;t just a feature; it&apos;s a fundamental human right. We&apos;re building KavachX to ensure that every individual in India can travel, live, and work with absolute peace of mind. Our technology is built on trust, innovation, and a relentless commitment to protecting what matters most.&rdquo;
                        </blockquote>

                        {/* Author */}
                        <div>
                            <p className="font-syne text-[20px] font-bold text-[#111] tracking-[-0.5px]">Abhay Namdev</p>
                            <p className="text-[13px] text-[#888] uppercase tracking-[2px] mt-1 font-medium">Founder · CEO</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
