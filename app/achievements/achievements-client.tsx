// "use client";

// import { useState } from "react";
// import { motion } from "motion/react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// import LenisDiv from "@/components/LenisDiv";
// import FadeIn from "@/components/FadeIn";
// import Testimonial from "@/components/testimonial";
// import CTA from "@/components/cta";
// import { DraggableContainer, GridBody, GridItem } from "@/components/ui/infinite-drag-scroll";

// const ACHIEVEMENT_IMAGES = [
//   { id: 1, alt: "KAIROS AI Edge Box", description: "Our flagship edge AI device delivering zero-latency threat detection at the source.", src: "/Achivement/iit.jpg" },
//   { id: 2, alt: "KavachX Award Ceremony", description: "Celebrated at the National Innovation Summit for groundbreaking AI security solutions.", src: "/Achivements/new paper 1.jpg" },
//   { id: 2, alt: "KavachX Award Ceremony", description: "Celebrated at the National Innovation Summit for groundbreaking AI security solutions.", src: "/Achivements/news paper 2" },
//   { id: 3, alt: "Smart Security Infrastructure", description: "End-to-end security infrastructure deployed across factories, offices & homes.", src: "" },
//   { id: 4, alt: "Enterprise Security Solutions", description: "Tailored AI surveillance solutions for large-scale enterprise environments.", src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80" },
//   { id: 5, alt: "Tech Innovation Summit", description: "Featured at India's top technology summit, showcasing the future of smart safety.", src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80" },
//   { id: 6, alt: "100K Households Protected", description: "Over 100,000 families across India now live safer lives with KavachX.", src: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=600&q=80" },
//   { id: 7, alt: "Safety Innovation Prize", description: "Awarded the Safety Innovation Prize for our real-time SOS alert ecosystem.", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
//   { id: 8, alt: "IIT Kanpur Incubation", description: "Incubated at the prestigious IIT Kanpur startup accelerator program.", src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=600&q=80" },
//   { id: 9, alt: "National Tech Council Award", description: "Recognised by the National Tech Council for best AI security product of the year.", src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80" },
//   { id: 10, alt: "Startup of the Year", description: "Named Startup of the Year by RAMP for transforming personal safety with AI.", src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80" },
//   { id: 11, alt: "Smart City Partner", description: "Official security infrastructure partner for 3 smart city projects in India.", src: "https://images.unsplash.com/photo-1550614000-4b95d4ed798a?auto=format&fit=crop&w=600&q=80" },
//   { id: 12, alt: "AI Research Grant", description: "Received a prestigious grant to advance edge-based AI threat detection models.", src: "https://images.unsplash.com/photo-1573455494057-12684d151bf4?auto=format&fit=crop&w=600&q=80" },
//   { id: 13, alt: "Gov-Tech Innovator", description: "Top 10 Gov-Tech Innovator for seamless integration with law enforcement systems.", src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80" },
//   { id: 14, alt: "B2B Platform Growth", description: "Ranked #1 in year-over-year B2B growth among security infrastructure providers.", src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" },
//   { id: 15, alt: "Women Safety Champion", description: "Recognised for our gesture-based SOS system that empowers women's personal safety.", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80" },
//   { id: 16, alt: "Global Enterprise Expansion", description: "Successfully expanded KavachX into 5 international markets in 2026.", src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80" },
//   { id: 17, alt: "Press & Media Coverage", description: "Featured in Aaj Tak, News18, and Dainik Jagran for revolutionising home security.", src: "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=600&q=80" },
//   { id: 18, alt: "Community Milestone", description: "Celebrated reaching 1 million safety alerts processed for communities across India.", src: "https://images.unsplash.com/photo-1596713109885-c94bdfd7f19d?auto=format&fit=crop&w=600&q=80" },
// ];


// const quotes = [
//   {
//     quote: "KavachX is fundamentally redefining how edge computing can be used to save lives in real-time.",
//     author: "Tech Innovations Quarterly",
//     role: "Global Tech Review",
//   },
//   {
//     quote: "The speed of the KAIROS box combined with the Suraksha app creates an unprecedented safety net.",
//     author: "Global Security Review",
//     role: "Industry Standard",
//   }
// ];


// export default function AchievementsClient() {

  
//   // Quote slider state
//   const [activeQuote, setActiveQuote] = useState(0);
//   const [isQuoteTransitioning, setIsQuoteTransitioning] = useState(false);

//   const handleQuoteChange = (index: number) => {
//     if (index === activeQuote || isQuoteTransitioning) return;
//     setIsQuoteTransitioning(true);
//     setTimeout(() => {
//       setActiveQuote(index);
//       setTimeout(() => setIsQuoteTransitioning(false), 50);
//     }, 300);
//   };

//   const handleQuotePrev = () => {
//     const newIndex = activeQuote === 0 ? quotes.length - 1 : activeQuote - 1;
//     handleQuoteChange(newIndex);
//   };

//   const handleQuoteNext = () => {
//     const newIndex = activeQuote === quotes.length - 1 ? 0 : activeQuote + 1;
//     handleQuoteChange(newIndex);
//   };
//   const currentQuote = quotes[activeQuote];



//   return (
//     <LenisDiv>
//       <div className="bg-[#FBFBFD] font-poppins selection:bg-slate-200 text-slate-900">
        
//         {/* Premium Grid Background & Accents */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
//           {/* Grid Pattern */}
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_40%,transparent_100%)]" />
          
//           {/* Soft Top Glow (Gray/Black) */}
//           <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-slate-200/50 via-white/0 to-slate-100/50 blur-[100px] opacity-80" />
//         </div>
        
//         {/* Intro Hero Section */}
//         <section className="relative z-10 pt-28 md:pt-32 pb-32 px-4 md:px-[5%] flex flex-col items-center text-center">
//           <FadeIn direction="up">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 border border-slate-200 mb-8 backdrop-blur-md shadow-sm">
//               <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
//               <span className="text-xs font-bold tracking-widest uppercase text-black">Our Track Record</span>
//             </div>
//           </FadeIn>
          
//           <FadeIn direction="up" delay={0.1}>
//             <h1 className="font-syne text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-8 text-black leading-[0.85]">
//               The Gallery of<br/>
//               <span className="bg-clip-text text-transparent bg-gradient-to-br from-black to-slate-400">Milestones.</span>
//             </h1>
//           </FadeIn>
          
//           <FadeIn direction="up" delay={0.2}>
//             <p className="max-w-2xl text-xl md:text-2xl text-slate-500 font-light mb-8 leading-relaxed">
//               Scroll down to explore a visual journey of the awards, recognitions, and massive milestones that define KavachX.
//             </p>
//             <div className="animate-bounce mt-10">
//                <div className="w-8 h-12 rounded-full border border-slate-200 bg-white shadow-sm flex justify-center p-1 mx-auto">
//                  <div className="w-1.5 h-3 bg-gradient-to-b from-black to-slate-500 rounded-full animate-pulse" />
//                </div>
//             </div>
//           </FadeIn>
//         </section>

//         {/* Infinite Drag Scroll Gallery */}
//         <section className="relative z-20 bg-[#030303]">
//           <div className="text-center pt-16 pb-6 px-4">
//             <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-3">Visual Journey</p>
//             <h2 className="font-syne text-4xl md:text-6xl font-bold text-white tracking-tighter">Achivements  .</h2>
//             <p className="text-white/40 text-sm mt-3 font-light">Drag or scroll to explore &mdash; it&apos;s infinite.</p>
//           </div>
//           <DraggableContainer variant="masonry">
//             <GridBody>
//               {ACHIEVEMENT_IMAGES.map((image) => (
//                 <GridItem
//                   key={image.id}
//                   className="relative h-54 w-36 md:h-96 md:w-64"
//                 >
//                   <img
//                     src={image.src}
//                     alt={image.alt}
//                     className="pointer-events-none absolute h-full w-full object-cover"
//                   />
//                   {/* Hover overlay with title + description */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 gap-1.5">
//                     <span className="text-white text-sm font-bold leading-snug font-syne">{image.alt}</span>
//                     <span className="text-white/70 text-[11px] font-light leading-snug line-clamp-2">{image.description}</span>
//                   </div>
//                 </GridItem>
//               ))}
//             </GridBody>
//           </DraggableContainer>
//         </section>

//         {/* Featured In Marquee Section */}
//         <section className="relative z-20 py-24 bg-white overflow-hidden border-b border-slate-100">
//           <FadeIn direction="up">
//             <div className="text-center mb-12">
//               <p className="text-sm font-bold tracking-widest uppercase text-slate-400">
//                 Featured In Leading Publications
//               </p>
//             </div>
//           </FadeIn>
          
//           <div className="relative flex overflow-hidden">
//             <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
//             <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
            
//             <motion.div
//               animate={{ x: ["0%", "-50%"] }}
//               transition={{
//                 duration: 25,
//                 ease: "linear",
//                 repeat: Infinity,
//               }}
//               className="flex items-center gap-24 whitespace-nowrap px-12"
//             >
//               {[...Array(2)].map((_, i) => (
//                 <div key={i} className="flex items-center gap-24">
//                   <span className="font-syne text-4xl font-bold text-slate-300 hover:text-black transition-colors cursor-pointer">Aaj Tak</span>
//                   <span className="font-syne text-4xl font-bold text-slate-300 hover:text-black transition-colors cursor-pointer">New 18</span>
//                   <span className="font-syne text-4xl font-bold text-slate-300 hover:text-black transition-colors cursor-pointer">Danik Jagran</span>
//                   <span className="font-syne text-4xl font-bold text-slate-300 hover:text-black transition-colors cursor-pointer">RAMP</span>
//                   <span className="font-syne text-4xl font-bold text-slate-300 hover:text-black transition-colors cursor-pointer">IIT Kanpur</span>
//                   <span className="font-syne text-4xl font-bold text-slate-300 hover:text-black transition-colors cursor-pointer">Google</span>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </section>

//         <Testimonial />

//         <CTA />

//       </div>
//     </LenisDiv>
//   );
// }
