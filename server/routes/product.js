const { Router } = require("express");
const ProductSchema = require("../models/ProductSchema");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await ProductSchema.find().sort({ scrapedAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await ProductSchema.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
