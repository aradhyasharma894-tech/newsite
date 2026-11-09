import { Check, Clock, Shield, Truck, Leaf } from "lucide-react";

export const WhyChooseUsSection = () => {
  const benefits = [
    {
      icon: Truck,
      title: "Convenience",
      description: "No need to travel — we offer electronics pickup in Toronto GTA at your doorstep, on your preferred schedule."
    },
    {
      icon: Clock,
      title: "Instant Payment",
      description: "Get cash instantly for your devices in Toronto GTA. No waiting for checks or bank transfers."
    },
    {
      icon: Shield,
      title: "Trustworthy",
      description: "Safe, transparent deals with no hidden fees. We securely wipe your devices after purchase."
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "We give electronics a second life and reduce e-waste in Toronto GTA for a greener planet."
    }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Choose{" "}
            <span className="text-black">Road2</span>
            <span className="text-green-600">Resell</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sell iPhones, laptops, tablets, cameras, and even broken electronics in Toronto GTA safely, conveniently, and for top cash.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-card p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <benefit.icon className="h-5 w-5 text-white" />
                </div>
                <Check className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
