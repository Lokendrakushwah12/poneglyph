interface Product {
  productName: string;
  rating: number;
  numRatings: number;
  sellingPrice: string;
  totalDiscount: string;
  bankOffers: {
    offerName: string;
    offerDetails: string;
  };
  aboutItem: string;
  productInfo: string[];
  productImages: string[];
  manufacturerImages: string[];
  aiReviewSummary: string;
}

export type { Product };

