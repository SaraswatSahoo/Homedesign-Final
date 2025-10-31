import { HeroCollage } from "../ui/modern-hero-section";

export default function HeroSection() {

    const stats = [
        { value: '3,888,846+', label: 'Users Trusted' },
        { value: '16,015,507+', label: 'Designs Available' },
      ];
    
      const unsplashImages = [
        // Central Image: Portrait
        "/LandingPage/HeroSection1.jpg",
        // Top-Left
        "/LandingPage/HeroSection2.jpg",
        // Top-Right
        "/LandingPage/HeroSection3.jpg",
        // Bottom-Right
        "/LandingPage/HeroSection7.jpg",
        // Far-Right (Sunflowers)
        "/LandingPage/HeroSection5.jpg",
        // Bottom-Left (Product)
        "/LandingPage/HeroSection6.jpg",
        // Far-Left (Rainbow)
        "/LandingPage/HeroSection4.jpg",
      ];

    return(
        <div className="w-[98%]">
            <HeroCollage
                title={
                <>
                    Beyond Blueprints. <span className="text-[#99582a]">Inside Your Future.</span>
                </>
                }
                subtitle="Don't just imagine it. Walk through your perfectly designed home in stunning 3D and virtual reality."
                stats={stats}
                images={unsplashImages}
                className="rounded-[20px] shadow-lg"
            />
        </div>
    )
}