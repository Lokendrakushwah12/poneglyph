import { Product } from "@/types/product";

// interface Product {
//   productName: string;
//   rating: number;
//   numRatings: number;
//   sellingPrice: string;
//   totalDiscount: string;
//   bankOffers: string[];
//   aboutItem: string;
//   productInfo: string[];
//   productImages: string[];
//   manufacturerImages: string[];
//   aiReviewSummary: string;
// }

const ProductCard = (data: Product) => {
  console.log("ProductCard Data:", data);
  return (
    <div className="rounded-xl border bg-muted/10 p-4">
      <h2 className="text-xl font-semibold">{data.productName}</h2>
      <p className="text-sm text-muted-foreground">Rating: {data.rating}</p>
      <p className="text-sm text-muted-foreground">Number of Ratings: {data.numRatings}</p>
      <p className="text-sm text-muted-foreground">Selling Price: {data.sellingPrice}</p>
      <p className="text-sm text-muted-foreground">Total Discount: {data.totalDiscount}</p>
      <div className="mt-2 flex text-sm gap-1 text-muted-foreground">
        <h3 className="font-semibold">Total Bank Offers:</h3>
        <ul className="list-disc">{data?.bankOffers?.length}</ul>
      </div>
    </div>
  );
};

export default ProductCard;
