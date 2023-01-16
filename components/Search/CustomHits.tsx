import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/models/Products";
function Hits({ hit }: any) {
  const product = hit;
  return (
    <Link href={`/products/${hit.slug}`}>
      <div className="flex flex-col hover:cursor-pointer items-center justify-center">
        <div>
          {product.featured_img ? (
            <Image
              src={product.featured_img.url}
              objectFit="contain"
              alt={product.featured_img.alternativeText}
              className="align-middle"
              height={200}
              width={300}
            />
          ) : (
            <div className="w-24 h-24 "></div>
          )}
        </div>
        <h3 className="text-center">
          <Link href={`/products/${product.slug}`}>
            <a>{product.Name.substring(0, 40)}...</a>
          </Link>
        </h3>
      </div>
    </Link>
  );
}

export default Hits;
