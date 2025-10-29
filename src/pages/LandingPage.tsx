import HeroSection from "@/components/landing/HeroSection";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Navbar from "@/components/Navbar";
import DreamHouse from "@/components/landing/DreamHouse";
import FAQ from "@/components/landing/FAQ";
import Steps from "@/components/landing/Steps";
import Services from "@/components/landing/Services";
import TransformingHome from "@/components/landing/TransformingHome";
import CallToAction from "@/components/landing/CallToAction";
export default function LandingPage() {
    return(
        <div className=" w-screen flex flex-col justify-center items-center bg-[#ffe6a7] gap-4 p-4">
            
            <Navbar />


            <HeroSection />
            <WhyChooseUs />
            <DreamHouse />
            <Steps />
            <Services />
            <TransformingHome />
            <CallToAction />
            <FAQ />
        </div>
    )
}