import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import AISummaryCard from "@/components/AISummaryCard";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import type { SearchResponse } from "@shared/schema";

export default function SearchResults() {
  const [location] = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const searchParams = window.location.search;
    const params = new URLSearchParams(searchParams);
    const q = params.get("q") || "";
    setQuery(q);
  }, [location]);

  const { data, isLoading, error } = useQuery<SearchResponse>({
    queryKey: ["/api/search", query],
    enabled: !!query,
  });

  if (!query) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">No search query provided</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <aside className="hidden lg:block">
            <FilterSidebar />
          </aside>

          <main>
            {isLoading ? (
              <>
                <div className="mb-6">
                  <Skeleton className="h-48 w-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-96 w-full" />
                  ))}
                </div>
              </>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive">Failed to load search results</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {error instanceof Error ? error.message : "Unknown error"}
                </p>
              </div>
            ) : data ? (
              <>
                <AISummaryCard
                  query={data.query}
                  summary={data.aiSummary.summary}
                  insights={data.aiSummary.insights}
                />

                <div className="mb-4">
                  <h2 className="text-2xl font-semibold" data-testid="text-results-count">
                    {data.products.length} Products Found
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {data.products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}
