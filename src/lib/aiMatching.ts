import * as tf from '@tensorflow/tfjs';
import axios from 'axios';

// Interface for product matching
interface ProductMatch {
  id: string;
  similarity: number;
  productUrl: string;
  imageUrl: string;
  price: number;
  storeName: string;
}

class ClothingMatcher {
  private model: tf.GraphModel | null = null;

  async loadModel() {
    if (!this.model) {
      // Load a pre-trained model for feature extraction
      this.model = await tf.loadGraphModel('/models/resnet50/model.json');
    }
    return this.model;
  }

  async extractFeatures(imageUrl: string): Promise<Float32Array> {
    const model = await this.loadModel();
    
    // Preprocess image
    const img = await this.preprocessImage(imageUrl);
    
    // Extract features
    const features = model.predict(img) as tf.Tensor;
    return features.dataSync() as Float32Array;
  }

  async preprocessImage(imageUrl: string): Promise<tf.Tensor> {
    // Load image, resize, normalize
    const image = new Image();
    image.src = imageUrl;
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const img = tf.browser.fromPixels(image)
      .resizeBilinear([224, 224])
      .toFloat()
      .expandDims(0)
      .div(255.0);
    
    return img;
  }

  async findSimilarProducts(imageUrl: string): Promise<ProductMatch[]> {
    const queryFeatures = await this.extractFeatures(imageUrl);

    // Call backend service for product matching
    const response = await axios.post('/api/search', {
      imageFeatures: queryFeatures
    });

    // Sort matches by similarity
    return response.data.matches
      .sort((a: ProductMatch, b: ProductMatch) => b.similarity - a.similarity)
      .slice(0, 10); // Top 10 matches
  }
}

export default new ClothingMatcher();