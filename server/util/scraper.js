const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

const scrapeAmazonProduct = async (url) => {
  if (!url.includes("amazon.in")) {
    throw new Error("URL must be from Amazon India");
  }

  const executablePath = await chromium.executablePath();
  console.log(`Starting to scrape: ${url}`);
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
    // headless: true,
    // args: [
    //   "--no-sandbox",
    //   "--disable-setuid-sandbox",
    //   "--disable-blink-features=AutomationControlled",
    // ],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    async function autoScroll(page) {
      let previousHeight;
      while (true) {
        previousHeight = await page.evaluate("document.body.scrollHeight");
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");

        let newHeight = await page.evaluate("document.body.scrollHeight");
        if (newHeight === previousHeight) break; // Stop when no more reviews are loaded
      }
    }

    await autoScroll(page);

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const productData = await page.evaluate(() => {
      const getText = (selector, defaultValue = "") => {
        const element = document.querySelector(selector);
        return element ? element.textContent.trim() : defaultValue;
      };

      const productName = getText("#productTitle");

      const ratingText = getText("span.a-icon-alt");
      const rating = ratingText ? ratingText.split(" ")[0] : "";

      const numRatingsText = getText("#acrCustomerReviewText");
      const numRatings = numRatingsText
        ? numRatingsText.replace(/[^0-9]/g, "")
        : "";

      const sellingPrice = getText(".a-price .a-offscreen");

      const totalDiscount =
        getText(".savingsPercentage") || getText(".a-size-base.a-color-price");

      const aboutItem = Array.from(
        document.querySelectorAll("#feature-bullets li:not(.aok-hidden)")
      )
        .map((el) => el.textContent.trim())
        .filter((text) => text && !text.includes("See more"));

      const productInfo = {};
      const productInfoSection = document.querySelector(
        "#productDetails_techSpec_section_1"
      );
      console.log("Product Info Section:", productInfoSection);
      if (productInfoSection) {
        productInfoSection.querySelectorAll("tr").forEach((row) => {
          const key = row.querySelector("th")?.innerText.trim();
          const value = row.querySelector("td")?.innerText.trim();
          if (key && value) {
            productInfo[key] = value;
          }
        });
      }
      console.log("Product Info:", productInfo);

      const productImages = Array.from(
        document.querySelectorAll("#altImages .a-button-text img")
      )
        .map((img) => img.src)
        .filter(
          (src) => src && !src.includes("play-icon") && !src.includes("video")
        );

      const manufacturerImages = Array.from(
        document.querySelectorAll(
          ".celwidget.aplus-module.premium-module-2-fullbackground-image img"
        )
      ).map((img) => img.getAttribute("data-src") || img.getAttribute("src"));

      const topReviews = Array.from(
        document.querySelectorAll(".review-text-content span")
      ).map((review) => review.textContent.trim());

      return {
        productName,
        rating,
        numRatings,
        sellingPrice,
        totalDiscount,
        aboutItem,
        productInfo,
        productImages,
        manufacturerImages,
        topReviews,
      };
    });

    let bankOffers = [];

    const bankOfferSectionExists = await page.evaluate(() => {
      return !!document.querySelector("#itembox-InstantBankDiscount");
    });

    if (bankOfferSectionExists) {
      console.log("Bank offer section found, attempting click on 14 offers...");

      await page.evaluate(() => {
        const offersLink = document.querySelector(
          "#itembox-InstantBankDiscount .vsx-offers-count"
        );
        if (offersLink) {
          offersLink.click();
          console.log("Clicked on the 14 offers link.");
        }
      });

      await page
        .waitForSelector(".vsx-offers-desktop-lv__item", { timeout: 5000 })
        .catch(() => console.log("Offers sidebar didn't load within timeout"));

      bankOffers = await page.evaluate(() => {
        const offers = [];
        document
          .querySelectorAll(".vsx-offers-desktop-lv__item")
          .forEach((element) => {
            const titleElement = element.querySelector(
              ".a-size-base-plus.a-text-bold"
            );
            const descriptionElement = element.querySelector(
              "p.a-spacing-mini.a-size-base-plus"
            );

            if (titleElement && descriptionElement) {
              offers.push({
                title: titleElement.textContent.trim(),
                description: descriptionElement.textContent.trim(),
              });
            }
          });
        return offers;
      });
    } else {
      console.log("No bank offer section found.");
    }

    productData.bankOffers = bankOffers;

    console.log("Scraping completed successfully");
    return productData;
  } catch (error) {
    console.error("Scraping error:", error);
    throw error;
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeAmazonProduct };
