import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@/types/product";
import Image from "next/image";
import { useState } from "react";

const ProductDetails = ({ product }: { product: Product | null }) => {
  const [selectedImage, setSelectedImage] = useState(
    product?.productImages?.[0] ?? "",
  );

  if (!product) return null;

  const {
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
  } = product;

  return (
    <Card className="w-full overflow-hidden bg-card/30 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold md:text-3xl">
              {productName}
            </CardTitle>
            <CardDescription>
              <div className="flex items-center gap-3 text-sm">
                {rating && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <span className="text-yellow-500">★</span> {rating}
                  </Badge>
                )}
                {numRatings && <span>{numRatings} ratings</span>}
              </div>
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{sellingPrice}</p>
            {totalDiscount && (
              <p className="text-sm font-medium text-green-500">
                {totalDiscount} off
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-none">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="offers">Offers & Reviews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                {selectedImage && (
                  <div className="mb-4 overflow-hidden rounded-lg border">
                    <Image
                      width={500}
                      height={500}
                      src={selectedImage}
                      alt={productName}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                )}
                {productImages && productImages.length > 1 && (
                  <div className="flex flex-wrap gap-2">
                    {productImages.slice(0, 5).map((img, index) => (
                      <div
                        key={index}
                        className={`h-16 w-16 cursor-pointer overflow-hidden rounded border-2 ${
                          selectedImage === img
                            ? "border-primary"
                            : "border-muted"
                        }`}
                        onClick={() => setSelectedImage(img)}
                      >
                        <Image
                          width={500}
                          height={500}
                          src={img}
                          alt={`Thumbnail ${index}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                    {productImages.length > 5 && (
                      <div className="flex h-16 w-16 items-center justify-center rounded border-2 border-muted bg-muted/50 text-xs">
                        +{productImages.length - 5}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {aboutItem && aboutItem.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">
                      About This Item
                    </h3>
                    <ul className="list-inside list-disc space-y-2 text-sm">
                      {Array.isArray(aboutItem) &&
                        aboutItem.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </div>
                )}

                {aiReviewSummary && (
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">
                      AI Review Summary
                    </h3>
                    <p className="rounded-md bg-muted/30 p-3 text-sm italic">
                      &quot;{aiReviewSummary}&quot;
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Specifications Tab */}
          <TabsContent value="specs" className="p-6">
            {productInfo && Object.keys(productInfo).length > 0 ? (
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Technical Specifications
                  </h3>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(productInfo).map(([key, value]) => (
                          <tr key={key} className="border-b last:border-0">
                            <td className="bg-muted/30 p-3 font-medium">
                              {key}
                            </td>
                            <td className="p-3">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <p className="py-8 text-center text-muted-foreground">
                No technical specifications available for this product.
              </p>
            )}
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="p-6">
            <div className="space-y-8">
              {productImages?.length > 0 || manufacturerImages?.length > 0 ? (
                <>
                  {productImages?.length > 0 && (
                    <div>
                      <h3 className="mb-4 text-lg font-semibold">
                        Product Images
                      </h3>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {productImages.map((img, index) => (
                          <div
                            key={index}
                            className="overflow-hidden rounded-md border"
                          >
                            <Image
                              height={500}
                              width={500}
                              src={img}
                              alt={`Product image ${index + 1}`}
                              className="h-auto w-full object-contain"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {manufacturerImages?.length > 0 && (
                    <div>
                      <h3 className="mb-4 text-lg font-semibold">
                        From the Manufacturer
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {manufacturerImages.map((img, index) => (
                          <div
                            key={index}
                            className="overflow-hidden rounded-md border"
                          >
                            <Image
                              height={500}
                              width={500}
                              src={img}
                              alt={`Manufacturer image ${index + 1}`}
                              className="h-auto w-full object-contain"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="py-8 text-center text-muted-foreground">
                  No images available for this product.
                </p>
              )}
            </div>
          </TabsContent>

          {/* Offers & Reviews Tab */}
          <TabsContent value="offers" className="p-6">
            <div className="space-y-8">
              {bankOffers && bankOffers.length > 0 ? (
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Bank Offers</h3>
                  <div className="space-y-3">
                    {bankOffers.map((offer, index) => (
                      <div
                        key={index}
                        className="rounded-md border border-green-400/20 bg-green-400/10 p-3 text-sm"
                      >
                        <h4 className="font-semibold">{offer.offerName}</h4>
                        <p>{offer.offerDetails}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="py-8 text-center text-muted-foreground">
                  No bank offers available for this product.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
