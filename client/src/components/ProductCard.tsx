import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  store: string;
  imageUrl: string;
  category: string;
}

export default function ProductCard({
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  store,
  imageUrl,
  category,
}: ProductCardProps) {
  const handleCompare = () => {
    console.log("Compare clicked for:", name);
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", name);
  };

  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer group">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          data-testid={`img-product-${name}`}
        />
        <Badge
          variant="secondary"
          className="absolute top-2 right-2"
          data-testid={`badge-store-${store}`}
        >
          {store}
        </Badge>
      </div>
      <CardContent className="p-4">
        <Badge variant="outline" className="mb-2" data-testid={`badge-category-${category}`}>
          {category}
        </Badge>
        <h3
          className="text-lg font-medium line-clamp-2 mb-2"
          data-testid={`text-product-name-${name}`}
        >
          {name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1" data-testid={`text-reviews-${reviewCount}`}>
            ({reviewCount})
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold" data-testid={`text-price-${price}`}>
            ${price}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through" data-testid={`text-original-price-${originalPrice}`}>
              ${originalPrice}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleCompare}
          data-testid={`button-compare-${name}`}
        >
          Compare Prices
        </Button>
        <Button
          size="icon"
          onClick={handleAddToCart}
          data-testid={`button-add-cart-${name}`}
        >
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
