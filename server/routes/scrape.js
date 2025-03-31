const { Router } = require("express");
const ProductSchema = require("../models/ProductSchema");
const { scrapeAmazonProduct } = require("../util/scraper");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;
    const products = await scrapeAmazonProduct(url);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
