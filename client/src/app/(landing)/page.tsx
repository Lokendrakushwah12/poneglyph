"use client";
import AllProducts from "@/components/all-products";
import ProductDetails from "@/components/ui/product-details";
import type { Product } from "@/types/product";
import { useState } from "react";
import Hero from "./_components/Hero";

const HomePage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProductFetched = (productData: Product) => {
    setProduct(productData);
    console.log("Product fetched:", productData);
    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pb-16 pt-24 text-white">
      <Hero onProductFetched={handleProductFetched} />

      {product && (
        <div className="container mt-12 w-full max-w-5xl">
          <ProductDetails product={product} />
        </div>
      )}
      <AllProducts />
    </main>
  );
};

export default HomePage;
