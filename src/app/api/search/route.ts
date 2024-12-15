import { NextApiRequest, NextApiResponse } from "next";
import ClothingMatcher from "../../lib/aiMatching";
import { fetchProductsFromEcommerceSites } from "../../lib/ecommerceFetcher";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse the incoming request body
    const { imageFeatures } = req.body;

    if (!imageFeatures || !Array.isArray(imageFeatures)) {
      return res.status(400).json({ error: "Invalid or missing image features" });
    }

    // Fetch products from multiple e-commerce sources
    const products = await fetchProductsFromEcommerceSites();

    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    // Match products based on image features
    const matches = await Promise.all(
      products.map(async (product) => {
        try {
          const productFeatures = await ClothingMatcher.extractFeatures(product.imageUrl);

          // Calculate similarity (cosine similarity)
          const similarity = calculateCosineSimilarity(Array.from(imageFeatures), Array.from(productFeatures));

          return {
            ...product,
            similarity,
          };
        } catch (err) {
          console.error(`Error processing product: ${product.id}`, err);
          return null; // Skip products with errors
        }
      })
    );

    // Filter out any null results from errors
    const filteredMatches = matches.filter((match) => match !== null);

    // Sort and return top matches
    const topMatches = filteredMatches
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10);

    return res.status(200).json({ matches: topMatches });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Utility function for cosine similarity
function calculateCosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same length");
  }

  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0; // Avoid division by zero
  }

  return dotProduct / (magnitudeA * magnitudeB);
}
