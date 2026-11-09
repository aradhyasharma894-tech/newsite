import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ContactSection = () => {
  return (
    <footer id="contact" className="bg-foreground text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="text-black">Road2</span>
              <span className="text-green-500">Resell</span>
            </div>
            <p className="text-gray-300">
              Sell iPhones, laptops, tablets, cameras, and other electronics in Toronto GTA.
              Get instant cash for electronics at your doorstep. Convenient, safe, and eco-friendly electronics pickup in GTA.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>

            <div className="flex items-center space-x-3 text-gray-300">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Toronto GTA – Electronics Pickup Available</span>
            </div>

            {/* Clickable Phone */}
            <a
              href="tel:+19426603737"
              className="flex items-center space-x-3 text-gray-300 hover:text-primary transition-colors"
            >
              <Phone className="h-5 w-5 text-primary flex-shrink-0" />
              <span>+1 942 660 3737</span>
            </a>

            {/* Clickable Email */}
            <a
              href="mailto:road2reselltoronto@gmail.com"
              className="flex items-center space-x-3 text-gray-300 hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5 text-primary flex-shrink-0" />
              <span>road2reselltoronto@gmail.com</span>
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-gray-300">
            <button
              onClick={() =>
                document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
              }
              className="block w-full text-left hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() =>
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
              }
              className="block w-full text-left hover:text-primary transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() =>
                document.getElementById("get-quote")?.scrollIntoView({ behavior: "smooth" })
              }
              className="block w-full text-left hover:text-primary transition-colors"
            >
              Get Quote
            </button>
            <button
              onClick={() =>
                document.getElementById("terms")?.scrollIntoView({ behavior: "smooth" })
              }
              className="block w-full text-left hover:text-primary transition-colors"
            >
              Terms & Conditions
            </button>
          </div>

          {/* CTA Only (no social icons) */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get Started</h3>
            <Button
              variant="hero"
              className="w-full"
              onClick={() =>
                document.getElementById("get-quote")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Your Free Quote
            </Button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>
            &copy; 2025{" "}
            <span className="text-black">Road2</span>
            <span className="text-green-500">Resell</span>. All rights reserved.
            Sell iPhones and electronics in Toronto GTA with instant cash.
          </p>
        </div>
      </div>
    </footer>
  );
};