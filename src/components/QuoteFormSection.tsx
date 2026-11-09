import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

interface QuoteFormSectionProps {
  selectedConsole?: string;
  selectedCondition?: string;
  estimatedPrice?: number | null;
}

export const QuoteFormSection = ({
  selectedConsole = "",
  selectedCondition = "",
  estimatedPrice = null,
}: QuoteFormSectionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [product, setProduct] = useState(selectedConsole);
  const [condition, setCondition] = useState(selectedCondition);

  // Update the form automatically when the customer changes
  // their selection in the gaming-console calculator.
  useEffect(() => {
    if (selectedConsole) {
      setProduct(selectedConsole);
    }
  }, [selectedConsole]);

  useEffect(() => {
    if (selectedCondition) {
      setCondition(selectedCondition);
    }
  }, [selectedCondition]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://formspree.io/f/myknkkld",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        // Formspree successfully received the lead.
        // Tell Google Tag Manager that a real lead was submitted.
        window.dataLayer = window.dataLayer || [];

        window.dataLayer.push({
          event: "road2resell_quote_submitted",
        });

        setSubmitted(true);
        form.reset();
      } else {
        setError(
          "Something went wrong while submitting your request. Please try again."
        );
      }
    } catch {
      setError(
        "Unable to submit your request. Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="get-quote" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center rounded-full bg-green-50 border border-green-200 px-4 py-2 mb-4">
            <span className="text-sm font-semibold text-green-700">
              Fast • Free • No obligation
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Get Your{" "}
            <span className="text-green-600">Free Cash Quote</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Tell us about your device and our team will review your details
            and contact you with a quote.
          </p>

          <p className="text-sm text-gray-500 mt-3">
            Takes less than 30 seconds to submit.
          </p>
        </div>

        {/* Direct call option */}
        <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-5 text-center">
          <p className="font-semibold text-gray-800">
            Prefer to speak with us directly?
          </p>

          <p className="text-sm text-gray-600 mt-1 mb-3">
            Call Road2Resell and tell us what device you're selling.
          </p>

          <a
            href="tel:+19426603737"
            className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700 transition"
          >
            Call Us Now
          </a>
        </div>

        {/* SUCCESS */}
        {submitted ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white text-2xl">
              ✓
            </div>

            <h3 className="text-2xl font-bold text-green-700 mb-3">
              Quote Request Received!
            </h3>

            <p className="text-green-700">
              Thank you! Our team will review your device details
              and contact you shortly.
            </p>

            <p className="text-sm text-gray-600 mt-3">
              If you would rather speak with us directly, you can also call us.
            </p>

            <a
              href="tel:+19426603737"
              className="inline-flex mt-5 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition"
            >
              Call Road2Resell
            </a>

            <div>
              <Button
                type="button"
                className="mt-4 bg-white text-green-700 border border-green-600 hover:bg-green-50"
                onClick={() => {
                  setSubmitted(false);
                  setProduct(selectedConsole);
                  setCondition(selectedCondition);
                }}
              >
                Submit Another Quote
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full border border-border rounded-md p-3"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email <span className="text-gray-400">(optional)</span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full border border-border rounded-md p-3"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="Best number to reach you"
                required
                className="w-full border-2 border-green-200 rounded-md p-3 focus:border-green-500 focus:outline-none"
              />

              <p className="text-xs text-gray-500 mt-1">
                We'll use this number to contact you about your quote.
              </p>
            </div>

            {/* Product */}
            <div>
              <label className="block text-sm font-medium mb-2">
                What are you selling?
              </label>

              <input
                type="text"
                name="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. iPhone 13, Samsung S23"
                required
                className="w-full border border-border rounded-md p-3"
              />
            </div>

            {/* Product Condition */}
            <div>
              <label className="block text-sm mb-2 font-medium">
                Product Condition
              </label>

              <select
                name="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
                className="w-full border border-border rounded-md p-3 bg-white"
              >
                <option value="">Select Condition</option>
                <option value="New Sealed">New Sealed</option>
                <option value="Flawless">Flawless</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            {/* Gaming Calculator Information */}
            {selectedConsole && estimatedPrice !== null && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                <p className="text-sm font-semibold text-green-700 mb-2">
                  Gaming Console Price Estimate
                </p>

                <div className="text-gray-800 space-y-1 text-sm">
                  <p>
                    <strong>Console:</strong>{" "}
                    {selectedConsole}
                  </p>

                  <p>
                    <strong>Condition:</strong>{" "}
                    {selectedCondition}
                  </p>

                  <p>
                    <strong>Estimated Cash Offer:</strong>{" "}
                    <span className="text-green-700 font-bold">
                      ${estimatedPrice.toLocaleString("en-CA")} CAD
                    </span>
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Final value is subject to physical inspection and
                  verification.
                </p>
              </div>
            )}

            {/* Hidden fields for Formspree */}
            {selectedConsole && (
              <input
                type="hidden"
                name="calculator_console"
                value={selectedConsole}
              />
            )}

            {selectedCondition && (
              <input
                type="hidden"
                name="calculator_condition"
                value={selectedCondition}
              />
            )}

            {estimatedPrice !== null && (
              <input
                type="hidden"
                name="estimated_cash_offer"
                value={`$${estimatedPrice} CAD`}
              />
            )}

            {/* Storage */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Storage{" "}
                <span className="text-gray-400">(if applicable)</span>
              </label>

              <input
                type="text"
                name="storage"
                placeholder="e.g. 128GB"
                className="w-full border border-border rounded-md p-3"
              />
            </div>

            {/* Hidden anti-spam */}
            <input
              type="text"
              name="_gotcha"
              style={{ display: "none" }}
            />

            {/* Error */}
            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 p-4 text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-lg py-6 bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
            >
              {isSubmitting
                ? "Sending Your Request..."
                : "Get My Cash Quote"}
            </Button>

            <p className="text-center text-xs text-gray-500">
              Free quote • No obligation • Your information is only used to
              contact you about your request
            </p>

          </form>
        )}
      </div>
    </section>
  );
};