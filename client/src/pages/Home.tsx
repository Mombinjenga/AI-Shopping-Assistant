import HeroSection from "@/components/HeroSection";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  const handleSearch = (query: string) => {
    setLocation(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <HeroSection onSearch={handleSearch} />
    </div>
  );
}
