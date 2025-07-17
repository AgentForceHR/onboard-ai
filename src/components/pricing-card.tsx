import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  features: PricingFeature[];
  popular?: boolean;
  buttonText?: string;
}

export function PricingCard({
  name,
  description,
  price,
  features,
  popular = false,
  buttonText = "Get Started",
}: PricingCardProps) {
  return (
    <Card
      className={`w-full ${
        popular ? "border-primary shadow-md relative" : ""
      }`}
      hover
    >
      {popular && (
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/3">
          <div className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Most Popular
          </div>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <span className="text-4xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-muted-foreground ml-1">/month</span>}
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <div
                className={`h-5 w-5 rounded-full flex items-center justify-center ${
                  feature.included ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                {feature.included ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <span className="text-xs">-</span>
                )}
              </div>
              <span
                className={`text-sm ${
                  feature.included ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={popular ? "hero" : "default"}
          size="lg"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}