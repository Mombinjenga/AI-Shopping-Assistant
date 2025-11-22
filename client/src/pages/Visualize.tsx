import RoomVisualizer from "@/components/RoomVisualizer";

export default function Visualize() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1
            className="text-3xl md:text-4xl font-semibold mb-4"
            style={{ fontFamily: "Sora, sans-serif" }}
            data-testid="text-visualize-title"
          >
            Room Visualizer
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-visualize-subtitle">
            Upload a photo of your room and see how furniture looks before you buy
          </p>
        </div>

        <RoomVisualizer />
      </div>
    </div>
  );
}
