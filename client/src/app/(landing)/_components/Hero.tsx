"use client";

import { useScrapeProduct } from "@/app/api/useScrapeProduct";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Product } from "@/types/product";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Hero = ({
  onProductFetched,
}: {
  onProductFetched: (product: Product) => void;
}) => {
  const [url, setUrl] = useState("");

  const { mutate, isPending, isError, error } = useScrapeProduct();

  const handleScrape = () => {
    if (!url.includes("amazon.in")) {
      alert("Please enter a valid Amazon India product URL");
      return;
    }

    mutate(url, {
      onSuccess: (product: Product) => {
        onProductFetched(product);
        setUrl("");
      },
      onError: (error: Error) => {
        console.error("Error:", error);
      },
    });
  };

  return (
    <section className="container relative flex flex-col items-center gap-4 py-12 text-center text-foreground">
      <h1 className="font-playfair text-5xl font-medium tracking-tighter text-foreground md:text-7xl lg:leading-[1.1]">
        Poneglyph
      </h1>

      <p className="max-w-xl text-balance text-sm text-muted-foreground md:text-base">
        Poneglyph is a web scraping and analytics platform specifically designed
        for Amazon India products.
      </p>

      <div className="w-full max-w-xl space-y-2">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Amazon India Smart TV URL here..."
          className="w-full"
        />

        {isError && (
          <p className="text-sm text-red-500">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
        )}

        <Button
          variant="default"
          className="w-full sm:w-auto"
          onClick={handleScrape}
          disabled={isPending}
        >
          {isPending ? (
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
