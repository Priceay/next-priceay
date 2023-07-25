import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/models/Products";
export default function ProductCard(props: { product: Product }) {
  const { product } = props;

  return (
    <Link href={`/products/${product.attributes.slug}`}>
      <div className="flex flex-col hover:cursor-pointer items-center justify-center">
        <div>
          {product.attributes.featured_img?.data?  <Image
            src={product.attributes.featured_img.data.attributes.url}
            objectFit="contain"
            alt={product.attributes.featured_img.data.attributes.alternativeText}

            className="align-middle"
            height={200}
            width={300}
          />:
          <div className="w-24 h-24 "></div>
          }
        
        </div>
        <h3 className="text-center">
          <Link href={`/products/${product.attributes.slug}`}>
            <a>{product.attributes.Name.substring(0, 40)}...</a>
          </Link>
        </h3>
      </div>
    </Link>
  );
}
