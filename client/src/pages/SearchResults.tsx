import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import AISummaryCard from "@/components/AISummaryCard";
import ProductCard, { type ProductCardProps } from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import speakerImage from "@assets/generated_images/bluetooth_speaker_product.png";
import chairImage from "@assets/generated_images/office_chair_product.png";
import watchImage from "@assets/generated_images/smart_watch_product.png";
import headphonesImage from "@assets/generated_images/premium_headphones_product.png";
import lampImage from "@assets/generated_images/designer_table_lamp.png";
import mugsImage from "@assets/generated_images/designer_coffee_mugs.png";

const mockProducts: ProductCardProps[] = [
  {
    id: "1",
    name: "Premium Wireless Bluetooth Speaker",
    price: "89.99",
    originalPrice: "129.99",
    rating: 4.5,
    reviewCount: 342,
    store: "Amazon",
    imageUrl: speakerImage,
    category: "Electronics",
  },
  {
    id: "2",
    name: "Ergonomic Office Chair with Lumbar Support",
    price: "299.00",
    originalPrice: "449.00",
    rating: 4.7,
    reviewCount: 1256,
    store: "Walmart",
    imageUrl: chairImage,
    category: "Furniture",
  },
  {
    id: "3",
    name: "Smart Fitness Watch with Heart Rate Monitor",
    price: "199.99",
    originalPrice: "249.99",
    rating: 4.6,
    reviewCount: 892,
    store: "Best Buy",
    imageUrl: watchImage,
    category: "Electronics",
  },
  {
    id: "4",
    name: "Wireless Noise-Canceling Headphones",
    price: "179.00",
    originalPrice: "349.00",
    rating: 4.8,
    reviewCount: 2891,
    store: "Amazon",
    imageUrl: headphonesImage,
    category: "Electronics",
  },
  {
    id: "5",
    name: "Modern Table Lamp with Brass Finish",
    price: "79.99",
    rating: 4.4,
    reviewCount: 156,
    store: "Target",
    imageUrl: lampImage,
    category: "Home & Garden",
  },
  {
    id: "6",
    name: "Ceramic Coffee Mug Set (2 Pack)",
    price: "24.99",
    originalPrice: "34.99",
    rating: 4.5,
    reviewCount: 432,
    store: "eBay",
    imageUrl: mugsImage,
    category: "Home & Garden",
  },
];

export default function SearchResults() {
  const [location] = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1]);
    const q = params.get("q") || "";
    setQuery(q);
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <aside className="hidden lg:block">
            <FilterSidebar />
          </aside>

          <main>
            <AISummaryCard
              query={query || "wireless headphones"}
              summary="I found 24 wireless headphones across multiple retailers. The best options combine premium audio quality with comfort for extended wear. Prices range from $59 to $349, with the sweet spot around $150-$200 for excellent noise cancellation and battery life."
              insights={[
                "Most popular: Sony WH-1000XM5 with industry-leading noise cancellation",
                "Best value: Beats Studio Pro at $179 (originally $349) - 49% savings",
                "Highest rated: Bose QuietComfort Ultra with 4.8 stars from 2,891 reviews",
              ]}
            />

            <div className="mb-4">
              <h2 className="text-2xl font-semibold" data-testid="text-results-count">
                {mockProducts.length} Products Found
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
