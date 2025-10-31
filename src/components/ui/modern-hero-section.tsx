import React from 'react';
import { cn } from '@/lib/utils'; // Assumes a 'cn' utility for classnames

// Define the props for the component
interface HeroCollageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  subtitle: string;
  stats: { value: string; label: string }[];
  images: string[];
}

// Keyframes for the floating animation
const animationStyle = `
  @keyframes float-up {
    0% { transform: translateY(0px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
    50% { transform: translateY(-15px); box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3); }
    100% { transform: translateY(0px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
  }
  .animate-float-up {
    animation: float-up 6s ease-in-out infinite;
  }
`;

const HeroCollage = React.forwardRef<HTMLDivElement, HeroCollageProps>(
  ({ className, title, subtitle, stats, images, ...props }, ref) => {
    // We need exactly 7 images for this layout
    const displayImages = images.slice(0, 7);

    return (
      <>
        <style>{animationStyle}</style>
        <section
          ref={ref}
          className={cn(
            'relative w-full bg-background font-sans py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden',
            className
          )}
          {...props}
        >
          {/* Main Content */}
          <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground leading-tight">
              {title}
            </h1>
            <p className="mx-auto mt-3 sm:mt-4 md:mt-5 max-w-xl md:max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground px-2">
              {subtitle}
            </p>
          </div>

          {/* Image Collage - Responsive Layout */}
          <div className="relative z-0 mt-6 sm:mt-8 md:mt-10 h-[300px] xs:h-[350px] sm:h-[420px] md:h-[520px] lg:h-[600px] flex items-center justify-center px-2 sm:px-4">
            <div className="relative h-full w-full max-w-6xl">
              {/* Central Image */}
              {displayImages[0] && (
                <img
                  src={displayImages[0]}
                  alt="Main feature"
                  className="absolute left-1/2 top-1/2 h-auto w-32 xs:w-40 sm:w-48 md:w-64 lg:w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl z-20 animate-float-up"
                  style={{ animationDelay: '0s' }}
                />
              )}
              {/* Top-Left */}
              {displayImages[1] && (
                <img
                  src={displayImages[1]}
                  alt="Feature 2"
                  className="absolute left-[15%] xs:left-[18%] sm:left-[20%] md:left-[22%] top-[10%] xs:top-[12%] sm:top-[13%] md:top-[15%] h-auto w-20 xs:w-24 sm:w-32 md:w-44 lg:w-52 rounded-lg sm:rounded-xl shadow-md md:shadow-lg z-10 animate-float-up"
                  style={{ animationDelay: '-1.2s' }}
                />
              )}
              {/* Top-Right */}
              {displayImages[2] && (
                <img
                  src={displayImages[2]}
                  alt="Feature 3"
                  className="absolute right-[15%] xs:right-[18%] sm:right-[20%] md:right-[24%] top-[6%] xs:top-[8%] sm:top-[9%] md:top-[10%] h-auto w-18 xs:w-20 sm:w-28 md:w-40 lg:w-48 rounded-lg sm:rounded-xl shadow-md md:shadow-lg z-10 animate-float-up"
                  style={{ animationDelay: '-2.5s' }}
                />
              )}
              {/* Bottom-Right */}
              {displayImages[3] && (
                <img
                  src={displayImages[3]}
                  alt="Feature 4"
                  className="absolute right-[14%] xs:right-[16%] sm:right-[18%] md:right-[20%] bottom-[8%] xs:bottom-[10%] sm:bottom-[11%] md:bottom-[12%] h-auto w-24 xs:w-28 sm:w-40 md:w-52 lg:w-60 rounded-lg sm:rounded-xl shadow-md md:shadow-lg z-30 animate-float-up"
                  style={{ animationDelay: '-3.5s' }}
                />
              )}
               {/* Far-Right */}
              {displayImages[4] && (
                <img
                  src={displayImages[4]}
                  alt="Feature 5"
                  className="absolute right-[2%] xs:right-[3%] sm:right-[4%] md:right-[5%] top-1/2 -translate-y-[60%] h-auto w-20 xs:w-24 sm:w-32 md:w-44 lg:w-52 rounded-lg sm:rounded-xl shadow-md md:shadow-lg z-10 animate-float-up"
                   style={{ animationDelay: '-4.8s' }}
                />
              )}
              {/* Bottom-Left */}
              {displayImages[5] && (
                <img
                  src={displayImages[5]}
                  alt="Feature 6"
                  className="absolute left-[12%] xs:left-[14%] sm:left-[16%] md:left-[18%] bottom-[6%] xs:bottom-[8%] h-auto w-24 xs:w-28 sm:w-36 md:w-48 lg:w-56 rounded-lg sm:rounded-xl shadow-md md:shadow-lg z-30 animate-float-up"
                   style={{ animationDelay: '-5.2s' }}
                />
              )}
              {/* Far-Left */}
              {displayImages[6] && (
                <img
                  src={displayImages[6]}
                  alt="Feature 7"
                  className="absolute left-[2%] xs:left-[3%] sm:left-[4%] md:left-[5%] top-[18%] xs:top-[20%] sm:top-[22%] md:top-[25%] h-auto w-18 xs:w-20 sm:w-28 md:w-40 lg:w-48 rounded-lg sm:rounded-xl shadow-md md:shadow-lg z-10 animate-float-up"
                   style={{ animationDelay: '-6s' }}
                />
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="container relative z-10 mx-auto mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6">
            <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 sm:flex-row">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#99582a]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
);

HeroCollage.displayName = 'HeroCollage';

export { HeroCollage };