import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import heroImage from "@assets/generated_images/hero_lifestyle_shopping_scene.png";

const categories = ["Electronics", "Furniture", "Fashion", "Home & Garden", "Sports"];

export default function HeroSection({ onSearch }: { onSearch?: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-8 h-8 text-primary" />
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white"
            style={{ fontFamily: "Sora, sans-serif" }}
            data-testid="text-hero-title"
          >
            AI-Powered Shopping
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-8" data-testid="text-hero-subtitle">
          Find the best products at the best prices with intelligent search
        </p>

        <form onSubmit={handleSearch} className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 md:p-6 shadow-2xl border border-white/20">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="What are you looking for? Try 'wireless headphones' or 'comfortable office chair'"
              className="h-14 md:h-16 pl-12 pr-4 text-base md:text-lg bg-white dark:bg-gray-900 border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-hero-search"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full mt-4"
            data-testid="button-hero-search"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Search with AI
          </Button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <span className="text-sm text-gray-300">Popular:</span>
          {categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 cursor-pointer"
              data-testid={`badge-category-${category.toLowerCase()}`}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
