const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
  },
  numRatings: {
    type: String,
  },
  sellingPrice: {
    type: String,
  },
  totalDiscount: {
    type: String,
  },
  bankOffers: {
    type: [String],
  },
  aboutItem: {
    type: [String],
  },
  productInfo: {
    type: Object,
  },
  productImages: {
    type: [String],
  },
  manufacturerImages: {
    type: [String],
  },
  aiReviewSummary: {
    type: String,
  },
  scrapedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
