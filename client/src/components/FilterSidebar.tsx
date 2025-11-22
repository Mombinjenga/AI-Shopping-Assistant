import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const categories = ["Electronics", "Furniture", "Fashion", "Home & Garden", "Sports"];
const stores = ["Amazon", "eBay", "Walmart", "Target", "Best Buy"];

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleStoreToggle = (store: string) => {
    setSelectedStores((prev) =>
      prev.includes(store) ? prev.filter((s) => s !== store) : [...prev, store]
    );
  };

  const handleReset = () => {
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setSelectedStores([]);
    console.log("Filters reset");
  };

  const handleApply = () => {
    console.log("Applying filters:", {
      priceRange,
      categories: selectedCategories,
      stores: selectedStores,
    });
  };

  return (
    <div className="sticky top-20 space-y-6 p-4 bg-card rounded-lg border border-card-border">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-4" data-testid="text-filter-title">
          Filters
        </h3>
      </div>

      <div>
        <Label className="text-sm font-semibold mb-3 block">Price Range</Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={500}
          step={10}
          className="mb-2"
          data-testid="slider-price-range"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span data-testid="text-price-min">${priceRange[0]}</span>
          <span data-testid="text-price-max">${priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-sm font-semibold mb-3 block">Category</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
                data-testid={`checkbox-category-${category.toLowerCase()}`}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-sm font-semibold mb-3 block">Store</Label>
        <div className="space-y-2">
          {stores.map((store) => (
            <div key={store} className="flex items-center gap-2">
              <Checkbox
                id={`store-${store}`}
                checked={selectedStores.includes(store)}
                onCheckedChange={() => handleStoreToggle(store)}
                data-testid={`checkbox-store-${store.toLowerCase()}`}
              />
              <Label htmlFor={`store-${store}`} className="text-sm cursor-pointer">
                {store}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={handleReset} data-testid="button-reset-filters">
          Reset
        </Button>
        <Button className="flex-1" onClick={handleApply} data-testid="button-apply-filters">
          Apply
        </Button>
      </div>
    </div>
  );
}
