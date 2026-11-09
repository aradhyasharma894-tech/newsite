import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TermsSection = () => {
  const policies = [
    {
      title: "For Buyers",
      items: [
        "<strong>7-Day No-Questions-Asked Refund:</strong> You may return any purchased electronics within 7 days for a full refund if they are in the same condition as sold and with the receipt. This applies to items such as iPhones, laptops, tablets, and cameras.",
        "After 7 days, all sales are final, unless a separate warranty was provided.",
        "Warranty (if given) covers basic functionality only, not damage, misuse, or normal wear and tear."
      ]
    },
    {
      title: "Seller Terms & Conditions",
      items: [
        "You must own the device – Only sell items that belong to you. Stolen, lost, or unpaid-financed devices are not accepted.",
        "Device condition – We buy new or used including iPhones, laptops, tablets, and cameras in Toronto GTA. Items may be refused after inspection.",
        "Payment – Once we inspect and agree on a price, payment is made on the spot in cash. Get <strong>instant cash for electronics in Toronto</strong>.",
        "ID verification – A valid photo ID may be required. Serial numbers/IMEIs are checked to prevent fraud.",
        "No returns – Once payment is made, the device belongs to Road2Resell."
      ]
    }
  ];

  return (
    <section id="terms" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-black">Road2</span>
            <span className="text-green-600">Resell</span> –{" "}
            <span className="text-primary">Warranty, Refund & Terms</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We buy, sell, and trade electronics in Toronto GTA. Our policies ensure a safe, transparent, 
            and fast experience, whether you're selling iPhones, laptops, tablets, or cameras.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {policies.map((policy, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-center">{policy.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {policy.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2">
                        <span className="text-primary text-lg">•</span>
                        <span
                          className="text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: item }}
                        />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
