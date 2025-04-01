const { Router } = require("express");
const ProductSchema = require("../models/ProductSchema");
const { scrapeAmazonProduct } = require("../util/scraper");
const { generateReviewSummary } = require("../util/gemini");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;
    const products = await scrapeAmazonProduct(url);
    const reviewSummary = await generateReviewSummary(products.topReviews);
    const newProduct = new ProductSchema({
      productName: products.productName,
      rating: products.rating,
      numRatings: products.numRatings,
      sellingPrice: products.sellingPrice,
      totalDiscount: products.totalDiscount,
      bankOffers: products.bankOffers,
      aboutItem: products.aboutItem,
      productInfo: products.productInfo,
      productImages: products.productImages,
      manufacturerImages: products.manufacturerImages,
      aiReviewSummary: reviewSummary,
      url,
    });

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
