import { AnimatedCarousel } from "../ui/logo-carousel";

export default function WhyChooseUs() {

    const partnerLogos = [
        { src: "https://cdn.worldvectorlogo.com/logos/react-2.svg", alt: "React" },
        { src: "https://cdn.worldvectorlogo.com/logos/next-js.svg", alt: "Next.js" },
        { src: "https://cdn.worldvectorlogo.com/logos/vercel.svg", alt: "Vercel" },
        { src: "https://cdn.worldvectorlogo.com/logos/typescript.svg", alt: "TypeScript" },
        { src: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg", alt: "Tailwind CSS" },
        { src: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg", alt: "Stripe" },
        { src: "https://cdn.worldvectorlogo.com/logos/notion-2.svg", alt: "Notion" },
        { src: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg", alt: "GitHub" },
        { src: "https://cdn.worldvectorlogo.com/logos/figma-icon-one-color.svg", alt: "Figma" },
        { src: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg", alt: "Framer Motion" },
        { src: "https://cdn.worldvectorlogo.com/logos/storybook-1.svg", alt: "Storybook" },
        { src: "https://cdn.worldvectorlogo.com/logos/sanity.svg", alt: "Sanity" },
      ];

    return (
        <div className="w-full items-center justify-center">
            <AnimatedCarousel 
                title="Why Choose Us ?"
                logos={partnerLogos.map(logo => logo.src)}
                autoPlay={true}
                autoPlayInterval={2000}
                itemsPerViewMobile={3}
                itemsPerViewDesktop={5}
                spacing="gap-4 sm:gap-6 md:gap-8"
                padding="py-10 sm:py-14 md:py-16 lg:py-10 px-4 sm:px-6"
                logoContainerWidth="w-20 xs:w-24 sm:w-28 md:w-32 lg:w-36"
                logoContainerHeight="h-12 xs:h-14 sm:h-16 md:h-18"
                logoImageWidth="w-auto"
                logoImageHeight="h-6 xs:h-7 sm:h-8 md:h-9"
                containerClassName="bg-transparent"
            />
        </div>
    )
}