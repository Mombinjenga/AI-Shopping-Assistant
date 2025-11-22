import ProductCard from "../ProductCard";
import speakerImage from "@assets/generated_images/bluetooth_speaker_product.png";

export default function ProductCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ProductCard
        id="1"
        name="Premium Wireless Bluetooth Speaker"
        price="89.99"
        originalPrice="129.99"
        rating={4.5}
        reviewCount={342}
        store="Amazon"
        imageUrl={speakerImage}
        category="Electronics"
      />
    </div>
  );
}
