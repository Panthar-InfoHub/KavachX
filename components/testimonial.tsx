"use client"
import { motion } from "motion/react";
import { TestimonialsColumn } from "./blocks/testimonials-columns-1";

const testimonials = [
    {
        text: "I gifted Suraksha Kavach to my elderly mother who lives alone. She's not very tech-savvy but the setup was so simple even she figured it out in minutes. Now with one press she can alert me immediately. I feel so much better knowing she has this protection around the clock.",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Briana Patton",
    },
    {
        text: "I truly appreciate the thought and effort behind Suraksha Kawach. It’s rare to find technology that genuinely cares. This app brings confidence and security to every user.",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        name: "Parantap Sharma",
    },
    {
        text: "I travel solo across India for my business work — sometimes to remote areas with zero connectivity. Suraksha Kavach's offline functionality is the only reason I feel confident going to places where Google Maps itself fails. Absolutely essential app.",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        name: "Sahgal Yadav",
    },
    {
        text: "As someone who has always stood for women’s safety, I see Suraksha Kawach as a powerful step forward. It empowers women to feel secure and gives families hope that their loved ones are never truly alone.",
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        name: "Laxmi Agarwal",
    },
    {
        text: "Being in the financial world, I know the importance of security. Suraksha Kawach brings that same sense of assurance to personal safety. It’s a must-have in every phone, especially for our loved ones.",
        image: "https://randomuser.me/api/portraits/women/5.jpg",
        name: "Rishi Sugandh",
    },
    {
        text: "I used to feel anxious every time I traveled alone for work. Since I started using Suraksha Kavach, my parents finally stop worrying — they can see my location in real time. The voice command SOS is a game changer. I don't even need to touch my phone.",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
        name: "Tripti Sharma",
    },
    {
        text: "Safety of citizens is our foremost duty, and Suraksha Kawach is a shining example of how technology can support this mission. It reflects a vision of a safer and stronger community.",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        name: "Ravi Sharma",
    },
    {
        text: "The app has made me feel much more secure while commuting late. The real-time tracking feature gives my parents complete peace of mind, and I no longer have to worry about reaching home safely.",
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        name: "Ishan Raj Saxena",
    },
    {
        text: "I feel more confident letting my daughter travel alone now, knowing she has Suraksha Kavach with her. The voice SOS and emergency contacts give me reassurance that help is just a tap away, no matter where she is.",
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        name: "Pratham Singh",
    },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


export const Testimonials = () => {
    return (
        <section className="bg-white py-20 relative">

            <div className="container z-10 mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-syne tracking-tight mt-5 text-gray-900 text-center">
                        What our users say
                    </h2>
                    <p className="text-center mt-5 text-gray-600 text-lg">
                        Let's hear how hypershpere client's feels about our service
                    </p>
                </motion.div>

                <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden relative">
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
