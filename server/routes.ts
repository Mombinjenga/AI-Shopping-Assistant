import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import OpenAI from "openai";
import { searchRequestSchema, type SearchResponse } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  // AI-powered product search endpoint
  app.post("/api/search", async (req, res) => {
    try {
      const validationResult = searchRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: fromZodError(validationResult.error).message 
        });
      }

      const { query } = validationResult.data;

      // Use OpenAI to interpret the search query and generate product recommendations
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an AI shopping assistant. Given a user's search query, generate:
1. A helpful summary about the product category they're searching for
2. Three key insights about what to look for when shopping for this product
3. A list of 6 realistic product recommendations with details

Format your response as JSON with this structure:
{
  "summary": "A 2-3 sentence summary about the product category and price range",
  "insights": ["insight 1", "insight 2", "insight 3"],
  "products": [
    {
      "name": "Product name",
      "description": "Brief description",
      "price": "99.99",
      "originalPrice": "149.99" (optional, only if on sale),
      "rating": 4.5,
      "reviewCount": 500,
      "store": "Amazon|eBay|Walmart|Target|Best Buy",
      "category": "Electronics|Furniture|Fashion|Home & Garden|Sports"
    }
  ]
}

Make the products realistic and varied in price. Include sale prices for some items.`
          },
          {
            role: "user",
            content: query
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      });

      const aiResponse = JSON.parse(completion.choices[0].message.content || "{}");
      
      // Generate mock image URLs for products (in production, these would be real product images)
      const productsWithImages = aiResponse.products.map((product: any, index: number) => ({
        id: `product-${Date.now()}-${index}`,
        ...product,
        imageUrl: `/api/placeholder-image?product=${encodeURIComponent(product.name)}`,
      }));

      const response: SearchResponse = {
        query,
        aiSummary: {
          summary: aiResponse.summary,
          insights: aiResponse.insights,
        },
        products: productsWithImages,
      };

      res.json(response);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ error: "Failed to process search query" });
    }
  });

  // Room visualization endpoint
  app.post("/api/visualize", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const furnitureItems = JSON.parse(req.body.furnitureItems || "[]");
      
      if (furnitureItems.length === 0) {
        return res.status(400).json({ error: "No furniture items selected" });
      }

      // Convert uploaded image to base64
      const base64Image = req.file.buffer.toString("base64");
      const imageDataUrl = `data:${req.file.mimetype};base64,${base64Image}`;

      // Use OpenAI Vision to analyze the room
      const visionResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this room image and provide a detailed description of the space, including dimensions, lighting, wall colors, and existing furniture. This will help us visualize how new furniture items would look in this space.`
              },
              {
                type: "image_url",
                image_url: { url: imageDataUrl }
              }
            ]
          }
        ],
        max_tokens: 500,
      });

      const roomAnalysis = visionResponse.choices[0].message.content;

      // Generate visualization using DALL-E
      const furnitureDescription = furnitureItems.join(", ");
      const imageResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt: `A photorealistic interior design visualization showing a modern ${roomAnalysis}. Add ${furnitureDescription} naturally placed in the room. The image should look like a professional interior design rendering with natural lighting and realistic proportions. Make it look like a real room with these furniture pieces tastefully arranged.`,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });

      const visualizedImageUrl = imageResponse.data?.[0]?.url || "";

      res.json({
        success: true,
        originalImageUrl: imageDataUrl,
        processedImageUrl: visualizedImageUrl,
        roomAnalysis,
        furnitureItems,
      });
    } catch (error) {
      console.error("Visualization error:", error);
      res.status(500).json({ error: "Failed to generate visualization" });
    }
  });

  // Placeholder image endpoint (for demo purposes)
  app.get("/api/placeholder-image", (req, res) => {
    const productName = req.query.product as string;
    // Redirect to a placeholder image service
    res.redirect(`https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=${encodeURIComponent(productName || "Product")}`);
  });

  const httpServer = createServer(app);

  return httpServer;
}
