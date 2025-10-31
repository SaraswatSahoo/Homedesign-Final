"use client";

import { useEffect, useState } from "react";
import type { FC } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TextRoll } from "./text-roll";

interface AnimatedCarouselProps {
  title?: string;
  logoCount?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  logos?: string[] | null;
  containerClassName?: string;
  titleClassName?: string;
  carouselClassName?: string;
  logoClassName?: string;
  itemsPerViewMobile?: number;
  itemsPerViewDesktop?: number;
  spacing?: string;
  padding?: string;
  logoContainerWidth?: string;
  logoContainerHeight?: string;
  logoImageWidth?: string;
  logoImageHeight?: string;
  logoMaxWidth?: string;
  logoMaxHeight?: string;
}

export const AnimatedCarousel: FC<AnimatedCarouselProps> = ({
  title = "Trusted by thousands of businesses worldwide",
  logoCount = 15,
  autoPlay = true,
  autoPlayInterval = 1000,
  logos = null,
  containerClassName = "",
  titleClassName = "",
  carouselClassName = "",
  logoClassName = "",
  itemsPerViewMobile = 4,
  itemsPerViewDesktop = 6,
  spacing = "gap-6 sm:gap-8 md:gap-10",
  padding = "py-12 sm:py-16 lg:py-10 px-4 sm:px-6",
  logoContainerWidth = "w-32 sm:w-40 md:w-48",
  logoContainerHeight = "h-16 sm:h-20 md:h-24",
  logoImageWidth = "w-full",
  logoImageHeight = "h-full",
  logoMaxWidth = "",
  logoMaxHeight = "",
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api || !autoPlay) {
      return;
    }

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, autoPlayInterval);

    return () => clearTimeout(timer);
  }, [api, current, autoPlay, autoPlayInterval]);

  const logoItems = logos || Array.from({ length: logoCount }, (_, i) => `https://th.bing.com/th/id/R.4aa108082e7d3cbd55add79f84612aaa?rik=I4dbPhSe%2fbHHSg&riu=http%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&ehk=ewmaCOvP0Ji4QViEJnxSdlrYUrTSTWhi8nZ9XdyCgAI%3d&risl=&pid=ImgRaw&r=0100x100?text=Logo+${i + 1}`);

  const logoImageSizeClasses = `${logoImageWidth} ${logoImageHeight} ${logoMaxWidth} ${logoMaxHeight}`.trim();

  return (
    <div className={`w-full ${padding} bg-background ${containerClassName}`}>
      <div className="container mx-auto">
        <div className={`flex flex-col ${spacing}`}>
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tighter lg:max-w-xl font-regular text-left ml-1 sm:ml-2 md:ml-3 text-foreground ${titleClassName}`}>
            <TextRoll>{title}</TextRoll>
          </h2>
          
          <div className="w-full overflow-hidden">
            <Carousel setApi={setApi} className={`w-full ${carouselClassName}`}>
              <CarouselContent className="-ml-1 sm:-ml-2 md:-ml-3">
                {logoItems.map((logo, index) => (
                  <CarouselItem 
                    className={`pl-1 sm:pl-2 md:pl-3 basis-1/2 xs:basis-1/3 sm:basis-1/${itemsPerViewMobile} lg:basis-1/${itemsPerViewDesktop}`} 
                    key={index}
                  >
                    <div className={`flex rounded-md ${logoContainerWidth} ${logoContainerHeight} items-center justify-center p-1 sm:p-2 md:p-3 hover:bg-accent transition-colors ${logoClassName}`}>
                      <img 
                        src={typeof logo === 'string' ? logo : logo}
                        alt={`Logo ${index + 1}`}
                        className={`${logoImageSizeClasses} object-contain filter brightness-0 dark:brightness-0 dark:invert`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Case1 = (props: React.ComponentProps<typeof AnimatedCarousel>) => {
  return <AnimatedCarousel {...props} />;
};