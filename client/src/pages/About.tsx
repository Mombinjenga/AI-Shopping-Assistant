import { Sparkles, Search, DollarSign, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Sora, sans-serif" }}
            data-testid="text-about-title"
          >
            About ShopAI
          </h1>
          <p className="text-xl text-muted-foreground" data-testid="text-about-subtitle">
            Your intelligent shopping companion powered by AI
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <p className="text-foreground leading-relaxed">
            ShopAI revolutionizes online shopping by combining artificial intelligence
            with real-time price comparison across multiple retailers. Our mission is
            to help you make smarter purchasing decisions by finding the best products
            at the best prices.
          </p>
          <p className="text-foreground leading-relaxed">
            Whether you're looking for electronics, furniture, fashion, or home goods,
            our AI-powered search understands your needs and delivers personalized
            recommendations that save you time and money.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2" data-testid="text-feature-ai">
                    AI-Powered Search
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Natural language processing understands exactly what you're looking for
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2" data-testid="text-feature-multi-store">
                    Multi-Store Comparison
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Compare prices across Amazon, eBay, Walmart, and more in seconds
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2" data-testid="text-feature-best-deals">
                    Best Deals Guaranteed
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI identifies the best value options and highlights savings opportunities
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2" data-testid="text-feature-visualizer">
                    Room Visualizer
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    See how furniture looks in your space before making a purchase
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card border border-card-border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4" data-testid="text-mission-title">
            Our Mission
          </h2>
          <p className="text-foreground leading-relaxed max-w-2xl mx-auto">
            We believe shopping should be simple, transparent, and empowering. By
            leveraging cutting-edge AI technology, we're making it easier than ever
            to find exactly what you need at prices you'll love.
          </p>
        </div>
      </div>
    </div>
  );
}
