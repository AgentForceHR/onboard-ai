import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  gradient?: boolean;
}

export function FeatureCard({ icon, title, description, gradient = false }: FeatureCardProps) {
  return (
    <Card gradient={gradient} hover className="h-full">
      <CardHeader>
        <div className="w-12 h-12 mb-2 rounded-md overflow-hidden">
          <img 
            src={icon} 
            alt={`${title} icon`} 
            className="w-full h-full object-cover" 
          />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground"></p>
      </CardContent>
    </Card>
  );
}