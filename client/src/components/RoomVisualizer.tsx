import { Upload, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import armchairImage from "@assets/generated_images/velvet_armchair_product.png";

const furnitureOptions = [
  { id: "1", name: "Velvet Armchair", image: armchairImage, price: "$899" },
];

export default function RoomVisualizer() {
  const { toast } = useToast();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [visualizedImage, setVisualizedImage] = useState<string | null>(null);
  const [selectedFurniture, setSelectedFurniture] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setVisualizedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedFile || selectedFurniture.length === 0) {
      return;
    }

    setIsGenerating(true);
    
    try {
      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("furnitureItems", JSON.stringify(
        selectedFurniture.map(id => {
          const furniture = furnitureOptions.find(f => f.id === id);
          return furniture?.name || "";
        })
      ));

      const response = await fetch("/api/visualize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate visualization");
      }

      const data = await response.json();
      setVisualizedImage(data.processedImageUrl);
      
      toast({
        title: "Visualization Complete!",
        description: "Your AI-generated room visualization is ready.",
      });
    } catch (error) {
      console.error("Visualization error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate visualization",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleFurniture = (id: string) => {
    setSelectedFurniture((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" data-testid="text-upload-title">
              Upload Room Photo
            </h3>
            {!uploadedImage ? (
              <label
                htmlFor="room-upload"
                className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-border rounded-lg cursor-pointer hover-elevate active-elevate-2"
                data-testid="label-upload-area"
              >
                <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 10MB
                </p>
                <input
                  id="room-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  data-testid="input-room-upload"
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Uploaded room"
                  className="w-full h-80 object-cover rounded-lg"
                  data-testid="img-uploaded-room"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setUploadedImage(null);
                    setUploadedFile(null);
                    setVisualizedImage(null);
                  }}
                  data-testid="button-remove-image"
                >
                  Remove
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" data-testid="text-result-title">
              {visualizedImage ? "AI Visualization" : "Preview"}
            </h3>
            <div className="h-80 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {!uploadedImage ? (
                <p className="text-sm text-muted-foreground" data-testid="text-no-image">
                  Upload a room photo to get started
                </p>
              ) : visualizedImage ? (
                <img
                  src={visualizedImage}
                  alt="AI generated visualization"
                  className="w-full h-full object-cover"
                  data-testid="img-visualization-result"
                />
              ) : (
                <p className="text-sm text-muted-foreground" data-testid="text-select-furniture">
                  Select furniture and click Generate
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4" data-testid="text-furniture-selector-title">
            Select Furniture to Visualize
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {furnitureOptions.map((furniture) => (
              <div
                key={furniture.id}
                onClick={() => toggleFurniture(furniture.id)}
                className={`cursor-pointer rounded-lg border-2 p-3 hover-elevate active-elevate-2 ${
                  selectedFurniture.includes(furniture.id)
                    ? "border-primary"
                    : "border-border"
                }`}
                data-testid={`card-furniture-${furniture.id}`}
              >
                <div className="aspect-square bg-muted rounded-md mb-2 overflow-hidden">
                  <img
                    src={furniture.image}
                    alt={furniture.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium text-center">{furniture.name}</p>
                <p className="text-xs text-muted-foreground text-center">
                  {furniture.price}
                </p>
                {selectedFurniture.includes(furniture.id) && (
                  <Badge variant="default" className="w-full mt-2 justify-center">
                    Selected
                  </Badge>
                )}
              </div>
            ))}
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!uploadedImage || selectedFurniture.length === 0 || isGenerating}
            className="w-full"
            size="lg"
            data-testid="button-generate-visualization"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating AI Visualization...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate AI Visualization
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
