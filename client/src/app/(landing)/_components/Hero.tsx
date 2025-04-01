"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/product";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Hero = ({
  onProductFetched,
}: {
  onProductFetched: (product: Product) => void;
}) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScrape = async () => {
    // Validate URL
    if (!url.includes("amazon.in")) {
      setError("Please enter a valid Amazon India product URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/v1/scrape", {
        url,
      });

      if (onProductFetched) {
        onProductFetched(response.data.newProduct);
      }

      setUrl("");
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.error || "Failed to decode product information"
          : "An unexpected error occurred",
      );
      console.error("Error scraping product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container relative flex flex-col items-center gap-4 py-12 text-center text-foreground">
      <h1 className="font-playfair text-4xl font-medium tracking-tighter text-foreground md:text-7xl lg:leading-[1.1]">
        Poneglyph
      </h1>

      <p className="max-w-xl text-balance text-sm text-muted-foreground md:text-base">
        Poneglyph is a web scraping and analytics platform specifically designed
        for Amazon India smart TV products. Inspired by the mysterious stone
        tablets from One Piece, this tool deciphers product pages to reveal
        comprehensive information, including specifications, pricing, and
        customer sentiment.
      </p>

      <div className="w-full max-w-xl space-y-2">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Amazon India Smart TV URL here..."
          className="w-full"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          variant="default"
          className="w-full sm:w-auto"
          onClick={handleScrape}
          disabled={loading || !url}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Decoding Product...
            </>
          ) : (
            "Decode Product"
          )}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Enter any Amazon India Smart TV product URL to extract detailed
        information
      </p>
    </section>
  );
};

export default Hero;
