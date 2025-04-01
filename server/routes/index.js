const { Router } = require("express");
const product = require("./product.js");
const scrape = require("./scrape.js");

const router = Router();

router.use("/products", product);
router.use("/scrape", scrape);

module.exports = router;
