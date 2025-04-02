import type { Product } from "@/types/product";
import { CreditCard, Percent, Star, Tag } from "lucide-react";

const ProductCard = (data: Product) => {
  return (
    <div className="hover:shadow-black-40 rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-md shadow-[#777]/10 transition-all duration-300 hover:shadow-[#777]/20 dark:shadow-black/20">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          {data.productName}
        </h2>
        <div className="flex items-center gap-1 rounded-full bg-primary/80 px-2 py-1">
          <Star size={16} className="fill-yellow-500 text-yellow-500" />
          <span className="text-sm font-medium">{data.rating}</span>
          <span className="text-xs text-white/70">({data.numRatings})</span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2">
          <Tag size={18} className="text-primary" />
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold text-foreground">
              {data.sellingPrice}
            </p>
            {data.totalDiscount && (
              <div className="flex items-center gap-1">
                <Percent size={14} className="text-green-600" />
                <p className="text-sm font-medium text-green-600">
                  {data.totalDiscount} off
                </p>
              </div>
            )}
          </div>
        </div>

        {data?.bankOffers?.length > 0 && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <CreditCard size={18} className="text-primary" />
            <div>
              <p className="text-sm font-medium">
                {data.bankOffers.length} Bank{" "}
                {data.bankOffers.length === 1 ? "Offer" : "Offers"} Available
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
