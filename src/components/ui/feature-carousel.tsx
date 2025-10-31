import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ArrowButton } from '@/components/ui/arrow-button'; // Assuming you have a Button component from shadcn/ui
import { cn } from '@/lib/utils'; // Assuming you have a utility for class names

// --- TYPES ---
interface HeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  subtitle: string;
  images: { src: string; alt: string; }[];
}

// --- HERO SECTION COMPONENT ---
export const HeroSection = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ title, subtitle, images, className, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(Math.floor(images.length / 2));

    const handleNext = React.useCallback(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    
    React.useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 4000);
        return () => clearInterval(timer);
    }, [handleNext]);

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-background text-foreground p-4',
          className
        )}
        {...props}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0 opacity-20" aria-hidden="true">
            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(128,90,213,0.3),rgba(255,255,255,0))]"></div>
            <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,123,255,0.3),rgba(255,255,255,0))]"></div>
        </div>

        {/* Content */}
        <div className="z-10 flex w-full flex-col items-center text-center space-y-6 sm:space-y-8 md:space-y-12">
          {/* Header Section */}
          <div className="space-y-3 sm:space-y-4 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter max-w-4xl">
              {title}
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground px-4">
              {subtitle}
            </p>
          </div>

          {/* Main Showcase Section */}
          <div className="relative w-full h-[280px] sm:h-[320px] md:h-[400px] lg:h-[450px] flex items-center justify-center">
            {/* Carousel Wrapper */}
            <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
              {images.map((image, index) => {
                const offset = index - currentIndex;
                const total = images.length;
                let pos = (offset + total) % total;
                if (pos > Math.floor(total / 2)) {
                  pos = pos - total;
                }

                const isCenter = pos === 0;
                const isAdjacent = Math.abs(pos) === 1;

                return (
                  <div
                    key={index}
                    className={cn(
                      'absolute transition-all duration-500 ease-in-out',
                      'flex items-center justify-center',
                      'w-32 h-64 xs:w-40 xs:h-80 sm:w-48 sm:h-96 md:w-56 md:h-[400px] lg:w-64 lg:h-[450px]'
                    )}
                    style={{
                      transform: `
                        translateX(${(pos) * 35}%) 
                        scale(${isCenter ? 1 : isAdjacent ? 0.85 : 0.7})
                        rotateY(${(pos) * -10}deg)
                      `,
                      zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                      opacity: isCenter ? 1 : isAdjacent ? 0.4 : 0,
                      filter: isCenter ? 'blur(0px)' : 'blur(4px)',
                      visibility: Math.abs(pos) > 1 ? 'hidden' : 'visible',
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="object-cover w-full h-full rounded-2xl sm:rounded-3xl border-2 border-foreground/10 shadow-2xl"
                    />
                  </div>
                );
              })}
            </div>
            
            {/* Navigation Buttons */}
            <ArrowButton
              variant="outline"
              size="icon"
              className="absolute left-1 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 sm:h-10 sm:w-10 z-20 bg-background/50 backdrop-blur-sm"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </ArrowButton>
            <ArrowButton
              variant="outline"
              size="icon"
              className="absolute right-1 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 sm:h-10 sm:w-10 z-20 bg-background/50 backdrop-blur-sm"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </ArrowButton>
          </div>
        </div>
      </div>
    );
  }
);

HeroSection.displayName = 'HeroSection';
