interface BankOffer {
  offerName: string;
  offerDetails: string;
}
interface Product {
  productName: string;
  rating: number;
  numRatings: number;
  sellingPrice: string;
  totalDiscount: string;
  bankOffers: BankOffer[];
  aboutItem: string;
  productInfo: string[];
  productImages: string[];
  manufacturerImages: string[];
  aiReviewSummary: string;
}

export type { Product };