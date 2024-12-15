# AI Clothing Search Platform

## Overview

A Next.js application that allows users to upload an image of a clothing item and find similar products across multiple e-commerce platforms using AI-powered image matching.

## Features

- Image upload with drag-and-drop support
- AI-powered clothing item matching
- Multi-store product search
- Advanced filtering options
- Responsive design

## Prerequisites

- Node.js 18+
- npm or yarn
- API keys for Amazon, Flipkart, eBay product APIs

## Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/yourusername/clothing-search-app.git
cd clothing-search-app
```markdown
```

2.Install dependencies

```bash
npm install
# or
yarn install
```

3.Set up environment variables
Create a `.env` file with the following:

```AMAZON_API_KEY=your_amazon_api_key
FLIPKART_API_KEY=your_flipkart_api_key
EBAY_API_KEY=your_ebay_api_key
```

4.Run the development server

```bash
npm run dev
# or
yarn dev
```

## Deployment

- Configure environment variables in your deployment platform
- Use `npm run build` to create a production build
- Deploy to Vercel, Netlify, or your preferred platform

## Technologies Used

- Next.js 14
- React
- TensorFlow.js
- Tailwind CSS
- Axios
- React Dropzone

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new PR
