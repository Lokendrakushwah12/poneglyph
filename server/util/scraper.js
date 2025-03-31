const puppeteer = require("puppeteer");

scrapeAmazonProduct = async (url) => {
  if (!url.includes("amazon.in")) {
    throw new Error("URL must be from Amazon India");
  }

  console.log(`Starting to scrape: ${url}`);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768 });

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const productData = await page.evaluate(() => {
      const getText = (selector, defaultValue = "") => {
        const element = document.querySelector(selector);
        return element ? element.textContent.trim() : defaultValue;
      };

      // Helper function to get multiple elements text
      const getMultipleTexts = (selector) => {
        const elements = document.querySelectorAll(selector);
        return Array.from(elements).map((el) => el.textContent.trim());
      };

      // Extract product name
      const productName = getText("#productTitle");

      // Extract rating
      const ratingText = getText("span.a-icon-alt");
      const rating = ratingText ? ratingText.split(" ")[0] : "";

      // Extract number of ratings
      const numRatingsText = getText("#acrCustomerReviewText");
      const numRatings = numRatingsText
        ? numRatingsText.replace(/[^0-9]/g, "")
        : "";

      // Extract selling price
      const sellingPrice = getText(".a-price .a-offscreen");

      // Extract total discount
      const discountElement = document.querySelector(".savingsPercentage");
      const totalDiscount = discountElement
        ? discountElement.textContent.trim()
        : "";

      // Extract bank offers
      const bankOfferElements = document.querySelectorAll(
        "#bankoffer_feature_div .a-box-inner"
      );
      const bankOffers = Array.from(bankOfferElements).map((el) =>
        el.textContent.trim()
      );

      // Extract about this item
      const aboutItemElements = document.querySelectorAll(
        "#feature-bullets li:not(.aok-hidden)"
      );
      const aboutItem = Array.from(aboutItemElements)
        .map((el) => el.textContent.trim())
        .filter((text) => text && !text.includes("See more"));

      // Extract product information
      const productInfoElements = document.querySelectorAll(
        ".a-section.a-spacing-medium .a-container tr"
      );
      const productInfo = {};
      productInfoElements.forEach((row) => {
        const cells = row.querySelectorAll("td, th");
        if (cells.length >= 2) {
          const key = cells[0].textContent.trim();
          const value = cells[1].textContent.trim();
          if (key && value) {
            productInfo[key] = value;
          }
        }
      });

      // Extract product images
      const imageElements = document.querySelectorAll(
        "#altImages .a-button-text img"
      );
      const productImages = Array.from(imageElements)
        .map((img) => img.src)
        .filter(
          (src) => src && !src.includes("play-icon") && !src.includes("video")
        );

      // Extract manufacturer images
      const manufacturerImages = [];
      const manufacturerSection = document.querySelector("#productDescription");
      if (manufacturerSection) {
        const images = manufacturerSection.querySelectorAll("img");
        manufacturerImages.push(...Array.from(images).map((img) => img.src));
      }

      // Extract AI generated customer review summary (if available)
      let aiReviewSummary = "";
      const aiSummaryElement = document.querySelector("#cr-lightbox-title");
      if (aiSummaryElement) {
        aiReviewSummary = aiSummaryElement.textContent.trim();
      }

      return {
        productName,
        rating,
        numRatings,
        sellingPrice,
        totalDiscount,
        bankOffers,
        aboutItem,
        productInfo,
        productImages,
        manufacturerImages,
        aiReviewSummary,
      };
    });

    console.log("Scraping completed successfully");
    return productData;
  } catch (error) {
    console.error("Scraping error:", error);
    throw error;
  } finally {
    await browser.close();
  }
};

module.exports = {
  scrapeAmazonProduct,
};
