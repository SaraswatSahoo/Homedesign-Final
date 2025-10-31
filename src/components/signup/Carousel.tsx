import { HeroSection } from "../ui/feature-carousel";

export default function Carousel() {
    const images = [
        {
            src: "/Signup/Carousel1.jpg",
            alt: "Carousel Image 1",
        },
        {
            src: "/Signup/Carousel2.jpg",
            alt: "Carousel Image 2",
        },
        {
            src: "/Signup/Carousel3.jpg",
            alt: "Carousel Image 3",
        },
        {
            src: "/Signup/Carousel4.jpg",
            alt: "Carousel Image 4",
        },
        {
            src: "/Signup/Carousel5.jpg",
            alt: "Carousel Image 5",
        }
    ]

    const title = (
        <div className="text-center px-4">
          Step Inside Your Imagination
        </div>
    );

    return (
        <div className="h-full w-full">
            <HeroSection 
                images={images}
                title={title}
                subtitle="Create your free profile and start the immersive walkthrough of your custom home today."
                className="min-h-[400px] lg:min-h-screen py-8 lg:py-0"
            />
        </div>
    )
}