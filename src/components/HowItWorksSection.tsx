import { MessageSquare, Truck, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export const HowItWorksSection = () => {
  const images = [
    "/how1.png",
    "/how2.png",
    "/how3.png",
    "/how4.png",
    "/how5.png",
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            How{" "}
            <span className="text-black">Road2</span>
            <span className="text-green-600">Resell</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get cash for your electronics in Toronto GTA in three simple steps.
          </p>
        </div>

        {/* 🔥 SLIDER */}
        <div className="relative max-w-4xl mx-auto mb-16">

          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={images[current]}
              loading="lazy"
              alt="How Road2Resell works"
              className="w-full h-auto object-contain transition-all duration-500"
            />
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2 rounded-full"
          >
            <ChevronLeft />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2 rounded-full"
          >
            <ChevronRight />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 w-2 rounded-full cursor-pointer ${
                  current === index ? "bg-green-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

        </div>

        {/* Steps (keep same) */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">1. Tell Us What You Have</h3>
            <p className="text-muted-foreground">
              Fill out our quick form with your device details.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">2. We Come to You</h3>
            <p className="text-muted-foreground">
              We pick up from your doorstep.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">3. Instant Cash or Trade</h3>
            <p className="text-muted-foreground">
              Get paid instantly.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};