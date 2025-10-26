import HeroSection from "@/components/landing/HeroSection";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
    return(
        <div className=" w-screen flex flex-col justify-center items-center bg-[#ffe6a7] gap-4 p-4">
            <Navbar />
            <HeroSection />
            <WhyChooseUs />
        </div>
    )
}