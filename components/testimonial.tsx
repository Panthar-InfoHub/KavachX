"use client";
import Image from "next/image";
import { useRef } from "react";
import { TimelineContent } from "./TimelineContent";

type TestimonialData = {
    quote: string;
    name: string;
    role: string;
    image: string;
    className: string;
    hasPattern?: boolean;
    quoteClassName?: string;
    imageClassName?: string;
    titleClassName?: string;
    roleClassName?: string;
    footerClassName?: string;
    animationNum: number;
};

const testimonialColumns: { wrapperClassName: string; items: TestimonialData[] }[] = [
    {
        wrapperClassName: "md:flex lg:flex-col lg:space-y-2 h-full lg:gap-0 gap-2 ",
        items: [
            {
                quote: "\"I gifted Suraksha Kavach to my elderly mother who lives alone. She's not very tech-savvy but the setup was so simple even she figured it out in minutes. Now with one press she can alert me immediately. I feel so much better knowing she has this protection around the clock.\"",
                name: "Guillermo Rauch",
                role: "CEO of Enigma",
                image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop",
                className: "lg:flex-[7] flex-[6] bg-primaryColor",
                hasPattern: true,
                imageClassName: "w-16 h-16",
                titleClassName: "lg:text-xl text-sm",
                animationNum: 0,
            },
            {
                quote: "\"I truly appreciate the thought and effort behind Suraksha Kawach. It’s rare to find technology that genuinely cares. This app brings confidence and security to every user.\"",
                name: "Parantap Sharma",
                role: "CEO of Kintsugi",
                image: "https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?q=80&w=687&auto=format&fit=crop",
                className: "lg:flex-[3] flex-[4] lg:h-fit lg:shrink-0 bg-blue-600 text-white",
                imageClassName: "w-16 h-16",
                titleClassName: "text-xl",
                animationNum: 1,
            }
        ]
    },
    {
        wrapperClassName: "lg:h-full md:flex lg:flex-col h-fit lg:space-y-2 lg:gap-0 gap-2",
        items: [
            {
                quote: "\"I travel solo across India for my business work — sometimes to remote areas with zero connectivity. Suraksha Kavach's offline functionality is the only reason I feel confident going to places where Google Maps itself fails. Absolutely essential app.\"",
                name: "Sahgal",
                role: "CEO of OdeaoLabs",
                image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1021&auto=format&fit=crop",
                className: "bg-[#111111] text-white",
                quoteClassName: "2xl:text-base text-sm",
                imageClassName: "lg:w-16 lg:h-16 w-12 h-12",
                titleClassName: "lg:text-xl text-lg",
                roleClassName: "lg:text-base text-sm",
                footerClassName: "items-end",
                animationNum: 2,
            },
            {
                quote: "\"As someone who has always stood for women’s safety, I see Suraksha Kawach as a powerful step forward. It empowers women to feel secure and gives families hope that their loved ones are never truly alone.\"",
                name: "Laxmi Agarwal",
                role: "CEO of Labsbo",
                image: "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop",
                className: "bg-[#111111] text-white",
                quoteClassName: "2xl:text-base text-sm",
                imageClassName: "lg:w-16 lg:h-16 w-12 h-12",
                titleClassName: "lg:text-xl text-lg",
                roleClassName: "lg:text-base text-sm",
                footerClassName: "items-end",
                animationNum: 3,
            },
            {
                quote: "\"Being in the financial world, I know the importance of security. Suraksha Kawach brings that same sense of assurance to personal safety. It’s a must-have in every phone, especially for our loved ones.\"",
                name: "Rishi Sugandh",
                role: "CA",
                image: "https://images.unsplash.com/photo-1740102074295-c13fae3e4f8a?q=80&w=687&auto=format&fit=crop",
                className: "bg-[#111111] text-white",
                quoteClassName: "2xl:text-base text-sm",
                imageClassName: "lg:w-16 lg:h-16 w-12 h-12",
                titleClassName: "lg:text-xl text-lg",
                roleClassName: "lg:text-base text-sm",
                footerClassName: "items-end",
                animationNum: 4,
            }
        ]
    },
    {
        wrapperClassName: "h-full md:flex lg:flex-col lg:space-y-2 lg:gap-0 gap-2",
        items: [
            {
                quote: "\"I used to feel anxious every time I traveled alone for work. Since I started using Suraksha Kavach, my parents finally stop worrying — they can see my location in real time. The voice command SOS is a game changer. I don't even need to touch my phone.\"",
                name: "Tripti Sharma",
                role: "CEO of OdeaoLabs",
                image: "https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=765&auto=format&fit=crop",
                className: "lg:flex-[3] flex-[4] bg-blue-600 text-white",
                imageClassName: "w-16 h-16",
                titleClassName: "text-xl",
                animationNum: 5,
            },
            {
                quote: "\"Safety of citizens is our foremost duty, and Suraksha Kawach is a shining example of how technology can support this mission. It reflects a vision of a safer and stronger community.\"",
                name: "Ravi Sharma",
                role: "MLA",
                image: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=687&auto=format&fit=crop",
                className: "lg:flex-[7] flex-[6] bg-primaryColor",
                hasPattern: true,
                imageClassName: "w-16 h-16",
                titleClassName: "text-xl",
                animationNum: 6,
            }
        ]
    }
];

function Testimonial() {
    const testimonialRef = useRef<HTMLDivElement>(null);

    const revealVariants = {
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay: i * 0.4,
                duration: 0.5,
            },
        }),
        hidden: {
            filter: "blur(10px)",
            y: -20,
            opacity: 0,
        },
    };

    return (
        <main className="w-full bg-white">
            <section className="relative  h-full container text-black mx-auto  rounded-lg  py-14 bg-white" ref={testimonialRef}>
                <article className={"max-w-screen-md mx-auto text-center space-y-2 "} >
                    <TimelineContent as="h1" className={"xl:text-4xl text-3xl  font-medium"} animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef}>
                        Trusted by Startups and the worlds's largest companies
                    </TimelineContent>
                    <TimelineContent as="p" className={"mx-auto text-gray-500"} animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef}>
                        Let's hear how hypershpere client's feels about our service
                    </TimelineContent>
                </article>
                <div className="lg:grid lg:grid-cols-3  gap-2 flex flex-col w-full lg:py-10 pt-10 pb-4 lg:px-10 px-4">
                    {testimonialColumns.map((column, colIndex) => (
                        <div key={colIndex} className={column.wrapperClassName}>
                            {column.items.map((item, itemIndex) => (
                                <TimelineContent
                                    key={itemIndex}
                                    animationNum={item.animationNum}
                                    customVariants={revealVariants}
                                    timelineRef={testimonialRef}
                                    className={`flex flex-col justify-between relative overflow-hidden rounded-lg border border-gray-200 p-5 ${item.className}`}
                                >
                                    {item.hasPattern && (
                                        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
                                    )}
                                    <article className="mt-auto">
                                        <p className={item.quoteClassName}>{item.quote}</p>
                                        <div className={`flex justify-between pt-5 ${item.footerClassName || ""}`}>
                                            <div>
                                                <h2 className={`font-semibold ${item.titleClassName || ""}`}>
                                                    {item.name}
                                                </h2>
                                                <p className={item.roleClassName}>{item.role}</p>
                                            </div>
                                            <Image
                                                src={item.image}
                                                alt="logo"
                                                width={200}
                                                height={200}
                                                className={`rounded-xl object-cover ${item.imageClassName || ""}`}
                                            />
                                        </div>
                                    </article>
                                </TimelineContent>
                            ))}
                        </div>
                    ))}
                </div>

            </section>
        </main>
    );
}

export default Testimonial;
