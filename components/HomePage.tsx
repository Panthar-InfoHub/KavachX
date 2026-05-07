'use client';
import LenisDiv from "@/components/LenisDiv";
import { AiEdgeBoxSection } from "@/components/ai-edge-box-section";
import { SurakshaKavachSection } from "@/components/suraksha-kavach-section";
import Testimonial from "@/components/testimonial";
import Faq from "@/components/faq";
import CTA from "@/components/cta";

const HomeComponent = () => {
    return (
        <LenisDiv>
            {/* Premium Sections (These naturally scroll AFTER the 300vh spacer, gliding smoothly over the fixed hero) */}
            <div className="relative z-10 bg-[#fdfdfd] pt-12 md:pt-6 rounded-t-[3rem] w-full shadow-[0_-1px_0_rgba(255,255,255,0.1)]" >
                <SurakshaKavachSection />
                <AiEdgeBoxSection />
                <Testimonial />
                <Faq />
                <CTA />
            </div>
        </LenisDiv>
    )
}

export default HomeComponent