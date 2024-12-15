import axios from 'axios';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  productUrl: string;
  storeName: string;
}

export async function fetchProductsFromEcommerceSites(): Promise<Product[]> {
  const sources = [
    fetchAmazonProducts(),
    fetchFlipkartProducts(),
    fetchEbayProducts()
  ];

  // Combine products from multiple sources
  const allProducts = await Promise.all(sources);
  return allProducts.flat();
}

async function fetchAmazonProducts(): Promise<Product[]> {
  try {
    const response = await axios.get('https://api.amazon.com/products', {
      params: {
        category: 'clothing',
        limit: 100
      },
      headers: {
        'Authorization': `Bearer ${process.env.AMAZON_API_KEY}`
      }
    });

    return response.data.products.map(transformAmazonProduct);
  } catch (error) {
    console.error('Amazon fetch error', error);
    return [];
  }
}

async function fetchFlipkartProducts(): Promise<Product[]> {
  try {
    const response = await axios.get('https://api.flipkart.com/v1/products', {
      params: {
        category: 'clothing',
        limit: 100
      },
      headers: {
        'Authorization': `Bearer ${process.env.FLIPKART_API_KEY}`
      }
    });

    return response.data.products.map(transformFlipkartProduct);
  } catch (error) {
    console.error('Flipkart fetch error', error);
    return [];
  }
}

async function fetchEbayProducts(): Promise<Product[]> {
  try {
    const response = await axios.get('https://api.ebay.com/buy/browse/v1/item_summary/search', {
      params: {
        category_ids: 'clothing',
        limit: 100
      },
      headers: {
        'Authorization': `Bearer ${process.env.EBAY_API_KEY}`
      }
    });

    return response.data.itemSummaries.map(transformEbayProduct);
  } catch (error) {
    console.error('eBay fetch error', error);
    return [];
  }
}

function transformAmazonProduct(product: any): Product {
  return {
    id: product.asin,
    name: product.title,
    price: product.price,
    imageUrl: product.images[0],
    productUrl: `https://amazon.com/dp/${product.asin}`,
    storeName: 'Amazon'
  };
}

function transformFlipkartProduct(product: any): Product {
  return {
    id: product.productId,
    name: product.title,
    price: product.price,
    imageUrl: product.images[0],
    productUrl: `https://www.flipkart.com/p/${product.productId}`,
    storeName: 'Flipkart'
  };
}

function transformEbayProduct(product: any): Product {
  return {
    id: product.itemId,
    name: product.title,
    price: product.price.value,
    imageUrl: product.image.imageUrl,
    productUrl: product.itemWebUrl,
    storeName: 'eBay'
  };
}