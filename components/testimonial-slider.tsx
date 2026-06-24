"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote: "KavachX has completely transformed the way we monitor workplace safety. Their intelligent safety technology gives us real-time visibility and faster incident response.",
    author: "Sahgal Yadav",
    role: "CEO LessPay",
    company: "",
    image: "/testimonial/saghal.jpg",
  },
  {
    id: 2,
    quote: "With KavachX, safety management became smarter, faster, and more efficient. The dashboard and alert system are extremely useful for industrial operations.",
    author: "CK Tiwari",
    role: "Founder IM Global",
    company: "",
    image: "testimonial/ck.png",
  },
  // {
  //   id: 3,
  //   quote: "The team behind KavachX truly understands how technology can solve real-world safety challenges.",
  //   author: "Elena Voss",
  //   role: "Art Director",
  //   company: "Pixel & Co",
  //   image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D$0",
  // },
]

export default function TestimonialsEditorial() {
  const [active, setActive] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleChange = (index: number) => {
    if (index === active || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActive(index)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 300)
  }

  const handlePrev = () => {
    const newIndex = active === 0 ? testimonials.length - 1 : active - 1
    handleChange(newIndex)
  }

  const handleNext = () => {
    const newIndex = active === testimonials.length - 1 ? 0 : active + 1
    handleChange(newIndex)
  }

  const current = testimonials[active]

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#111] tracking-tight mb-4">
          Trusted by Safety Leaders Worldwide
        </h2>
        <p className="text-base md:text-lg text-[#888] font-light max-w-xl mx-auto">
          Hear from the teams who rely on KavachX to protect what matters most.
        </p>
      </div>

      {/* Large index number */}
      <div className="flex items-start gap-8">
        <span
          className="text-[120px] font-light leading-none text-[#111]/10 select-none transition-all duration-500"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 pt-6">
          {/* Quote */}
          <blockquote
            className={`text-2xl md:text-3xl font-light leading-relaxed text-[#111] tracking-tight transition-all duration-300 ${isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
              }`}
          >
            {current.quote}
          </blockquote>

          {/* Author info with hover reveal */}
          <div
            className={`mt-10 group cursor-default transition-all duration-300 delay-100 ${isTransitioning ? "opacity-0" : "opacity-100"
              }`}
          >
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#111]/10 group-hover:ring-[#111]/30 transition-all duration-300">
                <Image
                  src={current.image || "/placeholder.svg"}
                  alt={current.author}
                  fill
                  unoptimized
                  className="object-cover transition-all duration-500"
                />
              </div>
              <div>
                <p className="font-medium text-[#111]">{current.author}</p>
                <p className="text-sm text-[#666]">
                  {current.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - vertical line selector */}
      <div className="mt-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button key={index} onClick={() => handleChange(index)} className="group relative py-4">
                <span
                  className={`block h-px transition-all duration-500 ease-out ${index === active
                    ? "w-12 bg-[#111]"
                    : "w-6 bg-[#111]/20 group-hover:w-8 group-hover:bg-[#111]/40"
                    }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs text-[#888] tracking-widest uppercase">
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full text-[#111]/40 hover:text-[#111] hover:bg-[#111]/5 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full text-[#111]/40 hover:text-[#111] hover:bg-[#111]/5 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
