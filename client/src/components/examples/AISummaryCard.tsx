import AISummaryCard from "../AISummaryCard";

export default function AISummaryCardExample() {
  return (
    <div className="p-8 max-w-3xl">
      <AISummaryCard
        query="wireless headphones"
        summary="I found 24 wireless headphones across multiple retailers. The best options combine premium audio quality with comfort for extended wear. Prices range from $59 to $349, with the sweet spot around $150-$200 for excellent noise cancellation and battery life."
        insights={[
          "Most popular: Sony WH-1000XM5 with industry-leading noise cancellation",
          "Best value: Beats Studio Pro at $179 (originally $349) - 49% savings",
          "Highest rated: Bose QuietComfort Ultra with 4.8 stars from 2,891 reviews",
        ]}
      />
    </div>
  );
}
