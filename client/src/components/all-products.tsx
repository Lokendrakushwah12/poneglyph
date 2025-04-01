import { useProducts } from "@/app/api/useProducts";
import ProductCard from "./product-card";

const AllProducts = () => {
  const { data, status, isError } = useProducts();

  console.log("Data:", data);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start pb-16 pt-24 text-white">
      <h1 className="text-3xl text-foreground font-bold">All Products</h1>
      <div className="container mt-12 w-full max-w-5xl">
        {status === "error" && <p>Error: {isError}</p>}
        {status === "success" && (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.products.map((product: any, index: number) => (
              <ProductCard key={index} {...product} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
