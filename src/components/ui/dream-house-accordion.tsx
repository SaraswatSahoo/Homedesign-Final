import React, { useState } from "react";

type AccordionItemType = {
  id: number;
  title: string;
  imageUrl: string;
};

// --- Data for the image accordion ---
const accordionItems: AccordionItemType[] = [
  {
    id: 1,
    title: 'Luxury Villa Suite',
    imageUrl: '/DreamHouse/house1.jpg',
  },
  {
    id: 2,
    title: 'Modern Kitchen Design',
    imageUrl: '/DreamHouse/house2.jpg',
  },
  {
    id: 3,
    title: 'Elegant Living Room',
    imageUrl: '/DreamHouse/house3.jpg',
  },
  {
    id: 4,
    title: 'Premium Workspace',
    imageUrl: '/DreamHouse/house4.jpg',
  }
];

type AccordionItemProps = {
  item: AccordionItemType;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave?: () => void;
};

// --- Accordion Item Component ---
const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out shadow-xl
        h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]
        ${isActive 
          ? 'w-[250px] xs:w-[280px] sm:w-[320px] md:w-[380px] lg:w-[450px] xl:w-[500px]' 
          : 'w-14 xs:w-16 sm:w-18 md:w-20'
        }
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover block z-0"
        loading="eager"
        decoding="async"
        onLoad={() => {
          console.log(`Image loaded successfully: ${item.title}`);
        }}
        onError={(e) => {
          console.error(`Image failed to load: ${item.imageUrl}`);
          const target = e.currentTarget as HTMLImageElement;
          target.onerror = null;
          target.src = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error';
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}></div>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white font-semibold whitespace-nowrap z-20
          transition-all duration-300 ease-in-out
          text-sm xs:text-base sm:text-lg md:text-xl
          ${
            isActive
              ? 'bottom-4 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 rotate-0'
              : 'w-auto text-left bottom-16 xs:bottom-20 sm:bottom-22 md:bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};


// --- Main App Component ---
export function DreamHouseShowcase() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-advance every 3.5s when not paused
  React.useEffect(() => {
    const t = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((s) => (s + 1) % accordionItems.length);
      }
    }, 1500);
    return () => clearInterval(t);
  }, [isPaused]);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white font-sans">
      <section className="container mx-auto px-4 py-8 sm:py-10 md:py-16 lg:py-20 xl:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-12">
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tighter">
              Discover Your Perfect Dream Home
            </h1>
            <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              Experience exceptional homes where modern design meets timeless elegance. Each space is thoughtfully crafted to elevate your lifestyle.
            </p>
            <div className="mt-6 sm:mt-7 md:mt-8 flex gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#contact"
                className="inline-block bg-gray-900 text-white font-semibold px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-base"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-row items-center justify-center gap-2 xs:gap-3 sm:gap-4 overflow-x-auto p-2 sm:p-3 md:p-4">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => { handleItemHover(index); setIsPaused(true); }}
                  onMouseLeave={() => { setIsPaused(false); }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DreamHouseShowcase;