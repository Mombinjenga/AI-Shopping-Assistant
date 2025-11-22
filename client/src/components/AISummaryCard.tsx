import { Sparkles, TrendingUp, DollarSign, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AISummaryCardProps {
  query: string;
  summary: string;
  insights: string[];
}

export default function AISummaryCard({ query, summary, insights }: AISummaryCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10 bg-primary">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Sparkles className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl" data-testid="text-ai-summary-title">
              AI Shopping Assistant
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1" data-testid="text-search-query">
              Results for "{query}"
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed" data-testid="text-ai-summary">
          {summary}
        </p>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Key Insights:</h4>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2" data-testid={`text-insight-${index}`}>
                {index === 0 && <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />}
                {index === 1 && <DollarSign className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />}
                {index === 2 && <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />}
                <span className="text-sm text-foreground">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
