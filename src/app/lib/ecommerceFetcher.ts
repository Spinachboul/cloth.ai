import axios from 'axios';

interface Product {
    id: string;
    name: string;
    price: number;
    imageURL: string;
    productURL : string;
    storeName: string;
}

export async function fetchProducts(): Promise<Product[]> {
    const sources = [
        fetchAmazonProducts(),
        fetchEbayProducts(),
        fetchFlipkartProducts()
    ];

    // combine the products from multiple sources
    const allProducts = await Promise.all(sources);
    return allProducts.flat(); // flat() is used to flatten the array of arrays
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

// similar function for flipkart
// similar function for ebay

async function fetchEbayProducts(): Promise<Product[]> {
    try {
      const response = await axios.get('https://api.ebay.com/products', {
        params: {
          category: 'clothing',
          limit: 100
        },
        headers: {
          'Authorization': `Bearer ${process.env.EBAY_API_KEY}`
        }
      });
  
      return response.data.products.map(transformEbayProduct);
    } catch (error) {
      console.error('Ebay fetch error', error);
      return [];
    }
  }

async function fetchFlipkartProducts(): Promise<Product[]> {
    try {
      const response = await axios.get('https://api.flipkart.com/products', {
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

  function transformAmazonProduct(product: any) : Product {
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        imageURL: product.imageURL,
        productURL: product.productURL,
        storeName: 'Amazon'
    }
  }

  function transformEbayProduct(product: any) : Product {
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        imageURL: product.imageURL,
        productURL: product.productURL,
        storeName: 'Ebay'
    }
  }

  function transformFlipkartProduct(product: any) : Product {
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        imageURL: product.imageURL,
        productURL: product.productURL,
        storeName: 'Flipkart'
    }
  }

