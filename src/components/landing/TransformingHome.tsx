"use client";
import { DicedHeroSection } from '../ui/diced-hero-section';

export default function TransformingHome() {
  return (
    <DicedHeroSection
      topText="✨ Dream · Design · Transform"
      mainText="Reimagine Your Home"
      subMainText="Where dreams take shape and spaces come alive. Our expert craftsmen blend timeless elegance with modern innovation, creating personalized sanctuaries that tell your unique story. Let's craft your perfect space together."
      buttonText="Start Your Journey"
      slides={[
        {
          title: "Modern Kitchen",
          image: "/transformingHomes/kitchen.jpg",
        },
        {
          title: "Luxurious Bathroom",
          image: "/transformingHomes/bathroom.jpg",
        },
        {
          title: "Cozy Bedroom",
          image: "/transformingHomes/bedroom.jpg",
        },
        {
          title: "Stylish Furniture",
          image: "/transformingHomes/furniture.jpg",
        },
      ]}
      onMainButtonClick={() => console.log("Main button clicked")}
      onGridImageHover={index => console.log(`Grid image ${index} hovered`)}
      onGridImageClick={index => console.log(`Grid image ${index} clicked`)}
      topTextStyle={{ 
        color: "#333333",
        fontSize: "1.2rem" 
      }}
      mainTextStyle={{
        fontSize: "3.5rem",
        gradient: "linear-gradient(45deg, #000000, #333333)",
      }}
      subMainTextStyle={{ 
        color: "#2A2A2A",
        fontSize: "1.1rem",
        gradient: "linear-gradient(45deg, #1A1A1A, #333333)" 
      }}
      buttonStyle={{
        backgroundColor: "#99582a",
        color: "#FFE6A7",
        borderRadius: "2rem",
        hoverColor: "#b76b3a",
        hoverForeground: "#FFE6A7",
      }}
      separatorColor="var(--diced-hero-section-separator)"
      maxContentWidth="1190px"
      mobileBreakpoint={910}
      fontFamily="Arial, sans-serif"
    />
  );
}