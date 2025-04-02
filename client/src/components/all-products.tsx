import { useProducts } from "@/app/api/useProducts";
import { Product } from "@/types/product";
import ProductCard from "./product-card";

const AllProducts = () => {
  const { data, isLoading, status, isError } = useProducts();

  console.log("Data:", data);

  return (
    <div className="flex min-h-screen max-w-[1280px] flex-col items-start justify-start px-4 pb-16 pt-24 text-white">
      <h1 className="px-1 text-left font-playfair text-3xl text-foreground">
        All Products
      </h1>
      <div className="mt-4 w-full">
        {status === "error" && <p>Error: {isError}</p>}
        {isLoading && (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="hover:shadow-black-40 h-[209px] w-[387px] animate-pulse rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-md shadow-[#777]/10 transition-all duration-700 hover:shadow-[#777]/20 dark:shadow-black/20"
              />
            ))}
          </ul>
        )}
        {status === "success" && (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.products.map((product: Product, index: number) => (
              <ProductCard key={index} {...product} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
