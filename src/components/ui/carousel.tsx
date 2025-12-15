import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
  type EmblaCarouselType as CarouselApi,
} from "embla-carousel-react";
import { cn } from "@/lib/utils";

type CarouselContextType = {
  carouselRef: UseEmblaCarouselType[0];
  api: CarouselApi | undefined;
} & React.HTMLAttributes<HTMLDivElement>;

const CarouselContext = React.createContext<CarouselContextType | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within <Carousel>");
  }
  return context;
}

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: Parameters<typeof useEmblaCarousel>[0];
  setApi?: (api: CarouselApi) => void;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, opts, setApi, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(opts);

    React.useEffect(() => {
      if (api && setApi) {
        setApi(api);
      }
    }, [api, setApi]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api ?? undefined,
        }}
      >
        <div
          ref={ref}
          className={cn("relative", className)}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex -ml-4",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "min-w-0 shrink-0 grow-0 basis-full pl-4",
      className
    )}
    {...props}
  />
));
CarouselItem.displayName = "CarouselItem";

export { Carousel, CarouselContent, CarouselItem, type CarouselApi };


